export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { normalizeDate } from '@/lib/ical';
import { sendBookingConfirmationEmail, sendAdminBookingAlertEmail, sendSMSNotification } from '@/lib/notifications';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !booking_id) {
      return NextResponse.json({ success: false, error: 'Missing payment verification details.' }, { status: 400 });
    }

    // 1. Verify Razorpay Signature
    const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature. Transaction failed.' }, { status: 400 });
    }

    // 2. Fetch booking and ensure it exists and is pending
    const booking = await prisma.booking.findUnique({
      where: { id: booking_id },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking record not found.' }, { status: 404 });
    }

    if (booking.status === 'CONFIRMED') {
      return NextResponse.json({ success: true, message: 'Booking already confirmed.', booking });
    }

    // 3. Perform a database transaction to update booking, save payment, and block the dates
    const confirmedBooking = await prisma.$transaction(async (tx) => {
      // Update status to CONFIRMED
      const updated = await tx.booking.update({
        where: { id: booking_id },
        data: {
          status: 'CONFIRMED',
          paymentId: razorpay_payment_id,
        },
      });

      // Block dates
      const start = normalizeDate(new Date(booking.checkIn));
      const end = normalizeDate(new Date(booking.checkOut));
      const current = new Date(start);

      while (current < end) {
        await tx.blockedDate.upsert({
          where: { date: new Date(current) },
          update: {
            reason: 'BOOKING',
            bookingId: booking_id,
          },
          create: {
            date: new Date(current),
            reason: 'BOOKING',
            bookingId: booking_id,
          },
        });
        current.setUTCDate(current.getUTCDate() + 1);
      }

      return updated;
    });

    // 4. Send email notifications asynchronously
    // Don't await them so the client request finishes immediately
    sendBookingConfirmationEmail(confirmedBooking).catch(console.error);
    sendAdminBookingAlertEmail(confirmedBooking).catch(console.error);
    
    // 5. Send SMS notification
    const smsMessage = `Hi ${confirmedBooking.guestName}, your luxury stay at Aura Abode Karjat is confirmed for ${new Date(confirmedBooking.checkIn).toLocaleDateString()} to ${new Date(confirmedBooking.checkOut).toLocaleDateString()}! Booking ID: ${confirmedBooking.id.substring(0, 8)}. See you soon!`;
    sendSMSNotification(confirmedBooking.guestPhone, smsMessage).catch(console.error);

    return NextResponse.json({
      success: true,
      message: 'Booking and payment verified successfully.',
      booking: confirmedBooking,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
