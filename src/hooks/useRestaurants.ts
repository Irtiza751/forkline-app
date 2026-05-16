import { useCallback, useEffect, useMemo, useState } from 'react';

import { CATEGORIES, RESTAURANTS } from '@/data/mockData';
import type { Category, Restaurant } from '@/types/restaurant.types';

export const useRestaurants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRestaurants(RESTAURANTS);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories: Category[] = useMemo(
    () => [{ id: 'all', label: 'All' }, ...CATEGORIES],
    []
  );

  const filteredRestaurants = useMemo(() => {
    if (activeCategory === 'all') {
      return restaurants;
    }
    return restaurants.filter(
      (r) =>
        r.tags.includes(activeCategory) ||
        r.cuisine.toLowerCase().includes(activeCategory)
    );
  }, [activeCategory, restaurants]);

  const featuredRestaurants = useMemo(
    () => restaurants.filter((r) => r.isFeatured),
    [restaurants]
  );

  const refetch = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setRestaurants(RESTAURANTS);
      setIsLoading(false);
    }, 1500);
  }, []);

  return {
    restaurants: filteredRestaurants,
    featuredRestaurants,
    isLoading,
    categories,
    activeCategory,
    setActiveCategory,
    refetch,
  };
};
