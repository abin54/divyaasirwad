import * as functions from 'firebase-functions';
import { logger } from './firebase';

export interface LogContext {
  userId?: string;
  bookingId?: string;
  templeId?: string;
  paymentId?: string;
  [key: string]: unknown;
}

export function logInfo(message: string, context?: LogContext) {
  logger.info(message, { timestamp: new Date().toISOString(), level: 'info', ...context });
}

export function logWarn(message: string, context?: LogContext) {
  logger.warn(message, { timestamp: new Date().toISOString(), level: 'warn', ...context });
}

export function logError(message: string, error?: Error, context?: LogContext) {
  logger.error(message, {
    timestamp: new Date().toISOString(),
    level: 'error',
    error: error ? { name: error.name, message: error.message, stack: error.stack } : undefined,
    ...context,
  });
}

export function logEvent(name: string, properties?: Record<string, unknown>, context?: LogContext) {
  logger.info(`event:${name}`, {
    timestamp: new Date().toISOString(),
    eventType: name,
    properties,
    ...context,
  });
}

export function measurePerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  return fn().then(
    (result) => {
      const duration = Date.now() - start;
      logInfo(`performance:${name}`, { duration, status: 'success' });
      return result;
    },
    (error) => {
      const duration = Date.now() - start;
      logError(`performance:${name}`, error, { duration, status: 'error' });
      throw error;
    }
  );
}

export const healthCheck = functions.https.onRequest((_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.K_REVISION || 'dev',
    uptime: process.uptime(),
  });
});
