import { useCallback, useEffect, useMemo, useState } from 'react';

import { CATEGORIES, RESTAURANTS } from '@/data/mockData';
import type { Category, FeedFoodItem, Restaurant } from '@/types/restaurant.types';

function buildFeedItems(restaurants: Restaurant[]): FeedFoodItem[] {
  const items: FeedFoodItem[] = [];

  for (const restaurant of restaurants) {
    for (const category of restaurant.menu) {
      for (const menuItem of category.items) {
        items.push({
          id: `${restaurant.id}-${menuItem.id}`,
          menuItem,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantRating: restaurant.rating,
          deliveryTime: restaurant.deliveryTime,
        });
      }
    }
  }

  return items.sort((a, b) => {
    if (a.menuItem.isPopular !== b.menuItem.isPopular) {
      return a.menuItem.isPopular ? -1 : 1;
    }
    return a.restaurantName.localeCompare(b.restaurantName);
  });
}

function matchesCategory(restaurant: Restaurant, categoryId: string): boolean {
  if (categoryId === 'all') return true;
  return (
    restaurant.tags.includes(categoryId) ||
    restaurant.cuisine.toLowerCase().includes(categoryId)
  );
}

export const useFoodFeed = () => {
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

  const allFeedItems = useMemo(() => buildFeedItems(restaurants), [restaurants]);

  const foodItems = useMemo(() => {
    if (activeCategory === 'all') {
      return allFeedItems;
    }
    const allowedRestaurantIds = new Set(
      restaurants.filter((r) => matchesCategory(r, activeCategory)).map((r) => r.id)
    );
    return allFeedItems.filter((item) => allowedRestaurantIds.has(item.restaurantId));
  }, [activeCategory, allFeedItems, restaurants]);

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
    foodItems,
    featuredRestaurants,
    isLoading,
    categories,
    activeCategory,
    setActiveCategory,
    refetch,
  };
};
