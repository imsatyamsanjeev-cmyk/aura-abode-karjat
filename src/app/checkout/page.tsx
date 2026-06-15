'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, Calendar, Info, Loader2, ArrowLeft, CheckCircle2, Copy } from 'lucide-react';
import { calculatePrice, PriceBreakdown } from '@/lib/pricing';
import { addLocalBooking, ClientBooking } from '@/lib/bookingState';

// Main checkout screen component wrapped in Suspense
function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL params
  const checkInStr = searchParams.get('checkIn');
  const checkOutStr = searchParams.get('checkOut');
  const guestsNum = parseInt(searchParams.get('guests') || '2');

  // Input states
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Page state
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState<PriceBreakdown | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  
  // Success state
  const [confirmedBooking, setConfirmedBooking] = useState<ClientBooking | null>(null);
  
  // Mobile summary drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Compute pricing
  useEffect(() => {
    if (checkInStr && checkOutStr) {
      const p = calculatePrice(checkInStr, checkOutStr);
      setPricing(p);
    } else {
      // Redirect back if dates are missing
      router.push('/booking');
    }
  }, [checkInStr, checkOutStr, router]);

  if (!pricing || !checkInStr || !checkOutStr) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in all guest details.');
      return;
    }
    if (!isTermsAccepted) {
      alert('Please accept the Terms and Conditions.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: checkInStr,
          checkOut: checkOutStr,
          guestName,
          guestEmail,
          guestPhone,
          guestCount: guestsNum,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      // Save to localStorage direct lead booking state
      const localSaved = addLocalBooking({
        id: data.booking.id,
        checkIn: checkInStr,
        checkOut: checkOutStr,
        guestName,
        guestEmail,
        guestPhone,
        guestCount: guestsNum,
        totalAmount: pricing.total,
        status: 'CONFIRMED',
        platform: 'DIRECT',
        paymentId: 'OFFLINE_LEAD',
      });

      setConfirmedBooking(localSaved);
    } catch (err: any) {
      alert(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-white animate-fade-in">
        <div className="bg-zinc-950 border border-gold-400 p-8 md:p-12 text-center space-y-6 shadow-[0_10px_50px_rgba(197,168,128,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-400" />
          
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-gold-400" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide">
            Request Submitted!
          </h2>
          
          <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            Dear {confirmedBooking.guestName}, your booking request for Aura Abode Karjat has been successfully submitted. Our team will contact you shortly to coordinate payment and check-in details.
          </p>

          {/* Invoice table details */}
          <div className="bg-zinc-900/40 border border-zinc-900 text-left p-6 space-y-4 max-w-xl mx-auto text-xs">
            <h4 className="font-serif text-gold-400 text-sm font-semibold uppercase tracking-wider border-b border-zinc-800 pb-2">
              Booking Receipt
            </h4>
            
            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-zinc-500">Booking Reference:</span>
              <span className="text-white font-mono flex items-center gap-1.5 justify-end">
                {confirmedBooking.id.substring(0, 8)}...
                <button onClick={() => copyToClipboard(confirmedBooking.id)} className="hover:text-gold-400 cursor-pointer">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </span>
              
              <span className="text-zinc-500">Stay Dates:</span>
              <span className="text-white text-right font-medium">
                {new Date(confirmedBooking.checkIn).toLocaleDateString()} - {new Date(confirmedBooking.checkOut).toLocaleDateString()}
              </span>
              
              <span className="text-zinc-500">Total Nights:</span>
              <span className="text-white text-right">{pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}</span>

              <span className="text-zinc-500">Guests:</span>
              <span className="text-white text-right">{confirmedBooking.guestCount} {confirmedBooking.guestCount === 1 ? 'Guest' : 'Guests'}</span>

              <span className="text-zinc-500 border-t border-zinc-800 pt-2 mt-2">Estimated Amount:</span>
              <span className="text-gold-400 font-bold text-sm text-right border-t border-zinc-800 pt-2 mt-2">
                ₹{Math.round(confirmedBooking.totalAmount).toLocaleString('en-IN')}
              </span>
              
              <span className="text-zinc-500">Payment Status:</span>
              <span className="text-gold-400 font-bold text-right text-[10px]">Pending Offline Settlement</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-gold-400 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Print Receipt
            </button>
            <Link
              href="/"
              className="px-8 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-bold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT PAGE FORM VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white pb-24 lg:pb-12">
      <Link href="/booking" className="inline-flex items-center text-xs text-zinc-500 hover:text-gold-400 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Availability
      </Link>

      {/* Mobile Sticky Booking summary strip */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-gold-400/20 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.85)] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-semibold">Total Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-gold-400 font-serif text-lg font-bold">
              ₹{Math.round(pricing.total).toLocaleString('en-IN')}
            </span>
            <span className="text-zinc-500 text-[9px] italic">({pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="px-2.5 py-1.5 border border-zinc-800 hover:border-gold-400/40 text-[9px] uppercase tracking-wider font-semibold text-zinc-300 transition-colors"
          >
            {mobileDrawerOpen ? 'Hide Info ▴' : 'Summary ▾'}
          </button>
          
          <button
            type="button"
            onClick={() => {
              const submitBtn = document.querySelector('form button[type="submit"]');
              if (submitBtn) {
                submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="px-3.5 py-1.5 bg-gold-400 hover:bg-gold-500 text-black text-[9px] uppercase tracking-widest font-bold transition-all"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Mobile Expanded Drawer Overlay */}
      {mobileDrawerOpen && (
        <>
          <div 
            onClick={() => setMobileDrawerOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-35 transition-opacity"
          />
          <div className="lg:hidden fixed bottom-[57px] left-0 right-0 z-40 bg-zinc-950 border-t border-zinc-900 p-6 space-y-4 shadow-[0_-20px_40px_rgba(0,0,0,0.95)] animate-fade-in">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <h4 className="font-serif text-gold-400 text-sm font-semibold uppercase tracking-wider">
                Cost Breakdown
              </h4>
              <button 
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="text-zinc-500 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Dates Selected:</span>
                <span className="text-white font-medium">
                  {new Date(checkInStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(checkOutStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Stay Cost ({pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}):</span>
                <span className="text-white">₹{pricing.baseTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Jacuzzi Prep & Service:</span>
                <span className="text-white">₹{pricing.serviceFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">GST (5%):</span>
                <span className="text-white">₹{pricing.taxes.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-zinc-900 pt-3 flex justify-between items-baseline">
                <span className="text-zinc-400 font-semibold uppercase text-[9px] tracking-wider">Total Payable:</span>
                <span className="text-gold-400 font-serif text-xl font-bold">
                  ₹{Math.round(pricing.total).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form area */}
        <div className="lg:col-span-8 space-y-8 bg-zinc-950 p-6 md:p-8 border border-zinc-900">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold">
              Guest Information
            </h2>
            <p className="text-zinc-500 text-xs mt-1">Please enter accurate contact information for entry registration and invoice delivery.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Deshmukh"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-400 transition-colors rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 99999 99999"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-400 transition-colors rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. rahul@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-400 transition-colors rounded-none"
              />
            </div>

            {/* Guidelines Card */}
            <div className="bg-zinc-900/30 border border-zinc-900 p-5 space-y-4 text-xs font-light text-zinc-400">
              <h4 className="font-serif text-white font-medium text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-gold-400" /> Important Booking Guidelines
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Check-in begins at 2:00 PM and checkout is strict at 11:00 AM to allow jacuzzi cleaning and water refill.</li>
                <li>Please carry original government IDs.</li>
                <li>Jacuzzi use is restricted to residents only. Glassware is not permitted near the tub.</li>
              </ul>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="w-4 h-4 bg-zinc-900 border-zinc-800 rounded-none text-gold-400 focus:ring-0 cursor-pointer mt-1"
              />
              <label htmlFor="terms" className="ml-3 text-xs text-zinc-500 font-light leading-relaxed cursor-pointer select-none">
                I accept the <a href="/terms" target="_blank" className="text-gold-400 hover:underline">Terms & Conditions</a>, <a href="/cancellation" target="_blank" className="text-gold-400 hover:underline">Cancellation Policy</a>, <a href="/privacy" target="_blank" className="text-gold-400 hover:underline">Privacy & Data Policy</a>, and agree to follow all house safety guidelines for the Jacuzzi.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-bold transition-colors shadow-lg flex items-center justify-center gap-2 rounded-none cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4.5 h-4.5" />
                  Confirm Booking Request
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 bg-zinc-950 p-6 md:p-8 border border-zinc-900 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-serif text-lg text-gold-400 uppercase tracking-widest pb-2 border-b border-zinc-900">
              Booking Summary
            </h3>

            {/* Dates Card */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-900/20 p-4 border border-zinc-900/50 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Check-in</span>
                <span className="text-white font-medium">{new Date(checkInStr).toLocaleDateString()}</span>
              </div>
              <div className="border-l border-zinc-800 pl-4">
                <span className="text-zinc-500 block mb-1">Check-out</span>
                <span className="text-white font-medium">{new Date(checkOutStr).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Room specs */}
            <div className="text-xs space-y-2 text-zinc-400 font-light border-b border-zinc-900 pb-4">
              <div className="flex justify-between">
                <span>Space Type:</span>
                <span className="text-white font-medium">Studio Apartment</span>
              </div>
              <div className="flex justify-between">
                <span>Nights Selected:</span>
                <span className="text-white font-medium">{pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests Capacity:</span>
                <span className="text-white font-medium">{guestsNum} {guestsNum === 1 ? 'Guest' : 'Guests'}</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-4 pt-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Stay Cost</span>
                <span className="text-white">₹{pricing.baseTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Jacuzzi Prep & Service Fee</span>
                <span className="text-white">₹{pricing.serviceFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">GST (5%)</span>
                <span className="text-white">₹{pricing.taxes.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="border-t border-zinc-900 pt-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Total Payable</span>
                  <span className="text-zinc-500 text-[10px] italic">instant confirmation</span>
                </div>
                <span className="text-gold-400 text-2xl font-serif font-bold">
                  ₹{Math.round(pricing.total).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[10px] text-zinc-600 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400/50" /> Secure SSL 256-bit Booking Gateway
          </div>
        </div>
      </div>

    </div>
  );
}

// Wrapper to satisfy Next.js useSearchParams Suspense requirements
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[60vh] items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
