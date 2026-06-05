import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-background min-h-screen text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8 bg-zinc-950 p-8 md:p-12 border border-zinc-900 leading-relaxed font-light text-zinc-400 text-sm">
        <h1 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide border-b border-zinc-900 pb-4">
          Privacy Policy
        </h1>
        
        <p className="text-xs text-zinc-500">Last updated: June 5, 2026</p>

        <p>
          At <strong>Aura Abode Karjat</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Aura Abode Karjat and how we use it.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">1. Information We Collect</h2>
        <p>
          When you make a reservation or use the contact forms on our website, we collect personal information you provide to us, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Full name and address details</li>
          <li>Contact details (email address and phone number)</li>
          <li>Check-in and check-out dates and guest counts</li>
          <li>Billing and transaction reference numbers (collected securely via Razorpay)</li>
        </ul>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">2. How We Use Your Information</h2>
        <p> We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Process, confirm, and manage your accommodation bookings</li>
          <li>Send transaction emails, invoices, and booking confirmations</li>
          <li>Register entry logs as required by local Maharashtra tourism guidelines</li>
          <li>Communicate with you for customer support, check-in instructions, and updates</li>
          <li>Detect and prevent fraudulent payments or security issues</li>
        </ul>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">3. Payment & Data Security</h2>
        <p>
          We take transaction security seriously. All payments are processed through **Razorpay**, a secure, PCI-DSS compliant third-party payment gateway. Aura Abode Karjat does **not** store or have access to your raw credit/debit card numbers, UPI PINs, or net banking credentials. Your financial transaction data is encrypted and transmitted securely using Secure Socket Layer (SSL) technology.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">4. Sharing Your Data</h2>
        <p>
          We do not sell, trade, or transfer your personal data to outside parties. Your data is only shared with trusted service providers who assist us in operating our website, conducting our business, or serving our guests (such as email service providers, SMS gateways, and payment partners), so long as those parties agree to keep this information confidential.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">5. Cookies & Tracking</h2>
        <p>
          Our website uses standard cookies to enhance user experience, such as maintaining your admin session or preserving selected calendar dates as you navigate to checkout. You can choose to disable cookies through your individual browser options, though some features of the website may not function fully.
        </p>

        <h2 className="font-serif text-lg text-white font-semibold mt-8">6. GDPR & User Rights</h2>
        <p>
          If you are a resident of the European Economic Area (EEA), you have certain data protection rights. You have the right to request access, correction, deletion, or restriction of the personal data we hold about you. To exercise these rights, please contact us at <a href="mailto:ditihospitality.india@gmail.com" className="text-gold-400 hover:underline">ditihospitality.india@gmail.com</a>.
        </p>

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
