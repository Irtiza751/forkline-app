import type { CustomizationGroup } from '@/types/menuCustomization.types';
import type { MenuItem, Restaurant } from '@/types/restaurant.types';

function matches(patterns: RegExp[], text: string) {
  return patterns.some((p) => p.test(text));
}

export function getCustomizationGroups(menuItem: MenuItem, restaurant: Restaurant): CustomizationGroup[] {
  const text = `${menuItem.name} ${menuItem.category} ${menuItem.description}`.toLowerCase();
  const tags = restaurant.tags.join(' ').toLowerCase();

  const isDesi =
    tags.includes('desi') ||
    matches(
      [/biryani/, /karahi/, /naan/, /tikka/, /pulao/, /nihari/, /daal/, /paratha/, /bbq platter/],
      text
    );

  const isPizza =
    tags.includes('pizza') || matches([/pizza/, /calzone/], text);

  const isBurger =
    tags.includes('burgers') || matches([/burger/, /zinger/, /wrap/, /slider/], text);

  const isSushi = tags.includes('sushi') || matches([/sushi/, /roll/, /sashimi/, /maki/], text);

  if (isDesi) {
    return [
      {
        id: 'bread',
        label: 'Bread',
        type: 'single',
        options: [
          { id: 'regular-naan', label: 'Regular naan', price: 0 },
          { id: 'butter-naan', label: 'Butter naan', price: 80 },
          { id: 'garlic-naan', label: 'Garlic naan', price: 120 },
          { id: 'extra-naan', label: 'Extra naan', price: 100 },
        ],
      },
      {
        id: 'sides',
        label: 'Add-ons',
        type: 'multiple',
        options: [
          { id: 'raita', label: 'Raita', price: 90 },
          { id: 'salad', label: 'Kachumber salad', price: 70 },
          { id: 'extra-gravy', label: 'Extra gravy', price: 150 },
          { id: 'green-chutney', label: 'Green chutney', price: 40 },
        ],
      },
      {
        id: 'spice',
        label: 'Spice level',
        type: 'single',
        options: [
          { id: 'mild', label: 'Mild', price: 0 },
          { id: 'medium', label: 'Medium', price: 0 },
          { id: 'hot', label: 'Hot', price: 0 },
        ],
      },
    ];
  }

  if (isPizza) {
    return [
      {
        id: 'cheese',
        label: 'Cheese',
        type: 'single',
        options: [
          { id: 'regular-cheese', label: 'Regular cheese', price: 0 },
          { id: 'extra-cheese', label: 'Extra cheese', price: 150 },
          { id: 'double-cheese', label: 'Double cheese', price: 250 },
        ],
      },
      {
        id: 'toppings',
        label: 'Extra toppings',
        type: 'multiple',
        options: [
          { id: 'olives', label: 'Olives', price: 80 },
          { id: 'mushroom', label: 'Mushrooms', price: 90 },
          { id: 'jalapeno', label: 'Jalapeños', price: 70 },
        ],
      },
      {
        id: 'sauce',
        label: 'Sides & sauce',
        type: 'multiple',
        options: [
          { id: 'ketchup', label: 'Ketchup', price: 0 },
          { id: 'garlic-dip', label: 'Garlic dip', price: 50 },
        ],
      },
    ];
  }

  if (isBurger) {
    return [
      {
        id: 'cheese',
        label: 'Cheese',
        type: 'single',
        options: [
          { id: 'no-cheese', label: 'No cheese', price: 0 },
          { id: 'cheddar', label: 'Cheddar slice', price: 80 },
          { id: 'extra-cheese', label: 'Extra cheese', price: 120 },
        ],
      },
      {
        id: 'addons',
        label: 'Add-ons',
        type: 'multiple',
        options: [
          { id: 'extra-patty', label: 'Extra patty', price: 250 },
          { id: 'bacon', label: 'Beef bacon', price: 180 },
          { id: 'ketchup', label: 'Extra ketchup', price: 0 },
          { id: 'mayo', label: 'Extra mayo', price: 0 },
        ],
      },
    ];
  }

  if (isSushi) {
    return [
      {
        id: 'extras',
        label: 'Extras',
        type: 'multiple',
        options: [
          { id: 'soy', label: 'Extra soy sauce', price: 0 },
          { id: 'wasabi', label: 'Extra wasabi', price: 0 },
          { id: 'ginger', label: 'Extra pickled ginger', price: 40 },
        ],
      },
      {
        id: 'rice',
        label: 'Rice base',
        type: 'single',
        options: [
          { id: 'white', label: 'White rice', price: 0 },
          { id: 'brown', label: 'Brown rice', price: 60 },
        ],
      },
    ];
  }

  return [
    {
      id: 'condiments',
      label: 'Extras',
      type: 'multiple',
      options: [
        { id: 'ketchup', label: 'Ketchup', price: 0 },
        { id: 'mayo', label: 'Mayonnaise', price: 0 },
        { id: 'extra-cheese', label: 'Extra cheese', price: 100 },
      ],
    },
  ];
}

export function getDefaultSelections(groups: CustomizationGroup[]): Record<string, string[]> {
  const selections: Record<string, string[]> = {};
  for (const group of groups) {
    if (group.type === 'single' && group.options[0]) {
      selections[group.id] = [group.options[0].id];
    } else {
      selections[group.id] = [];
    }
  }
  return selections;
}
