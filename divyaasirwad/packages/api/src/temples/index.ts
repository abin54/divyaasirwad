import * as functions from 'firebase-functions';
import { db, collections } from '../lib/firebase';
import { AppError, requireAuth, successResponse, paginatedResponse } from '../lib/errors';
import { logInfo, logEvent, measurePerformance } from '../lib/observability';

export const getTemples = functions.https.onCall(async (data) => {
  return measurePerformance('temples.list', async () => {
    const { page = 1, limit = 20, city, state, deityId, category, search } = data;
    let query = collections.temples.where('isActive', '==', true);

    if (city) query = query.where('address.city', '==', city);
    if (state) query = query.where('address.state', '==', state);
    if (deityId) query = query.where('deityId', '==', deityId);
    if (category) query = query.where('category', '==', category);

    const skip = (page - 1) * limit;
    const snapshot = await query.orderBy('totalBookings', 'desc').offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();

    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});

export const getTempleBySlug = functions.https.onCall(async (data) => {
  return measurePerformance('temples.getBySlug', async () => {
    const { slug } = data;
    const snapshot = await collections.temples.where('slug', '==', slug).where('isActive', '==', true).limit(1).get();
    if (snapshot.empty) throw new AppError('Temple not found', 404, 'NOT_FOUND');
    return successResponse(snapshot.docs[0].data());
  });
});

export const getFeaturedTemples = functions.https.onCall(async () => {
  return measurePerformance('temples.featured', async () => {
    const snapshot = await collections.temples
      .where('isActive', '==', true)
      .where('category', 'in', ['famous', 'pilgrimage'])
      .orderBy('totalBookings', 'desc')
      .limit(10)
      .get();
    return successResponse(snapshot.docs.map((d) => d.data()));
  });
});

export const searchTemples = functions.https.onCall(async (data) => {
  return measurePerformance('temples.search', async () => {
    const { q } = data;
    if (!q) throw new AppError('Search query required', 400, 'INVALID_ARGUMENT');
    const snapshot = await collections.temples
      .where('isActive', '==', true)
      .orderBy('name')
      .startAt(q)
      .endAt(q + '\uf8ff')
      .limit(20)
      .get();
    return successResponse(snapshot.docs.map((d) => d.data()));
  });
});

export const getCities = functions.https.onCall(async () => {
  return measurePerformance('temples.cities', async () => {
    const snapshot = await collections.temples.where('isActive', '==', true).get();
    const cities = new Set<string>();
    snapshot.docs.forEach((d) => {
      const city = d.data().address?.city;
      if (city) cities.add(city);
    });
    return successResponse(Array.from(cities).sort());
  });
});

export const getNearbyTemples = functions.https.onCall(async (data) => {
  return measurePerformance('temples.nearby', async () => {
    const { lat, lng, radius = 50 } = data;
    const snapshot = await collections.temples.where('isActive', '==', true).get();
    const temples = snapshot.docs.map((d) => d.data());
    const nearby = temples.filter((t) => {
      const dist = calculateDistance(lat, lng, t.location.latitude, t.location.longitude);
      return dist <= radius;
    });
    return successResponse(nearby.sort((a, b) => a.totalBookings - b.totalBookings).slice(0, 20));
  });
});

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
