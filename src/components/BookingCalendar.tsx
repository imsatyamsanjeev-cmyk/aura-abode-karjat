'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Users, Info, Calendar as CalendarIcon } from 'lucide-react';
import { getLocalBlockedDates } from '@/lib/bookingState';
import { calculatePrice, PriceBreakdown } from '@/lib/pricing';

export default function BookingCalendar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState(2);
  const [priceDetails, setPriceDetails] = useState<PriceBreakdown | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Load blocked dates from state
  useEffect(() => {
    // We load blocked dates
    const fetchBlocked = () => {
      const dates = getLocalBlockedDates().map(d => d.date);
      setBlockedDates(dates);
    };
    fetchBlocked();
    
    // Add event listener to reload blocked dates if they change (e.g. from sync)
    window.addEventListener('storage', fetchBlocked);
    return () => window.removeEventListener('storage', fetchBlocked);
  }, []);

  // Update pricing details when checkIn or checkOut change
  useEffect(() => {
    if (checkIn && checkOut) {
      const pricing = calculatePrice(checkIn, checkOut);
      setPriceDetails(pricing);
    } else {
      setPriceDetails(null);
    }
  }, [checkIn, checkOut]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to generate calendar days
  const getDaysInMonth = () => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    
    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
    
    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Next month filler days (to fill 6 rows grid: 42 blocks)
    const remainingBlocks = 42 - days.length;
    for (let i = 1; i <= remainingBlocks; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  const formatDateString = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const isBlocked = (date: Date) => {
    const dateStr = formatDateString(date);
    return blockedDates.includes(dateStr);
  };

  const isBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date: Date) => {
    if (checkIn && formatDateString(date) === formatDateString(checkIn)) return 'checkin';
    if (checkOut && formatDateString(date) === formatDateString(checkOut)) return 'checkout';
    return null;
  };

  const isDateInRange = (date: Date) => {
    if (!checkIn) return false;
    const dateStr = formatDateString(date);
    
    if (checkOut) {
      return date > checkIn && date < checkOut;
    }
    
    if (hoveredDate && date > checkIn && date <= hoveredDate) {
      return true;
    }
    
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isBlocked(date) || isBeforeToday(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (date <= checkIn) {
        // Reset check-in if clicking an earlier date
        setCheckIn(date);
      } else {
        // Check if there is any blocked date in the range
        let temp = new Date(checkIn);
        let hasConflict = false;
        while (temp < date) {
          if (isBlocked(temp)) {
            hasConflict = true;
            break;
          }
          temp.setDate(temp.getDate() + 1);
        }

        if (hasConflict) {
          alert('The selected range contains blocked dates. Please pick another range.');
          setCheckIn(date);
        } else {
          setCheckOut(date);
        }
      }
    }
  };

  const handleReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setPriceDetails(null);
  };

  const handleProceed = () => {
    if (!checkIn || !checkOut) return;
    
    // Store selected booking criteria in sessionStorage to pass to checkout page
    const bookingQuery = new URLSearchParams({
      checkIn: formatDateString(checkIn),
      checkOut: formatDateString(checkOut),
      guests: String(guestCount)
    }).toString();

    router.push(`/checkout?${bookingQuery}`);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
      {/* Calendar Grid */}
      <div className="lg:col-span-8 bg-zinc-950 p-6 md:p-8 border border-gold-400/10 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide">
            {monthNames[month]} {year}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 border border-zinc-800 hover:border-gold-400 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 border border-zinc-800 hover:border-gold-400 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4 text-center">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-zinc-500 text-xs font-semibold uppercase tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
          {getDaysInMonth().map(({ date, isCurrentMonth }, index) => {
            const blocked = isBlocked(date);
            const past = isBeforeToday(date);
            const selectType = isDateSelected(date);
            const inRange = isDateInRange(date);
            const isToday = formatDateString(date) === formatDateString(new Date());

            let bgClass = 'bg-zinc-900/40 text-gray-400 hover:bg-zinc-900 hover:text-white';
            if (!isCurrentMonth) {
              bgClass = 'text-zinc-700 pointer-events-none opacity-30';
            } else if (past || blocked) {
              bgClass = 'text-zinc-600 line-through cursor-not-allowed bg-zinc-950/20';
            } else if (selectType === 'checkin' || selectType === 'checkout') {
              bgClass = 'bg-gold-400 text-black font-semibold shadow-[0_0_15px_rgba(197,168,128,0.5)]';
            } else if (inRange) {
              bgClass = 'bg-gold-900/20 text-gold-300 font-medium border border-gold-900/40';
            } else if (isToday) {
              bgClass = 'border border-zinc-700 text-white';
            }

            return (
              <button
                key={index}
                onClick={() => isCurrentMonth && handleDateClick(date)}
                onMouseEnter={() => isCurrentMonth && setHoveredDate(date)}
                disabled={!isCurrentMonth || past || blocked}
                className={`h-10 sm:h-12 w-full flex items-center justify-center text-sm transition-all duration-200 relative ${bgClass}`}
              >
                <span>{date.getDate()}</span>
                {blocked && isCurrentMonth && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-600 rounded-full" />
                )}
                {selectType === 'checkin' && (
                  <span className="absolute -top-1 left-1 text-[8px] bg-black text-gold-400 px-1 border border-gold-900/30 scale-75 md:scale-100 font-sans tracking-widest font-semibold uppercase">In</span>
                )}
                {selectType === 'checkout' && (
                  <span className="absolute -top-1 right-1 text-[8px] bg-black text-gold-400 px-1 border border-gold-900/30 scale-75 md:scale-100 font-sans tracking-widest font-semibold uppercase">Out</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-zinc-900 text-xs">
          <div className="flex items-center text-gray-400">
            <div className="w-4 h-4 bg-gold-400 mr-2 shadow-sm" />
            <span>Selected Dates</span>
          </div>
          <div className="flex items-center text-gray-400">
            <div className="w-4 h-4 bg-gold-900/20 border border-gold-900/40 mr-2" />
            <span>Stay Nights</span>
          </div>
          <div className="flex items-center text-gray-400">
            <div className="w-4 h-4 bg-zinc-900/40 border border-zinc-700 mr-2" />
            <span>Available Nights</span>
          </div>
          <div className="flex items-center text-gray-400">
            <div className="w-4 h-4 bg-zinc-950/20 line-through border border-dashed border-zinc-800 mr-2" />
            <span>Booked / Unavailable</span>
          </div>
        </div>
      </div>

      {/* Booking sidebar / Price details */}
      <div className="lg:col-span-4 bg-zinc-950 border border-gold-400/10 shadow-2xl p-6 md:p-8 flex flex-col justify-between animate-fade-in">
        <div>
          <h4 className="font-serif text-lg text-gold-400 uppercase tracking-widest mb-6 pb-2 border-b border-zinc-900">
            Reservation Detail
          </h4>

          {/* Date Summary Card */}
          <div className="grid grid-cols-2 gap-4 bg-zinc-900/30 p-4 border border-zinc-900 mb-6">
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Check-in</label>
              <div className="text-white text-sm font-medium">
                {checkIn ? checkIn.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Check-out</label>
              <div className="text-white text-sm font-medium">
                {checkOut ? checkOut.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}
              </div>
            </div>
          </div>

          {/* Guest selector */}
          <div className="mb-6">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Number of Guests</label>
            <div className="relative">
              <Users className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors rounded-none appearance-none cursor-pointer"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests (Extra mattress)</option>
                <option value={4}>4 Guests (Extra mattresses)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">▼</div>
            </div>
          </div>

          {/* Price details calculation */}
          {priceDetails ? (
            <div className="space-y-4 pt-4 border-t border-zinc-900 animate-fade-in">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {priceDetails.nights} {priceDetails.nights === 1 ? 'night' : 'nights'} stay
                </span>
                <span className="text-white">₹{priceDetails.baseTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span className="flex items-center">
                  Cleaning & Service fee
                  <span className="group relative ml-1 cursor-pointer">
                    <Info className="w-3.5 h-3.5 text-zinc-600 hover:text-zinc-400" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-zinc-300 text-[10px] p-2 border border-zinc-800 rounded w-48 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 shadow-lg text-center">
                      Covers deep-cleaning of private garden and jacuzzi preparation.
                    </span>
                  </span>
                </span>
                <span>₹{priceDetails.serviceFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Goods & Service Tax (5%)</span>
                <span>₹{priceDetails.taxes.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Total Price</span>
                  <span className="text-zinc-500 text-[10px] italic">incl. taxes & fees</span>
                </div>
                <span className="text-gold-400 text-2xl font-serif font-bold">
                  ₹{Math.round(priceDetails.total).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/20 border border-dashed border-zinc-900 p-6 text-center text-xs text-zinc-600 py-10 flex flex-col items-center">
              <CalendarIcon className="w-8 h-8 text-zinc-800 mb-3" />
              <span>Select check-in & check-out dates on the calendar to see prices and reserve.</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8">
          {checkIn && checkOut ? (
            <div className="space-y-3">
              <button
                onClick={handleProceed}
                className="w-full py-3.5 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-semibold transition-colors duration-300 shadow-md cursor-pointer block text-center"
              >
                Proceed to Book
              </button>
              <button
                onClick={handleReset}
                className="w-full py-2 text-zinc-500 hover:text-white text-xs transition-colors duration-300"
              >
                Reset Dates
              </button>
            </div>
          ) : (
            <button
              disabled
              className="w-full py-3.5 bg-zinc-900 text-zinc-600 text-xs uppercase tracking-widest font-semibold cursor-not-allowed text-center"
            >
              Select Dates First
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
