import twilio from 'twilio';
import { config } from '../config';
import { logger } from '../utils/logger';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

export const sendSms = async (to: string, body: string) => {
  try {
    await client.messages.create({ body, from: config.twilio.phoneNumber, to: `+91${to}` });
    logger.info(`SMS sent to ${to}`);
  } catch (error) {
    logger.error('SMS failed:', error);
  }
};

export const sendOtpSms = async (phone: string, otp: string) => {
  await sendSms(phone, `Your ${config.app.name} OTP is: ${otp}. Valid for 5 minutes.`);
};
