export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_aura_abode_admin';

// PBKDF2 Helpers for password hashing & verification
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Please provide username and password.' }, { status: 400 });
    }

    let isMatch = false;
    let userId = 'fallback-admin-id';

    try {
      // 1. Seed default admin if none exists
      const adminCount = await prisma.adminUser.count();
      if (adminCount === 0) {
        const defaultUser = process.env.ADMIN_USERNAME || 'admin';
        const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const hash = hashPassword(defaultPassword);
        
        await prisma.adminUser.create({
          data: {
            username: defaultUser,
            passwordHash: hash,
          },
        });
        console.log(`Seeded default admin user: ${defaultUser}`);
      }

      // 2. Query admin user
      const admin = await prisma.adminUser.findUnique({
        where: { username },
      });

      if (admin) {
        isMatch = verifyPassword(password, admin.passwordHash);
        userId = admin.id;
      }
    } catch (dbError) {
      console.warn('Database error during admin login, falling back to environment variable authentication:', dbError);
      
      // Fallback: Verify credentials directly using environment variables or defaults
      const envUsername = process.env.ADMIN_USERNAME || 'admin';
      const envPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (username === envUsername && password === envPassword) {
        isMatch = true;
        userId = 'env-fallback-admin';
      }
    }

    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { id: userId, username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Build response and set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully.',
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error logging in admin:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
