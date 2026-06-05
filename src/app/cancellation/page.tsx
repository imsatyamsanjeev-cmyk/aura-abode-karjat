import React from 'react';
import Link from 'next/link';

export default function CancellationPolicy() {
  return (
    <div className="bg-background min-h-screen text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8 bg-zinc-950 p-8 md:p-12 border border-zinc-900 leading-relaxed font-light text-zinc-400 text-sm">
        <h1 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide border-b border-zinc-900 pb-4">
          Cancellation & Refund Policy
        </h1>
        
        <p className="text-xs text-zinc-500">Last updated: June 5, 2026</p>

        <p>
          At **Aura Abode Karjat**, we understand that travel plans can change. Since we are a single-unit boutique vacation rental property, bookings block the calendar entirely, preventing other reservations. Hence, we maintain a structured cancellation and refund policy.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">1. Cancellation Timelines & Refund Tiers</h2>
        <p>Refund amounts are calculated based on the window between the cancellation request time and the scheduled check-in time (2:00 PM on arrival date):</p>
        
        <div className="overflow-x-auto my-6 border border-zinc-900">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-900 text-white border-b border-zinc-800">
                <th className="p-4 font-serif font-medium">Cancellation Window</th>
                <th className="p-4 font-serif font-medium">Refund Percentage</th>
                <th className="p-4 font-serif font-medium">Applicable Fees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-400">
              <tr>
                <td className="p-4 font-medium text-white">More than 7 Days prior to Check-in</td>
                <td className="p-4 text-green-400">100% Refund</td>
                <td className="p-4">Minus 3% payment gateway processing charges</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Between 3 to 7 Days prior to Check-in</td>
                <td className="p-4 text-gold-400">50% Refund</td>
                <td className="p-4">Minus 3% payment gateway processing charges</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Less than 72 Hours prior to Check-in</td>
                <td className="p-4 text-red-400">0% (No Refund)</td>
                <td className="p-4">Total amount is forfeited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">2. Rescheduling Policy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Rescheduling requests made more than 7 days prior to check-in are accommodated free of charge, subject to availability and seasonal tariff adjustments.</li>
          <li>Rescheduling requests made within 3 to 7 days of check-in will attract a rescheduling fee of 15% of the total booking amount.</li>
          <li>Rescheduling is not permitted within 72 hours of scheduled check-in.</li>
        </ul>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">3. Refund Processing Time</h2>
        <p>
          Once a refund request is approved in accordance with our terms, the refund will be initiated back to the original source payment account (credit card, bank account, or UPI handle). It typically takes **5 to 7 business days** for the refund to reflect in your account, depending on your bank's billing cycles.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">4. No-Show Policy</h2>
        <p>
          If you do not check in on your scheduled arrival date without prior cancellation notice, it will be treated as a "No-Show." No refunds or rescheduling will be provided, and the room will be released for booking the next day.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">5. Extreme Circumstances & Force Majeure</h2>
        <p>
          In the rare event that we must cancel your booking due to reasons beyond our control (e.g. natural disasters, severe local weather warnings, government travel mandates, structural damage, or jacuzzi maintenance emergencies), we will issue a **100% full refund** or offer alternative reschedule dates. Our liability is strictly limited to the refund of the booking amount paid.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">6. Contact Information</h2>
        <p>
          If you have any questions or require assistance with cancelling or rescheduling your booking, please reach out to us:
        </p>
        <ul className="list-none space-y-1 mt-2">
          <li>Email: <a href="mailto:ditihospitality.india@gmail.com" className="text-gold-400 hover:underline">ditihospitality.india@gmail.com</a></li>
          <li>Mobile: <a href="tel:+919867778833" className="text-gold-400 hover:underline">+91 98677 78833</a></li>
        </ul>

        <div className="pt-8 border-t border-zinc-900 flex justify-between items-center text-xs">
          <Link href="/" className="text-gold-400 hover:underline">
            ← Back to Home
          </Link>
          <span>Aura Abode Karjat</span>
        </div>
      </div>
    </div>
  );
}
