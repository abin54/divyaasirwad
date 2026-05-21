import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: { user: config.smtp.user, pass: config.smtp.pass },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"${config.app.name}" <noreply@divineconnect.app>`,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error('Email failed:', error);
  }
};

export const sendBookingConfirmationEmail = async (email: string, name: string, bookingId: string) => {
  await sendEmail(
    email,
    'Booking Confirmed - DivineConnect',
    `<h2>Namaste ${name}! 🙏</h2><p>Your booking <strong>${bookingId}</strong> has been confirmed.</p><p>You will receive updates as your puja progresses.</p><p>— Team DivineConnect</p>`
  );
};
