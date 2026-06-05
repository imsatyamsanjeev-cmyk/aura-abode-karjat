import nodemailer from 'nodemailer';

// Helper to create transport
function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('SMTP credentials are missing. Emails will be logged to console.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendBookingConfirmationEmail(booking: {
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
  id: string;
}) {
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Aura Abode Karjat" <ditihospitality.india@gmail.com>',
    to: booking.guestEmail,
    subject: `Booking Confirmed! Aura Abode Karjat - Booking ID: ${booking.id.substring(0, 8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; border-radius: 8px; padding: 20px; background-color: #fff;">
        <div style="text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 20px;">
          <h2 style="color: #000; margin: 0;">AURA ABODE KARJAT</h2>
          <p style="color: #d4af37; font-style: italic; margin: 5px 0 0 0;">Luxury Studio Apartment with Private Garden & Jacuzzi</p>
        </div>
        <p>Dear <strong>${booking.guestName}</strong>,</p>
        <p>Thank you for choosing Aura Abode Karjat. Your booking is officially <strong>confirmed</strong>!</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Check-In Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(booking.checkIn).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Check-Out Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(booking.checkOut).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total Amount Paid:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #d4af37;">₹${booking.totalAmount.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Booking Reference:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-family: monospace;">${booking.id}</td>
          </tr>
        </table>

        <div style="background-color: #fcf8e3; border: 1px solid #fbeed5; padding: 15px; border-radius: 4px; color: #c09853; margin-top: 20px;">
          <strong>Important Guidelines:</strong>
          <ul style="margin: 5px 0 0 0; padding-left: 20px;">
            <li>Standard check-in is 2:00 PM and check-out is 11:00 AM.</li>
            <li>Please carry a valid government-issued ID card for registration.</li>
            <li>No smoking inside the luxury room. Smoking is allowed only in the private garden area.</li>
            <li>Jacuzzi guidelines must be followed for your safety and hygiene.</li>
          </ul>
        </div>
        
        <p style="margin-top: 30px; text-align: center; color: #888; font-size: 12px;">
          For any questions, reach out to us at <a href="mailto:ditihospitality.india@gmail.com" style="color: #d4af37;">ditihospitality.india@gmail.com</a> or WhatsApp us.
        </p>
      </div>
    `,
  };

  const transporter = getMailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${booking.guestEmail}`);
    } catch (error) {
      console.error('Error sending confirmation email via SMTP:', error);
    }
  } else {
    console.log('--- MOCK EMAIL OUTBOUND (GUEST CONFIRMATION) ---');
    console.log(JSON.stringify(mailOptions, null, 2));
    console.log('------------------------------------------------');
  }
}

export async function sendAdminBookingAlertEmail(booking: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
  id: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'ditihospitality.india@gmail.com';
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Aura Abode Karjat" <ditihospitality.india@gmail.com>',
    to: adminEmail,
    subject: `New Direct Booking Confirmed - ₹${booking.totalAmount.toLocaleString('en-IN')}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #000; border-radius: 8px; padding: 20px;">
        <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Booking Received</h2>
        <p>A new direct booking has been confirmed via the website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Guest Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.guestName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Guest Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.guestEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Guest Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.guestPhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Check-In:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(booking.checkIn).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Check-Out:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(booking.checkOut).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total Amount Paid:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #d4af37;">₹${booking.totalAmount.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Booking ID:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-family: monospace;">${booking.id}</td>
          </tr>
        </table>
        
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px;">View Admin Dashboard</a></p>
      </div>
    `,
  };

  const transporter = getMailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Admin booking alert email sent to ${adminEmail}`);
    } catch (error) {
      console.error('Error sending admin alert email via SMTP:', error);
    }
  } else {
    console.log('--- MOCK EMAIL OUTBOUND (ADMIN ALERT) ---');
    console.log(JSON.stringify(mailOptions, null, 2));
    console.log('-----------------------------------------');
  }
}

export async function sendSMSNotification(phone: string, message: string) {
  // Production integration point for Twilio or MSG91
  // We log this as a mock alert for local testing.
  console.log(`--- SMS NOTIFICATION SENT ---`);
  console.log(`To: ${phone}`);
  console.log(`Message: ${message}`);
  console.log(`-----------------------------`);
}
