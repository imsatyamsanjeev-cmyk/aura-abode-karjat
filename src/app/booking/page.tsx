import React from 'react';
import BookingCalendar from '@/components/BookingCalendar';
import { Calendar, HelpCircle, PhoneCall } from 'lucide-react';

export default function BookingPage() {
  return (
    <div className="bg-background min-h-screen text-white py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-gold-400 text-xs font-sans tracking-[0.4em] uppercase font-semibold block">
            Reservation Center
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
            Check Availability & Book
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Select your check-in and check-out dates on the interactive calendar below. Lock in direct booking rates, secure your dates instantly, and get immediate email verification.
          </p>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Calendar Core */}
        <BookingCalendar />

        {/* Booking Support Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-zinc-900 text-xs text-zinc-500 font-light">
          <div className="flex items-start gap-4 bg-zinc-950 p-6 border border-zinc-900">
            <HelpCircle className="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-serif text-white font-medium text-sm">Booking Help & FAQ</h4>
              <p>Need custom dates, group booking, or extended stays? Please read our Cancellation Policy or contact our support desk directly before finalizing your reservation.</p>
              <p>Direct bookings bypass platform commissions, offering the absolute lowest rates for Aura Abode.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 bg-zinc-950 p-6 border border-zinc-900">
            <PhoneCall className="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-serif text-white font-medium text-sm">Need Assistance?</h4>
              <p>Have questions about the private jacuzzi, amenities, security, or transportation directions from Mumbai / Pune?</p>
              <p className="text-white font-medium">WhatsApp or call us directly: <a href="tel:+919867778833" className="text-gold-400 hover:underline">+91 98677 78833</a></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
