export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

// GET: Fetch all external feeds
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const feeds = await prisma.iCalSync.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, feeds });
  } catch (error) {
    console.error('Error fetching iCal feeds:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add new external iCal feed
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { platformName, feedUrl } = await request.json();

    if (!platformName || !feedUrl) {
      return NextResponse.json({ success: false, error: 'Platform name and iCal feed URL are required.' }, { status: 400 });
    }

    const feed = await prisma.iCalSync.create({
      data: {
        platformName,
        feedUrl,
      },
    });

    return NextResponse.json({ success: true, feed });
  } catch (error) {
    console.error('Error creating iCal feed:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete an external feed
export async function DELETE(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Feed ID is required.' }, { status: 400 });
    }

    await prisma.iCalSync.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'iCal sync feed deleted.' });
  } catch (error) {
    console.error('Error deleting iCal feed:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
