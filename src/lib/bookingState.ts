export interface ClientBooking {
  id: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  platform: 'DIRECT' | 'AIRBNB' | 'BOOKING_COM';
  paymentId?: string;
  orderId?: string;
  createdAt: string;
}

export interface ClientBlockedDate {
  date: string; // YYYY-MM-DD
  reason: string;
  bookingId?: string;
}

export interface ClientFeed {
  id: string;
  platformName: string;
  feedUrl: string;
  lastSyncedAt: string;
}

// Seed helper
function getSeedBookings(): ClientBooking[] {
  // Let's create some realistic bookings starting from today
  const today = new Date();
  
  const formatDate = (offsetDays: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  return [
    {
      id: 'mock-booking-1',
      checkIn: formatDate(3),
      checkOut: formatDate(5),
      guestName: 'Ananya Sharma',
      guestEmail: 'ananya@example.com',
      guestPhone: '+91 98765 43210',
      guestCount: 2,
      totalAmount: 8700,
      status: 'CONFIRMED',
      platform: 'AIRBNB',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'mock-booking-2',
      checkIn: formatDate(10),
      checkOut: formatDate(12),
      guestName: 'Rahul Mehta',
      guestEmail: 'rahul.mehta@example.com',
      guestPhone: '+91 99112 23344',
      guestCount: 2,
      totalAmount: 9500,
      status: 'CONFIRMED',
      platform: 'DIRECT',
      paymentId: 'pay_mock12345',
      orderId: 'order_mock12345',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'mock-booking-3',
      checkIn: formatDate(-5),
      checkOut: formatDate(-3),
      guestName: 'Kabir Dev',
      guestEmail: 'kabir@example.com',
      guestPhone: '+91 98112 98112',
      guestCount: 3,
      totalAmount: 8900,
      status: 'CONFIRMED',
      platform: 'BOOKING_COM',
      createdAt: new Date().toISOString(),
    }
  ];
}

function getSeedFeeds(): ClientFeed[] {
  return [
    {
      id: 'feed-airbnb',
      platformName: 'Airbnb Export Link',
      feedUrl: 'https://www.airbnb.com/calendar/ical/12345678.ics',
      lastSyncedAt: new Date().toISOString(),
    },
    {
      id: 'feed-booking',
      platformName: 'Booking.com Sync',
      feedUrl: 'https://ical.booking.com/v1/sync?id=abc-123',
      lastSyncedAt: new Date().toISOString(),
    }
  ];
}

// Client API wrappers
export function getLocalBookings(): ClientBooking[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('aura_bookings');
  if (!stored) {
    const seed = getSeedBookings();
    localStorage.setItem('aura_bookings', JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(stored);
}

export function saveLocalBookings(bookings: ClientBooking[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('aura_bookings', JSON.stringify(bookings));
}

export function getLocalBlockedDates(): ClientBlockedDate[] {
  if (typeof window === 'undefined') return [];
  const bookings = getLocalBookings();
  const blocked: ClientBlockedDate[] = [];

  // Generate blocks from bookings
  bookings.forEach(b => {
    if (b.status === 'CONFIRMED') {
      let current = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      while (current < end) {
        blocked.push({
          date: current.toISOString().split('T')[0],
          reason: b.platform === 'DIRECT' ? 'BOOKING' : `EXTERNAL_${b.platform}`,
          bookingId: b.id
        });
        current.setDate(current.getDate() + 1);
      }
    }
  });

  // Custom manual blocked dates
  const storedManual = localStorage.getItem('aura_manual_blocks');
  if (storedManual) {
    const manual: ClientBlockedDate[] = JSON.parse(storedManual);
    blocked.push(...manual);
  }

  return blocked;
}

export function getManualBlocks(): ClientBlockedDate[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('aura_manual_blocks');
  return stored ? JSON.parse(stored) : [];
}

export function saveManualBlocks(blocks: ClientBlockedDate[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('aura_manual_blocks', JSON.stringify(blocks));
}

export function getLocalFeeds(): ClientFeed[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('aura_feeds');
  if (!stored) {
    const seed = getSeedFeeds();
    localStorage.setItem('aura_feeds', JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(stored);
}

export function saveLocalFeeds(feeds: ClientFeed[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('aura_feeds', JSON.stringify(feeds));
}

export function addLocalBooking(booking: Omit<ClientBooking, 'createdAt'>): ClientBooking {
  const bookings = getLocalBookings();
  const newBooking: ClientBooking = {
    ...booking,
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  saveLocalBookings(bookings);
  return newBooking;
}

export function cancelLocalBooking(id: string) {
  const bookings = getLocalBookings();
  const updated = bookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' as const } : b);
  saveLocalBookings(updated);
}
