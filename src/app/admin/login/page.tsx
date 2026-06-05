'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        // Set local storage flag as backup for frontend client auth
        localStorage.setItem('admin_logged_in', 'true');
        router.push('/admin');
      } else if (res.status === 500 || data.error === 'Internal Server Error') {
        // If DB is down (e.g. ECONNREFUSED), fallback to client-side demo credentials
        console.warn('Database connection refused. Falling back to local storage auth simulation.');
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('admin_logged_in', 'true');
          router.push('/admin');
        } else {
          setError('Invalid credentials (try admin / admin123)');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.warn('Network error or server unavailable. Falling back to local storage auth simulation.');
      // Fallback for static builds:
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_logged_in', 'true');
        router.push('/admin');
      } else {
        setError('Invalid credentials (try admin / admin123)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-md bg-zinc-950 border border-gold-900/40 p-8 space-y-6 shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-400" />
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center text-[10px] text-zinc-500 hover:text-gold-400 uppercase tracking-widest font-semibold mb-4">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to website
          </Link>
          <h2 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-wide">
            Admin Console
          </h2>
          <p className="text-zinc-500 text-xs">Enter credentials to manage Aura Abode.</p>
        </div>

        {error && (
          <div className="bg-red-900/15 border border-red-900/30 text-red-400 p-3 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-gold-400 transition-colors rounded-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs uppercase tracking-widest font-bold transition-colors shadow flex items-center justify-center gap-2 rounded-none cursor-pointer mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                Authenticating...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-[10px] text-zinc-600 font-light border-t border-zinc-900 pt-4">
          Demo Credentials: <strong className="text-zinc-500">admin</strong> / <strong className="text-zinc-500">admin123</strong>
        </div>
      </div>
    </div>
  );
}
