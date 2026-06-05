import { prisma } from './prisma';

/**
 * Generates an iCal string representation of confirmed bookings.
 * Standard iCal format compatible with Airbnb, Booking.com, and others.
 */
export function generateICalFeed(bookings: Array<{ id: string; checkIn: Date; checkOut: Date; guestName: string }>): string {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aura Abode Karjat//Calendar Sync//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  bookings.forEach((booking) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    // Formats: YYYYMMDD
    const formatDate = (date: Date) => {
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, '0');
      const d = String(date.getUTCDate()).padStart(2, '0');
      return `${y}${m}${d}`;
    };

    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    ics.push(
      'BEGIN:VEVENT',
      `UID:${booking.id}@auraabodekarjat.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${formatDate(checkInDate)}`,
      `DTEND;VALUE=DATE:${formatDate(checkOutDate)}`,
      `SUMMARY:Aura Abode Reserved - ${booking.guestName}`,
      'DESCRIPTION:Booked via Direct Channel',
      'END:VEVENT'
    );
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

/**
 * Parses an iCal string from date parameters.
 */
export function parseICalString(icsText: string): Array<{ start: Date; end: Date; summary: string }> {
  const events: Array<{ start: Date; end: Date; summary: string }> = [];
  const lines = icsText.split(/\r?\n/);
  let currentEvent: any = null;

  const parseDate = (dateStr: string): Date => {
    // Expected formats: YYYYMMDD or YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS
    const cleanStr = dateStr.replace(/[^0-9T]/g, '');
    const year = parseInt(cleanStr.substring(0, 4));
    const month = parseInt(cleanStr.substring(4, 6)) - 1;
    const day = parseInt(cleanStr.substring(6, 8));

    if (cleanStr.includes('T')) {
      const hour = parseInt(cleanStr.substring(9, 11)) || 0;
      const min = parseInt(cleanStr.substring(11, 13)) || 0;
      const sec = parseInt(cleanStr.substring(13, 15)) || 0;
      return new Date(Date.UTC(year, month, day, hour, min, sec));
    }
    return new Date(Date.UTC(year, month, day));
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Handle unfolded lines (lines wrapped with a leading space)
    while (i + 1 < lines.length && (lines[i + 1].startsWith(' ') || lines[i + 1].startsWith('\t'))) {
      line += lines[i + 1].substring(1);
      i++;
    }

    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {};
    } else if (line.startsWith('END:VEVENT')) {
      if (currentEvent && currentEvent.dtstart && currentEvent.dtend) {
        events.push({
          start: parseDate(currentEvent.dtstart),
          end: parseDate(currentEvent.dtend),
          summary: currentEvent.summary || 'External Booking',
        });
      }
      currentEvent = null;
    } else if (currentEvent) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const keyPart = line.substring(0, colonIndex);
        const valuePart = line.substring(colonIndex + 1);
        const key = keyPart.split(';')[0].toUpperCase();

        if (key === 'DTSTART') currentEvent.dtstart = valuePart;
        if (key === 'DTEND') currentEvent.dtend = valuePart;
        if (key === 'SUMMARY') currentEvent.summary = valuePart;
      }
    }
  }

  return events;
}

/**
 * Fetches and parses an external iCal feed.
 */
export async function parseExternalICal(feedUrl: string): Promise<Array<{ start: Date; end: Date; summary: string }>> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch iCal feed from ${feedUrl}, status: ${response.status}`);
    }

    const icsText = await response.text();
    return parseICalString(icsText);
  } catch (error) {
    console.error('Error fetching or parsing external iCal:', error);
    throw error;
  }
}

/**
 * Normalizes a date to midnight UTC to ensure consistency across operations.
 */
export function normalizeDate(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/**
 * Synchronizes all configured external feeds, blocking the respective dates in our database.
 */
export async function syncExternalFeeds(): Promise<void> {
  const feeds = await prisma.iCalSync.findMany();
  
  for (const feed of feeds) {
    try {
      const ranges = await parseExternalICal(feed.feedUrl);
      
      for (const range of ranges) {
        let currentDate = normalizeDate(range.start);
        const endDate = normalizeDate(range.end);
        
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        if (endDate < sixMonthsAgo) continue;

        while (currentDate < endDate) {
          await prisma.blockedDate.upsert({
            where: { date: currentDate },
            update: {
              reason: `EXTERNAL_BOOKING_${feed.platformName}`
            },
            create: {
              date: currentDate,
              reason: `EXTERNAL_BOOKING_${feed.platformName}`
            }
          });
          
          currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }
      }
      
      await prisma.iCalSync.update({
        where: { id: feed.id },
        data: { lastSyncedAt: new Date() }
      });
      
    } catch (error) {
      console.error(`Failed to sync feed for ${feed.platformName}:`, error);
    }
  }
}
