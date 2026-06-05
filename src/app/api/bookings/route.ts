export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { razorpay } from '@/lib/razorpay';
import { calculatePrice } from '@/lib/pricing';
import { normalizeDate } from '@/lib/ical';

// GET: Fetch all blocked dates from today onwards
export async function GET() {
  try {
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

// POST: Create a pending booking & generate Razorpay order
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

    // 4. Create pending booking in DB
    const booking = await prisma.booking.create({
      data: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guestName,
        guestEmail,
        guestPhone,
        guestCount: parseInt(guestCount) || 2,
        totalAmount: pricing.total,
        status: 'PENDING',
        platform: 'DIRECT',
      },
    });

    // 5. Create Razorpay order
    // Razorpay amount is in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(pricing.total * 100);
    
    let razorpayOrder = null;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: booking.id,
        notes: {
          guestName,
          guestEmail,
          bookingId: booking.id,
        },
      });

      // Update the booking with orderId
      await prisma.booking.update({
        where: { id: booking.id },
        data: { orderId: razorpayOrder.id },
      });
    } catch (rzpErr) {
      console.error('Razorpay Order creation failed:', rzpErr);
      // We still keep the pending booking, client can retry or admin can manage.
      // But return order creation error to client.
      return NextResponse.json({
        success: false,
        error: 'Payment gateway order creation failed. Please try again.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      booking,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error('Error creating pending booking:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
