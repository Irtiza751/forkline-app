import { useCallback, useEffect, useMemo, useState } from 'react';

import { CATEGORIES } from '@/data/mockData';
import type { Category } from '@/types/restaurant.types';

export const useRestaurants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories: Category[] = useMemo(() => CATEGORIES, []);

  const refetch = useCallback(() => {
    setIsRefreshing(true);
    const timer = setTimeout(() => setIsRefreshing(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    categories,
    isLoading,
    isRefreshing,
    refetch,
  };
};
