export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { normalizeDate } from '@/lib/ical';

// GET: Fetch all bookings and blocked dates for admin view
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const blockedDates = await prisma.blockedDate.findMany({
      orderBy: { date: 'asc' },
    });

    return NextResponse.json({
      success: true,
      bookings,
      blockedDates,
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Manage bookings or block/unblock dates
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'block') {
      const { date, reason } = body;
      if (!date) {
        return NextResponse.json({ success: false, error: 'Date is required.' }, { status: 400 });
      }

      const blockDate = normalizeDate(new Date(date));
      const blocked = await prisma.blockedDate.upsert({
        where: { date: blockDate },
        update: { reason: reason || 'MAINTENANCE' },
        create: { date: blockDate, reason: reason || 'MAINTENANCE' },
      });

      return NextResponse.json({ success: true, blocked });
    }

    if (action === 'unblock') {
      const { date } = body;
      if (!date) {
        return NextResponse.json({ success: false, error: 'Date is required.' }, { status: 400 });
      }

      const blockDate = normalizeDate(new Date(date));
      
      // If there is an associated booking, we might want to warning/error or cascade delete.
      // We will delete the block date.
      await prisma.blockedDate.delete({
        where: { date: blockDate },
      });

      return NextResponse.json({ success: true, message: 'Date unblocked successfully.' });
    }

    if (action === 'create_booking') {
      const { checkIn, checkOut, guestName, guestEmail, guestPhone, guestCount, totalAmount, status } = body;
      
      if (!checkIn || !checkOut || !guestName) {
        return NextResponse.json({ success: false, error: 'Check-in, check-out and guest name are required.' }, { status: 400 });
      }

      const checkInDate = normalizeDate(new Date(checkIn));
      const checkOutDate = normalizeDate(new Date(checkOut));

      if (checkInDate >= checkOutDate) {
        return NextResponse.json({ success: false, error: 'Check-out must be after check-in.' }, { status: 400 });
      }

      // Check conflict
      const datesToBlock: Date[] = [];
      const current = new Date(checkInDate);
      while (current < checkOutDate) {
        datesToBlock.push(new Date(current));
        current.setUTCDate(current.getUTCDate() + 1);
      }

      const conflicts = await prisma.blockedDate.findMany({
        where: { date: { in: datesToBlock } },
      });

      if (conflicts.length > 0) {
        return NextResponse.json({ success: false, error: 'Dates conflict with existing blocks/bookings.' }, { status: 409 });
      }

      const newBooking = await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.create({
          data: {
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guestName,
            guestEmail: guestEmail || '',
            guestPhone: guestPhone || '',
            guestCount: parseInt(guestCount) || 2,
            totalAmount: parseFloat(totalAmount) || 0,
            status: status || 'CONFIRMED',
            platform: 'DIRECT',
          },
        });

        for (const d of datesToBlock) {
          await tx.blockedDate.create({
            data: {
              date: d,
              reason: 'BOOKING',
              bookingId: booking.id,
            },
          });
        }

        return booking;
      });

      return NextResponse.json({ success: true, booking: newBooking });
    }

    // Cancel a booking
    if (action === 'cancel_booking') {
      const { bookingId } = body;
      if (!bookingId) {
        return NextResponse.json({ success: false, error: 'Booking ID is required.' }, { status: 400 });
      }

      // We will set status to CANCELLED and delete the associated blocked dates
      await prisma.$transaction([
        prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'CANCELLED' },
        }),
        prisma.blockedDate.deleteMany({
          where: { bookingId },
        }),
      ]);

      return NextResponse.json({ success: true, message: 'Booking cancelled and dates released.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('Error handling admin booking actions:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
