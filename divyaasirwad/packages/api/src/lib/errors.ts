import * as functions from 'firebase-functions';
import { logger } from './firebase';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function withErrorHandling<T extends (...args: any[]) => any>(fn: T) {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AppError) {
        logger.warn('AppError:', { code: error.code, message: error.message, details: error.details });
        throw new functions.https.HttpsError(
          getHttpErrorCode(error.statusCode),
          error.message,
          { code: error.code, details: error.details }
        );
      }

      logger.error('Unhandled error:', error);
      throw new functions.https.HttpsError('internal', 'Internal server error');
    }
  };
}

function getHttpErrorCode(statusCode: number): functions.https.FunctionsErrorCode {
  if (statusCode === 400) return 'invalid-argument';
  if (statusCode === 401) return 'unauthenticated';
  if (statusCode === 403) return 'permission-denied';
  if (statusCode === 404) return 'not-found';
  if (statusCode === 409) return 'already-exists';
  if (statusCode === 429) return 'resource-exhausted';
  return 'internal';
}

export function requireAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new AppError('Authentication required', 401, 'UNAUTHENTICATED');
  }
  return context.auth.uid;
}

export function requireRole(uid: string, roles: string[]) {
  return async () => {
    const userDoc = await (await import('./firebase')).collections.users.doc(uid).get();
    if (!userDoc.exists) throw new AppError('User not found', 404, 'NOT_FOUND');
    const role = userDoc.data()?.role;
    if (!roles.includes(role)) {
      throw new AppError('Insufficient permissions', 403, 'PERMISSION_DENIED');
    }
    return userDoc.data();
  };
}

export function successResponse<T>(data: T, message?: string) {
  return { success: true, data, message };
}

export function paginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
  return {
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}
