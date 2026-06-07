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
  
  // Simulated Payment Modal state
  const [showSimulatedGateway, setShowSimulatedGateway] = useState(false);
  const [simulatedCardName, setSimulatedCardName] = useState('');
  const [simulatedCardNumber, setSimulatedCardNumber] = useState('');
  const [simulatedCardExpiry, setSimulatedCardExpiry] = useState('');
  const [simulatedCardCvv, setSimulatedCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [activeBooking, setActiveBooking] = useState<any>(null);

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

  // Real Razorpay booking handler
  const handleRealRazorpayCheckout = async () => {
    setLoading(true);
    try {
      // 1. Create Pending Booking & Order on backend
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
        throw new Error(data.error || 'Failed to initialize booking.');
      }

      const { booking, razorpayOrder, isMockMode } = data;
      setActiveBooking(booking);

      if (isMockMode) {
        setShowSimulatedGateway(true);
        setLoading(false);
        return;
      }

      // 2. Open Razorpay Overlay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Aura Abode Karjat',
        description: `Stay: ${checkInStr} to ${checkOutStr}`,
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          setLoading(true);
          try {
            // Verify payment
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: booking.id,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              // Save to localStorage as well for local tracking
              const localSaved = addLocalBooking({
                id: booking.id,
                checkIn: checkInStr,
                checkOut: checkOutStr,
                guestName,
                guestEmail,
                guestPhone,
                guestCount: guestsNum,
                totalAmount: pricing.total,
                status: 'CONFIRMED',
                platform: 'DIRECT',
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });
              setConfirmedBooking(localSaved);
            } else {
              alert('Payment verification failed: ' + verifyData.error);
            }
          } catch (verifyErr) {
            console.error(verifyErr);
            alert('An error occurred during payment verification.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: guestName,
          email: guestEmail,
          contact: guestPhone,
        },
        theme: {
          color: '#c5a880',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
    } catch (err: any) {
      console.warn('Real Razorpay initialization failed (running in static / client-only mode):', err.message);
      // Fallback to simulated payment gateway modal!
      setShowSimulatedGateway(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedCardName || !simulatedCardNumber || !simulatedCardExpiry || !simulatedCardCvv) {
      setPaymentError('Please fill in all card details.');
      return;
    }

    setLoading(true);
    setPaymentError('');
    
    try {
      const mockPaymentId = 'pay_mock_' + Math.random().toString(36).substring(2, 11).toUpperCase();
      const mockSignature = 'sig_mock_' + Math.random().toString(36).substring(2, 15);

      // Verify mock order on the backend to register the booking, block calendar dates, and trigger notifications
      const verifyRes = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: activeBooking ? activeBooking.orderId : ('order_mock_' + Math.random().toString(36).substring(2, 11).toUpperCase()),
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: mockSignature,
          booking_id: activeBooking ? activeBooking.id : ('booking_mock_' + Math.random().toString(36).substring(2, 11).toUpperCase()),
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.success) {
        const localSaved = addLocalBooking({
          id: activeBooking ? activeBooking.id : 'mock_id',
          checkIn: checkInStr,
          checkOut: checkOutStr,
          guestName,
          guestEmail,
          guestPhone,
          guestCount: guestsNum,
          totalAmount: pricing.total,
          status: 'CONFIRMED',
          platform: 'DIRECT',
          paymentId: mockPaymentId,
          orderId: activeBooking ? activeBooking.orderId : 'mock_order_id',
        });
        setConfirmedBooking(localSaved);
        setShowSimulatedGateway(false);
      } else {
        setPaymentError(verifyData.error || 'Payment verification failed.');
      }
    } catch (err: any) {
      setPaymentError('An error occurred during payment verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in all guest details.');
      return;
    }
    if (!isTermsAccepted) {
      alert('Please accept the Terms and Conditions.');
      return;
    }
    handleRealRazorpayCheckout();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Credit Card formatting helpers
  const getCardType = (num: string) => {
    if (!num) return 'SECURE CARD';
    if (num.startsWith('4')) return 'VISA';
    const parsed = parseInt(num.substring(0, 2));
    if (parsed >= 51 && parsed <= 55) return 'MASTERCARD';
    if (num.startsWith('34') || num.startsWith('37')) return 'AMEX';
    if (num.startsWith('6011') || num.startsWith('65')) return 'DISCOVER';
    return 'CREDIT CARD';
  };

  const formatCardNumberVisual = (num: string) => {
    const padded = num.padEnd(16, '•');
    const parts = [];
    for (let i = 0; i < 16; i += 4) {
      parts.push(padded.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= 16) {
      setSimulatedCardNumber(raw);
    }
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.substring(0, 4);
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    setSimulatedCardExpiry(val);
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
            Reservation Confirmed!
          </h2>
          
          <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            Dear {confirmedBooking.guestName}, your luxury stay at Aura Abode Karjat has been successfully booked. A confirmation email and details have been logged.
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

              <span className="text-zinc-500 border-t border-zinc-800 pt-2 mt-2">Total Amount Paid:</span>
              <span className="text-gold-400 font-bold text-sm text-right border-t border-zinc-800 pt-2 mt-2">
                ₹{Math.round(confirmedBooking.totalAmount).toLocaleString('en-IN')}
              </span>
              
              <span className="text-zinc-500">Payment Ref ID:</span>
              <span className="text-white text-right font-mono text-[10px]">{confirmedBooking.paymentId}</span>
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
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
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
                  Processing Checkout...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4.5 h-4.5" />
                  Proceed to Secure Payment
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

      {/* 5. Simulated Payment Gateway Modal */}
      {showSimulatedGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
          <div className="bg-zinc-950 border border-gold-900/50 w-full max-w-md p-6 md:p-8 space-y-6 relative my-8">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">Razorpay Simulator</span>
                <h3 className="font-serif text-lg text-white font-medium">Card/UPI Checkout</h3>
              </div>
              <button
                onClick={() => setShowSimulatedGateway(false)}
                className="text-zinc-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Interactive 3D Credit Card Visualizer */}
            <div className="perspective-1000 w-full max-w-sm h-48 mx-auto relative select-none">
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                style={{
                  transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="w-full h-full relative cursor-pointer"
              >
                {/* Front Side */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 border border-gold-400/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-400/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
                  
                  {/* Header / Brand */}
                  <div className="flex justify-between items-start z-10">
                    <div className="w-10 h-7 bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 rounded-md border border-gold-400/20 relative shadow-inner">
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/20" />
                      <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-black/20" />
                      <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-black/20" />
                    </div>
                    
                    <span className="font-serif text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">
                      {getCardType(simulatedCardNumber)}
                    </span>
                  </div>

                  {/* Card Number */}
                  <div className="font-mono text-base sm:text-lg tracking-[0.18em] text-white text-center z-10 py-2">
                    {formatCardNumberVisual(simulatedCardNumber)}
                  </div>

                  {/* Footer / Card Details */}
                  <div className="flex justify-between items-end z-10">
                    <div className="flex flex-col max-w-[70%]">
                      <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">Card Holder</span>
                      <span className="text-[10px] sm:text-xs text-white uppercase tracking-wider font-medium truncate font-mono">
                        {simulatedCardName || 'RAHUL DESHMUKH'}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">Expires</span>
                      <span className="text-[10px] sm:text-xs text-white font-mono">
                        {simulatedCardExpiry || 'MM/YY'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-gold-400/20 rounded-2xl py-6 shadow-2xl flex flex-col justify-between"
                >
                  <div className="w-full h-9 bg-zinc-900 mt-2" />
                  
                  <div className="px-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-7 bg-zinc-800 rounded-xs flex items-center justify-end px-3">
                        <span className="text-[9px] text-zinc-600 font-mono tracking-widest">aura-abode</span>
                      </div>
                      <div className="w-12 h-7 bg-white text-black font-mono text-xs flex items-center justify-center font-bold italic rounded-xs shadow-inner">
                        {simulatedCardCvv || '•••'}
                      </div>
                    </div>
                    
                    <p className="text-[6px] text-zinc-600 leading-normal text-justify uppercase tracking-wider">
                      This simulated payment visualizer verifies secure booking confirmation for Diti Hospitality and Aura Abode Karjat.
                    </p>
                  </div>
                  
                  <div className="px-6 flex justify-between items-center text-[7px] text-gold-400/50 uppercase tracking-widest font-mono">
                    <span>Secure Sandbox Gateway</span>
                    <span>CVV Hidden</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSimulatedPaymentSubmit} className="space-y-4">
              <div className="bg-zinc-900/40 p-4 border border-zinc-900 text-xs flex justify-between items-center text-zinc-400 mb-2">
                <span>Paying to: <strong className="text-white">Aura Abode Karjat</strong></span>
                <span className="text-gold-400 font-bold">₹{Math.round(pricing.total).toLocaleString('en-IN')}</span>
              </div>

              {paymentError && (
                <div className="text-red-500 text-xs bg-red-900/10 border border-red-900/20 p-3 text-center">
                  {paymentError}
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RAHUL DESHMUKH"
                    value={simulatedCardName}
                    onChange={(e) => setSimulatedCardName(e.target.value.toUpperCase())}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={simulatedCardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs focus:outline-none focus:border-gold-400 transition-colors font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={simulatedCardExpiry}
                      onChange={handleCardExpiryChange}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs focus:outline-none focus:border-gold-400 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">CVV Code</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      placeholder="•••"
                      value={simulatedCardCvv}
                      onChange={(e) => setSimulatedCardCvv(e.target.value.replace(/\D/g,''))}
                      onFocus={() => setIsCardFlipped(true)}
                      onBlur={() => setIsCardFlipped(false)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-xs focus:outline-none focus:border-gold-400 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-bold transition-colors shadow-md mt-6 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    Verifying Payment...
                  </>
                ) : (
                  `Pay ₹${Math.round(pricing.total).toLocaleString('en-IN')}`
                )}
              </button>
            </form>
          </div>
        </div>
      )}
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
