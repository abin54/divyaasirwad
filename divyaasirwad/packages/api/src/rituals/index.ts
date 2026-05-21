import * as functions from 'firebase-functions';
import { db, collections } from '../lib/firebase';
import { AppError, requireAuth, successResponse, paginatedResponse } from '../lib/errors';
import { logEvent, measurePerformance } from '../lib/observability';

export const getRituals = functions.https.onCall(async (data) => {
  return measurePerformance('rituals.list', async () => {
    const { page = 1, limit = 20, deityId, category, type, popular, trending } = data;
    let query = collections.rituals.where('isActive', '==', true);

    if (deityId) query = query.where('deityId', '==', deityId);
    if (category) query = query.where('category', '==', category);
    if (popular) query = query.where('isPopular', '==', true);
    if (trending) query = query.where('isTrending', '==', true);

    const skip = (page - 1) * limit;
    const snapshot = await query.orderBy('order', 'asc').offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();

    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});

export const getRitualBySlug = functions.https.onCall(async (data) => {
  return measurePerformance('rituals.getBySlug', async () => {
    const { slug } = data;
    const snapshot = await collections.rituals.where('slug', '==', slug).where('isActive', '==', true).limit(1).get();
    if (snapshot.empty) throw new AppError('Ritual not found', 404, 'NOT_FOUND');
    return successResponse(snapshot.docs[0].data());
  });
});

export const getTrendingRituals = functions.https.onCall(async () => {
  return measurePerformance('rituals.trending', async () => {
    const snapshot = await collections.rituals
      .where('isActive', '==', true)
      .where('isTrending', '==', true)
      .orderBy('order', 'asc')
      .limit(10)
      .get();
    return successResponse(snapshot.docs.map((d) => d.data()));
  });
});

export const getDeities = functions.https.onCall(async (data) => {
  return measurePerformance('rituals.deities', async () => {
    const { category } = data;
    let query = collections.deities.where('isActive', '==', true);
    if (category) query = query.where('category', '==', category);
    const snapshot = await query.orderBy('order', 'asc').get();
    return successResponse(snapshot.docs.map((d) => d.data()));
  });
});

export const getRecommendations = functions.https.onCall(async (data) => {
  return measurePerformance('rituals.recommendations', async () => {
    const { purpose, occasion, budget } = data;
    const PURPOSE_MAP: Record<string, string[]> = {
      health: ['maha-mrityunjaya', 'dhanvantari-puja'],
      wealth: ['lakshmi-puja', 'kuber-puja', 'ganesh-puja'],
      marriage: ['gauri-puja', 'shiva-puja'],
      education: ['saraswati-puja', 'gayatri-jaap'],
      peace: ['shanti-puja', 'navgraha-puja'],
      success: ['hanuman-chalisa', 'durga-saptashati'],
    };
    const OCCASION_MAP: Record<string, string[]> = {
      diwali: ['lakshmi-puja', 'ganesh-puja'],
      navratri: ['durga-saptashati', 'navgraha-puja'],
      shivratri: ['rudrabhishek', 'maha-mrityunjaya'],
    };

    let slugs: string[] = [];
    if (purpose && PURPOSE_MAP[purpose]) slugs.push(...PURPOSE_MAP[purpose]);
    if (occasion && OCCASION_MAP[occasion]) slugs.push(...OCCASION_MAP[occasion]);
    if (slugs.length === 0) slugs = ['satyanarayan-puja', 'rudrabhishek', 'lakshmi-puja'];

    const snapshot = await collections.rituals.where('slug', 'in', slugs).where('isActive', '==', true).get();
    let rituals = snapshot.docs.map((d) => d.data());
    if (budget) rituals = rituals.filter((r) => r.pricing.basic <= budget);

    logEvent('recommendations_generated', { purpose, occasion, count: rituals.length });
    return successResponse(rituals);
  });
});
