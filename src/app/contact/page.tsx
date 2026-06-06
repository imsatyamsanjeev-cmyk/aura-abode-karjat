'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate contact form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Clear inputs
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen text-white py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-gold-400 text-xs font-sans tracking-[0.4em] uppercase font-semibold block">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
            Contact Aura Abode
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Have questions about bookings, pricing, jacuzzi setup, or customized events? Reach out to us, and our guest experience team will get back to you immediately.
          </p>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Contact info cards & form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Side contact details */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-serif text-xl md:text-2xl text-white font-medium tracking-wide">
              Direct Contact Details
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start bg-zinc-950 p-6 border border-zinc-900">
                <MapPin className="w-6 h-6 text-gold-400 mr-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-serif text-white text-sm font-semibold">Our Location</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    Tata Glenwood, Karjat, Maharashtra 410201, India
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-zinc-950 p-6 border border-zinc-900">
                <Phone className="w-6 h-6 text-gold-400 mr-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-serif text-white text-sm font-semibold">Call or Text</h4>
                  <a href="tel:+919867778833" className="text-xs text-zinc-500 hover:text-gold-400 transition-colors font-light block">
                    +91 98677 78833
                  </a>
                  <span className="text-[10px] text-zinc-600 block">(Guest Relations Desk)</span>
                </div>
              </div>

              <div className="flex items-start bg-zinc-950 p-6 border border-zinc-900">
                <Mail className="w-6 h-6 text-gold-400 mr-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-serif text-white text-sm font-semibold">Email Us</h4>
                  <a href="mailto:ditihospitality.india@gmail.com" className="text-xs text-zinc-500 hover:text-gold-400 transition-colors font-light block">
                    ditihospitality.india@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Whatsapp Card */}
            <div className="bg-green-950/20 border border-green-900/30 p-6 space-y-4">
              <h4 className="font-serif text-green-400 text-sm font-semibold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Instant WhatsApp Chat
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Connect directly with our manager on WhatsApp for instant replies regarding customized stays, jacuzzi options, or directions.
              </p>
              <a
                href="https://wa.me/919867778833?text=Hi!%20I'm%20interested%20in%20booking%20Aura%20Abode%20Karjat."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-none shadow"
              >
                Send WhatsApp Message
              </a>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 md:p-8 border border-zinc-900">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-gold-400" />
                <h3 className="font-serif text-2xl text-white font-bold">Message Sent Successfully</h3>
                <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
                  Thank you for reaching out! Our coordinator will review your inquiry and get back to you via email or phone within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-xl text-white font-medium tracking-wide">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98677 78833"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stay Reservation / Event Inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write details of your inquiry, including possible dates, count of adults, or specific questions about the Jacuzzi."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-bold transition-colors shadow flex items-center justify-center gap-2 rounded-none cursor-pointer"
                >
                  {loading ? 'Submitting Form...' : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom map location */}
        <div className="w-full h-96 border border-gold-400/10 overflow-hidden relative shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.8015099307736!2d73.33230987582236!3d18.89590885759714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f7d8e5cbce03%3A0xd4f63e686489ae56!2sAura+Abode!5e0!3m2!1sen!2sin!4v1717670000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) contrast(90%)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
