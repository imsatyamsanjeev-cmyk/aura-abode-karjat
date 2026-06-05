import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prismaInstance: PrismaClient | null };

function getPrismaClient(): PrismaClient {
  // Return cached instance in dev mode to support hot reloading
  if (process.env.NODE_ENV !== 'production' && globalForPrisma.prismaInstance) {
    return globalForPrisma.prismaInstance;
  }

  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/aura_abode';
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prismaInstance = client;
  }

  return client;
}

// Export a Proxy that intercepts database operations and initializes the database pool lazily
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    const client = getPrismaClient();
    
    // Bind functions to client to maintain correct context
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});

export default prisma;
