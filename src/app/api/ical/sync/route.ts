export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { syncExternalFeeds } from '@/lib/ical';

export async function POST(request: Request) {
  try {
    // Optional basic authentication token check
    const authHeader = request.headers.get('Authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await syncExternalFeeds();

    return NextResponse.json({
      success: true,
      message: 'Synchronized calendars successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error during calendar sync:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
