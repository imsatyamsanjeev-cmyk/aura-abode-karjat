import React from 'react';
import Link from 'next/link';
import { Calendar, Shield, Sparkles, MessageCircle, MapPin, Compass, Tv, Key, Waves, Trees, Star, Quote } from 'lucide-react';

export default function Home() {
  const highlights = [
    {
      icon: <Waves className="w-8 h-8 text-gold-400" />,
      title: 'Private Jacuzzi',
      desc: 'Soak away your stress in a heated, fully private outdoor Jacuzzi under the starlit sky.',
    },
    {
      icon: <Trees className="w-8 h-8 text-gold-400" />,
      title: 'Private Garden Lawn',
      desc: 'Walk barefoot on lush green grass in your own enclosed private garden sanctuary.',
    },
    {
      icon: <Compass className="w-8 h-8 text-gold-400" />,
      title: 'Scenic Karjat Valleys',
      desc: 'Surrounded by the magnificent Western Ghats, offering clean air and serene mountain vistas.',
    },
    {
      icon: <Tv className="w-8 h-8 text-gold-400" />,
      title: 'Luxury Interiors',
      desc: 'Elegant studio apartment with premium bedding, modern furnishings, and a smart home setup.',
    },
  ];

  const reviews = [
    {
      name: 'Rohan Deshmukh',
      location: 'Mumbai',
      rating: 5,
      comment: 'A absolute gem of a place! The private jacuzzi in the garden is sheer luxury. Extremely clean, beautiful lighting, and perfect for couples. Will definitely visit again.',
    },
    {
      name: 'Priyanka Sen',
      location: 'Pune',
      rating: 5,
      comment: 'Loved the modern aesthetic and the peace of the location. Aura Abode feels like a high-end luxury resort but with absolute privacy. Check-in was seamless and host was very helpful.',
    },
    {
      name: 'Amit Verma',
      location: 'Thane',
      rating: 5,
      comment: 'Perfect weekend getaway. It is close to Mumbai yet feels worlds away. Having a private lawn to sip morning tea and a jacuzzi to relax in the evening was incredible. 10/10 recommended.',
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <img
            src="/images/valleys/valley1.jpeg"
            alt="Aura Abode Karjat Luxury Studio"
            className="w-full h-full object-cover object-center scale-105 animate-[zoom_20s_infinite_alternate]"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white mt-12 animate-fade-in">
          <span className="text-gold-400 text-xs md:text-sm font-sans tracking-[0.5em] uppercase font-semibold block mb-4">
            Welcome to Paradise
          </span>
          <h1 className="font-serif text-4xl md:text-7xl font-medium tracking-wide leading-[1.15] mb-6">
            Luxury Studio Apartment <br className="hidden md:block" />
            <span className="italic font-light text-zinc-300">with</span> <br className="md:hidden" />
            <span className="text-gold-400 block mt-3 font-semibold">Private Garden & Jacuzzi</span>
          </h1>
          <p className="text-sm md:text-lg font-light tracking-wide text-zinc-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Nestled in the lush valleys of Karjat, Aura Abode offers a secluded sanctuary of premium comfort, high-end interiors, and private wellness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-all duration-300 rounded-none transform hover:-translate-y-0.5"
            >
              Reserve Your Stay
            </Link>
            <a
              href="https://wa.me/919867778833?text=Hi!%20I'm%20interested%20in%20booking%20Aura%20Abode%20Karjat."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-gold-400/80 text-white hover:text-gold-400 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-none flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Scroll Down</span>
          <div className="w-[1px] h-10 bg-zinc-800 relative overflow-hidden">
            <div className="w-full h-1/2 bg-gold-400 absolute top-0 left-0 animate-[scrollLine_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* 2. Core Experience Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 space-y-8 animate-fade-in">
            <span className="text-gold-500 text-xs font-sans tracking-[0.4em] uppercase font-semibold block">
              The Experience
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium leading-tight">
              An Oasis of Seclusion <br />
              <span className="italic font-light text-zinc-300">and Private</span> Wellness
            </h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Aura Abode Karjat redefines the weekend getaway. Designed for discerning travelers seeking tranquility, our signature studio apartment blends contemporary luxury with natural beauty.
            </p>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Step out onto your private lawn to feel the morning dew, sink into your private heated Jacuzzi to unwind under the stars, or relax inside in an elegantly appointed space built with high-quality decor.
            </p>
            <div className="pt-4">
              <Link
                href="/property"
                className="text-xs uppercase tracking-[0.2em] text-gold-400 hover:text-gold-500 font-bold border-b border-gold-400 hover:border-gold-500 pb-1.5 transition-colors inline-block"
              >
                Explore Apartment Details →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="h-72 overflow-hidden border border-gold-400/10 group relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img
                  src="/images/jacuzzi/jacuzzi1.jpeg"
                  alt="Private Heated Jacuzzi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-96 overflow-hidden border border-gold-400/10 group relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img
                  src="/images/bedroom/bedroom1.jpeg"
                  alt="Studio Bedroom Suite"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-80 overflow-hidden border border-gold-400/10 group relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img
                  src="/images/living-room/living4.jpeg"
                  alt="Modern Studio Seating"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-6 pt-16">
              <div className="h-96 overflow-hidden border border-gold-400/10 group relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img
                  src="/images/garden/garden1.jpeg"
                  alt="Private Enclosed Garden Lawn"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-72 overflow-hidden border border-gold-400/10 group relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img
                  src="/images/living-room/living1.jpeg"
                  alt="Chic Studio Interior Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-80 overflow-hidden border border-gold-400/10 group relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img
                  src="/images/garden/garden3.jpeg"
                  alt="Lush Abode Landscaping"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Amenities Grid */}
      <section className="bg-zinc-950/60 border-y border-gold-400/10 py-28 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
              Curated Indulgences
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
              Amenities Designed to Pamper
            </h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/10 p-10 border border-zinc-900 hover:border-gold-400/20 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-[1px] h-0 bg-gold-400/40 group-hover:h-full transition-all duration-750" />
                <div className="mb-8 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 inline-block">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-white font-medium mb-4 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/property#amenities"
              className="text-xs uppercase tracking-widest text-gold-400 font-bold border-b border-gold-400 pb-1 hover:text-gold-500 hover:border-gold-500 transition-all inline-block"
            >
              View Full Amenities List
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5 Local Wonders / Sightseeing Section */}
      <section className="py-28 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-gold-500 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
            Explore Karjat
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
            Local Wonders Near Aura Abode
          </h2>
          <p className="text-zinc-500 text-xs font-light max-w-md mx-auto leading-relaxed">
            Enhance your stay by visiting some of Maharashtra's most scenic viewpoints and waterfall trails, located just a short drive from the villa.
          </p>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-950 border border-zinc-900/60 p-8 space-y-4 hover:border-gold-400/15 transition-all duration-500">
            <div className="text-gold-400 text-xs uppercase tracking-widest font-semibold block mb-2 font-mono">01 / WATERFALLS</div>
            <h3 className="font-serif text-xl text-white font-semibold">Bhivpuri Waterfall</h3>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Located only 20 minutes away, Bhivpuri is a majestic waterfall hotspot especially active during the monsoons. Perfect for a refreshing dip and short jungle trail walks.
            </p>
          </div>
          <div className="bg-zinc-950 border border-zinc-900/60 p-8 space-y-4 hover:border-gold-400/15 transition-all duration-500">
            <div className="text-gold-400 text-xs uppercase tracking-widest font-semibold block mb-2 font-mono">02 / TREKKING</div>
            <h3 className="font-serif text-xl text-white font-semibold">Sondai Fort Trek</h3>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              A beginner-friendly historical trek offering breathtaking panoramic views of the Morbe Dam reservoir and fog-covered valleys of Karjat. Highly recommended for morning trails.
            </p>
          </div>
          <div className="bg-zinc-950 border border-zinc-900/60 p-8 space-y-4 hover:border-gold-400/15 transition-all duration-500">
            <div className="text-gold-400 text-xs uppercase tracking-widest font-semibold block mb-2 font-mono">03 / HISTORY</div>
            <h3 className="font-serif text-xl text-white font-semibold">Kothaligad (Peth) Fort</h3>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              A historic sentinel fort with a unique funnel-shaped tower carving. Offers sweeping 360-degree views of the Western Ghats mountain ridges and lush seasonal streams.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Reviews / Testimonial section */}
      <section className="bg-zinc-950/40 border-t border-zinc-900/80 py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
              Guest Diaries
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
              Stories From Our Guests
            </h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, idx) => {
              const initials = r.name.split(' ').map(n => n[0]).join('');
              return (
                <div
                  key={idx}
                  className="bg-zinc-950/80 p-10 border border-zinc-900/60 hover:border-gold-400/30 flex flex-col justify-between relative group transition-all duration-500 hover:-translate-y-1 shadow-2xl"
                >
                  {/* Subtle top decorative gold line */}
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-gold-400 group-hover:w-full transition-all duration-700" />
                  
                  {/* Large decorative quote mark */}
                  <div className="absolute top-6 right-8 text-gold-900/5 group-hover:text-gold-400/5 transition-colors duration-300 pointer-events-none">
                    <Quote size={56} className="rotate-180" />
                  </div>

                  <div className="space-y-6 relative z-10">
                    {/* Stars */}
                    <div className="flex space-x-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-zinc-900/80 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Guest initials avatar */}
                      <div className="w-9 h-9 rounded-none border border-zinc-800 bg-zinc-900/60 flex items-center justify-center text-[10px] tracking-wider font-semibold text-gold-400 group-hover:border-gold-400/30 transition-colors duration-500">
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm text-white font-medium tracking-wide">{r.name}</h4>
                        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-sans font-medium block mt-0.5">
                          Verified Guest, {r.location}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gold-950/20 px-2.5 py-1 text-[8px] text-gold-400 font-bold uppercase tracking-widest border border-gold-900/30">
                      Stayed
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Location and Map Section */}
      <section className="bg-zinc-950 border-t border-zinc-900/60 py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <span className="text-gold-500 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
                Find Us
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">
                Perfect Location, <br />
                <span className="italic font-light text-zinc-300">Easy Accessibility</span>
              </h2>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Aura Abode Karjat is located inside the prestigious Tata Glenwood society in Karjat, Maharashtra. Positioned just 2 hours from Mumbai and Pune, it is easily reachable by car or train.
              </p>
              <ul className="space-y-4 text-xs font-light text-zinc-500 pt-2">
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span>Tata Glenwood, Karjat, Maharashtra 410201</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span>24/7 Gated Security & Secure Parking Space</span>
                </li>
              </ul>
              <div className="pt-4">
                <a
                  href="https://maps.app.goo.gl/bXMgGruuRGf7prHx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3.5 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-none shadow-lg"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="lg:col-span-7 h-96 w-full border border-gold-400/10 overflow-hidden relative bg-zinc-900 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.8015099307736!2d73.33230987582236!3d18.89590885759714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f7d8e5cbce03%3A0xd4f63e686489ae56!2sAura+Abode!5e0!3m2!1sen!2sin!4v1717670000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Book section */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/85 z-10" />
          <img
            src="/images/garden/garden2.jpeg"
            alt="Aura Abode Garden"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
          <span className="text-gold-400 text-xs font-sans tracking-[0.4em] uppercase font-semibold">
            Limited Availability
          </span>
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-wide">
            Ready to Begin Your Retreat?
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Reserve your dates directly to lock in the best guaranteed pricing, secure your private garden jacuzzi stay, and get instant booking verification.
          </p>
          <div className="pt-8">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-none shadow-2xl transform hover:-translate-y-0.5"
            >
              Book Your Luxury Stay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
