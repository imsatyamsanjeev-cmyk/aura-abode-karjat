import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="bg-background min-h-screen text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8 bg-zinc-950 p-8 md:p-12 border border-zinc-900 leading-relaxed font-light text-zinc-400 text-sm">
        <h1 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide border-b border-zinc-900 pb-4">
          Terms & Conditions
        </h1>
        
        <p className="text-xs text-zinc-500">Last updated: June 5, 2026</p>

        <p>
          Welcome to **Aura Abode Karjat**. By booking a stay or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before making a reservation.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">1. Scope of Agreement</h2>
        <p>
          This agreement regulates the short-term vacation rental of the Aura Abode Studio Apartment located in Karjat, Maharashtra, India, between the primary booking guest and the management of Aura Abode.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">2. Reservation & Payment</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Bookings are confirmed only upon receipt of 100% advance payment via our secure payment processor (Razorpay) and validation of details.</li>
          <li>Guests must provide a valid government-issued photo ID (Aadhaar, Passport, or Driving License) for all occupants prior to or at the time of check-in.</li>
          <li>Tariffs are dynamically calculated based on dates and guest count. The primary guest must match the headcount entered during booking. Extra charges apply for undeclared guests.</li>
        </ul>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">3. Check-In & Check-Out Policies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Standard Check-In time is **2:00 PM** onwards on the scheduled arrival date.</li>
          <li>Standard Check-Out time is **11:00 AM** on the scheduled departure date.</li>
          <li>Delays in check-out disrupt cleaning schedules for subsequent guests and jacuzzi water replacement cycles. Late checkout without permission may incur a penalty charge of ₹1,000 per hour.</li>
        </ul>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">4. House Guidelines & Jacuzzi Safety</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Jacuzzi Use:</strong> Guests use the private outdoor Jacuzzi entirely at their own risk. Children must be supervised by an adult at all times near the Jacuzzi. Glassware is strictly prohibited around the tub area; plastic cups are provided.</li>
          <li><strong>Quiet Hours:</strong> Respect our neighbors inside the society. Loud music, shouting, or noisy outdoor activities are strictly prohibited between **10:00 PM and 8:00 AM**.</li>
          <li><strong>Smoking & Drugs:</strong> Smoking is strictly forbidden inside the luxury room. Guests may smoke in the private garden area only. Consumption of illegal substances is strictly prohibited on the property and will result in immediate eviction without refund.</li>
          <li><strong>Pets:</strong> Pets are not allowed inside the studio or in the private lawn.</li>
        </ul>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">5. Liability & Property Damages</h2>
        <p>
          Guests are expected to keep the property, furniture, fittings, jacuzzi, and lawn in the same state of repair and condition as at the commencement of the stay. Any damage, breakage, or loss caused during the stay will be charged directly to the primary guest and must be settled prior to check-out.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">6. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of the State of Maharashtra, India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Raigad District, Maharashtra.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">7. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding these Terms & Conditions, please reach out to us at:
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
