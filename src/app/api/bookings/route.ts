export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { razorpay } from '@/lib/razorpay';
import { calculatePrice } from '@/lib/pricing';
import { normalizeDate, syncExternalFeeds } from '@/lib/ical';

import { sendBookingConfirmationEmail, sendAdminBookingAlertEmail, sendSMSNotification } from '@/lib/notifications';

// GET: Fetch all blocked dates from today onwards
export async function GET() {
  try {
    // Sync external feeds inline to ensure calendar blocks are always up to date
    try {
      await syncExternalFeeds();
    } catch (syncErr) {
      console.error('Failed to sync external feeds inline:', syncErr);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const blocked = await prisma.blockedDate.findMany({
      where: {
        date: {
          gte: today,
        },
      },
      select: {
        date: true,
        reason: true,
      },
    });

    return NextResponse.json({
      success: true,
      blockedDates: blocked.map(b => b.date.toISOString().split('T')[0]),
    });
  } catch (error) {
    console.error('Error fetching blocked dates:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create a confirmed booking / direct lead and block dates
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guestName, guestEmail, guestPhone, guestCount } = body;

    if (!checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ success: false, error: 'Missing required booking details.' }, { status: 400 });
    }

    const checkInDate = normalizeDate(new Date(checkIn));
    const checkOutDate = normalizeDate(new Date(checkOut));

    if (checkInDate >= checkOutDate) {
      return NextResponse.json({ success: false, error: 'Check-out date must be after check-in.' }, { status: 400 });
    }

    // 1. Generate list of dates to block
    const datesToBlock: Date[] = [];
    const current = new Date(checkInDate);
    while (current < checkOutDate) {
      datesToBlock.push(new Date(current));
      current.setUTCDate(current.getUTCDate() + 1);
    }

    // 2. Check if any of these dates are already blocked in DB
    const conflictingBlocks = await prisma.blockedDate.findMany({
      where: {
        date: {
          in: datesToBlock,
        },
      },
    });

    if (conflictingBlocks.length > 0) {
      return NextResponse.json({ success: false, error: 'One or more selected dates are already booked.' }, { status: 409 });
    }

    // 3. Calculate price details
    const pricing = calculatePrice(checkInDate, checkOutDate);

    // 4. Create confirmed booking & block dates in DB transaction
    const booking = await prisma.$transaction(async (tx) => {
      const created = await tx.booking.create({
        data: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guestName,
          guestEmail,
          guestPhone,
          guestCount: parseInt(guestCount) || 2,
          totalAmount: pricing.total,
          status: 'CONFIRMED',
          platform: 'DIRECT',
          paymentId: 'OFFLINE_LEAD',
        },
      });

      // Block dates
      for (const d of datesToBlock) {
        await tx.blockedDate.upsert({
          where: { date: d },
          update: {
            reason: 'BOOKING',
            bookingId: created.id,
          },
          create: {
            date: d,
            reason: 'BOOKING',
            bookingId: created.id,
          },
        });
      }

      return created;
    });

    // 5. Send notifications asynchronously
    sendBookingConfirmationEmail(booking).catch(console.error);
    sendAdminBookingAlertEmail(booking).catch(console.error);
    
    const smsMessage = `Hi ${booking.guestName}, your booking request for Aura Abode Karjat (${new Date(booking.checkIn).toLocaleDateString()} to ${new Date(booking.checkOut).toLocaleDateString()}) has been received! Booking ID: ${booking.id.substring(0, 8)}. We will contact you shortly to confirm your stay.`;
    sendSMSNotification(booking.guestPhone, smsMessage).catch(console.error);

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Error creating direct booking lead:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
