const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

async function run() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/aura_abode';
  console.log('Connecting to database:', connectionString);
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED'
      }
    });
    console.log('Confirmed Bookings in DB:');
    console.log(JSON.stringify(bookings, null, 2));

    const blocked = await prisma.blockedDate.findMany();
    console.log('Blocked Dates in DB:');
    console.log(JSON.stringify(blocked, null, 2));

    const feeds = await prisma.icalFeed.findMany();
    console.log('iCal Feeds in DB:');
    console.log(JSON.stringify(feeds, null, 2));
  } catch (err) {
    console.error('Error querying database:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
