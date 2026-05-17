import { useMemo } from 'react';

import { RESTAURANTS } from '@/data/mockData';
import type { Restaurant } from '@/types/restaurant.types';

export const useRestaurantSearch = (query: string, categoryId: string | null) => {
  return useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let results: Restaurant[] = RESTAURANTS;

    if (categoryId) {
      results = results.filter(
        (r) =>
          r.tags.some((t) => t.toLowerCase().includes(categoryId)) ||
          r.cuisine.toLowerCase().includes(categoryId)
      );
    }

    if (!normalized) {
      return results;
    }

    return results.filter(
      (r) =>
        r.name.toLowerCase().includes(normalized) ||
        r.cuisine.toLowerCase().includes(normalized) ||
        r.tags.some((t) => t.toLowerCase().includes(normalized))
    );
  }, [query, categoryId]);
};
