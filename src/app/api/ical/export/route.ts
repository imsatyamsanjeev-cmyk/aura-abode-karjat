export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateICalFeed } from '@/lib/ical';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        guestName: true,
      },
    });

    const icsContent = generateICalFeed(bookings);

    return new Response(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="aura-abode-bookings.ics"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating iCal feed:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
