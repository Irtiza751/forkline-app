import type { Category, MenuCategory, MenuItem, Restaurant } from '@/types/restaurant.types';

const img = (seed: string) => `https://picsum.photos/seed/${seed}/400/250`;

function item(
  id: string,
  name: string,
  description: string,
  price: number,
  seed: string,
  category: string,
  opts?: Partial<Pick<MenuItem, 'isPopular' | 'isVeg'>>
): MenuItem {
  return {
    id,
    name,
    description,
    price,
    imageUrl: img(seed),
    category,
    isPopular: opts?.isPopular ?? false,
    isVeg: opts?.isVeg ?? false,
  };
}

function menu(categories: MenuCategory[]): MenuCategory[] {
  return categories;
}

export const CATEGORIES: Category[] = [
  { id: 'pizza', label: 'Pizza' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sushi', label: 'Sushi' },
  { id: 'desi', label: 'Desi' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'desserts', label: 'Desserts' },
];

export const POPULAR_SEARCHES = [
  'Biryani',
  'Margherita',
  'Zinger',
  'Sushi roll',
  'Smoothie bowl',
  'Cheesecake',
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Napoli Flame',
    cuisine: 'Italian · Pizza',
    rating: 4.8,
    reviewCount: 1240,
    deliveryTime: 35,
    deliveryFee: 149,
    minOrder: 500,
    imageUrl: img('napoli-flame'),
    isOpen: true,
    isFeatured: true,
    tags: ['pizza', 'italian'],
    menu: menu([
      {
        id: 'm1',
        label: 'Classic Pizzas',
        items: [
          item(
            'r1-i1',
            'Margherita Supreme',
            'San Marzano tomato, fresh mozzarella, basil oil',
            1299,
            'margherita',
            'Classic Pizzas',
            { isPopular: true, isVeg: true }
          ),
          item(
            'r1-i2',
            'Pepperoni Blaze',
            'Double pepperoni, mozzarella, smoked paprika',
            1599,
            'pepperoni',
            'Classic Pizzas'
          ),
          item(
            'r1-i3',
            'Four Cheese Melt',
            'Mozzarella, gorgonzola, parmesan, ricotta',
            1499,
            'four-cheese',
            'Classic Pizzas',
            { isVeg: true }
          ),
        ],
      },
      {
        id: 'm2',
        label: 'Gourmet',
        items: [
          item(
            'r1-i4',
            'Truffle Mushroom',
            'Wild mushrooms, truffle cream, arugula',
            1899,
            'truffle-pizza',
            'Gourmet',
            { isVeg: true }
          ),
          item(
            'r1-i5',
            'BBQ Chicken Ranch',
            'Grilled chicken, BBQ glaze, ranch drizzle',
            1699,
            'bbq-chicken',
            'Gourmet',
            { isPopular: true }
          ),
        ],
      },
      {
        id: 'm3',
        label: 'Sides',
        items: [
          item(
            'r1-i6',
            'Garlic Breadsticks',
            'Buttery garlic bread with herb dip',
            599,
            'garlic-bread',
            'Sides',
            { isVeg: true }
          ),
          item(
            'r1-i7',
            'Caesar Salad',
            'Romaine, parmesan crisps, classic dressing',
            799,
            'caesar',
            'Sides',
            { isVeg: true }
          ),
        ],
      },
    ]),
  },
  {
    id: 'r2',
    name: 'Burger District',
    cuisine: 'American · Burgers',
    rating: 4.6,
    reviewCount: 980,
    deliveryTime: 28,
    deliveryFee: 99,
    minOrder: 400,
    imageUrl: img('burger-district'),
    isOpen: true,
    isFeatured: true,
    tags: ['burgers', 'fast food'],
    menu: menu([
      {
        id: 'm1',
        label: 'Signature Burgers',
        items: [
          item(
            'r2-i1',
            'Classic Smash',
            'Double smash patty, cheddar, house sauce',
            999,
            'smash-burger',
            'Signature Burgers',
            { isPopular: true }
          ),
          item(
            'r2-i2',
            'Zinger Tower',
            'Crispy chicken, spicy slaw, pickles',
            1199,
            'zinger',
            'Signature Burgers',
            { isPopular: true }
          ),
          item(
            'r2-i3',
            'Mushroom Swiss',
            'Sautéed mushrooms, Swiss, caramelized onion',
            1099,
            'mushroom-swiss',
            'Signature Burgers'
          ),
        ],
      },
      {
        id: 'm2',
        label: 'Loaded Fries',
        items: [
          item(
            'r2-i4',
            'Cheese Fries',
            'Crispy fries, cheddar sauce, spring onion',
            649,
            'cheese-fries',
            'Loaded Fries',
            { isVeg: true }
          ),
          item(
            'r2-i5',
            'BBQ Bacon Fries',
            'Smoky BBQ, bacon bits, ranch',
            849,
            'bbq-fries',
            'Loaded Fries'
          ),
        ],
      },
      {
        id: 'm3',
        label: 'Shakes',
        items: [
          item(
            'r2-i6',
            'Oreo Blast',
            'Thick shake with Oreo crumble',
            749,
            'oreo-shake',
            'Shakes',
            { isVeg: true }
          ),
          item(
            'r2-i7',
            'Peanut Butter Shake',
            'Creamy PB, chocolate drizzle',
            799,
            'pb-shake',
            'Shakes',
            { isVeg: true }
          ),
        ],
      },
    ]),
  },
  {
    id: 'r3',
    name: 'Sakura Roll House',
    cuisine: 'Japanese · Sushi',
    rating: 4.9,
    reviewCount: 2100,
    deliveryTime: 40,
    deliveryFee: 199,
    minOrder: 800,
    imageUrl: img('sakura-roll'),
    isOpen: true,
    isFeatured: true,
    tags: ['sushi', 'japanese'],
    menu: menu([
      {
        id: 'm1',
        label: 'Maki Rolls',
        items: [
          item(
            'r3-i1',
            'California Dream',
            'Crab, avocado, cucumber, tobiko',
            1399,
            'california-roll',
            'Maki Rolls',
            { isPopular: true }
          ),
          item(
            'r3-i2',
            'Spicy Tuna Roll',
            'Fresh tuna, spicy mayo, sesame',
            1599,
            'spicy-tuna',
            'Maki Rolls',
            { isPopular: true }
          ),
          item(
            'r3-i3',
            'Veg Dragon',
            'Asparagus, avocado, teriyaki glaze',
            1199,
            'veg-dragon',
            'Maki Rolls',
            { isVeg: true }
          ),
        ],
      },
      {
        id: 'm2',
        label: 'Nigiri & Sashimi',
        items: [
          item(
            'r3-i4',
            'Salmon Nigiri (4pc)',
            'Norwegian salmon over seasoned rice',
            1499,
            'salmon-nigiri',
            'Nigiri & Sashimi'
          ),
          item(
            'r3-i5',
            'Mixed Sashimi Platter',
            'Chef selection of premium cuts',
            2499,
            'sashimi-platter',
            'Nigiri & Sashimi'
          ),
        ],
      },
      {
        id: 'm3',
        label: 'Bowls',
        items: [
          item(
            'r3-i6',
            'Poke Bowl',
            'Marinated salmon, edamame, pickled ginger',
            1799,
            'poke-bowl',
            'Bowls'
          ),
          item(
            'r3-i7',
            'Teriyaki Chicken Bowl',
            'Grilled chicken, jasmine rice, veggies',
            1299,
            'teriyaki-bowl',
            'Bowls'
          ),
        ],
      },
    ]),
  },
  {
    id: 'r4',
    name: 'Lahori Spice Kitchen',
    cuisine: 'Pakistani · Desi',
    rating: 4.7,
    reviewCount: 3200,
    deliveryTime: 45,
    deliveryFee: 120,
    minOrder: 600,
    imageUrl: img('lahori-spice'),
    isOpen: true,
    isFeatured: false,
    tags: ['desi', 'biryani'],
    menu: menu([
      {
        id: 'm1',
        label: 'Biryani & Rice',
        items: [
          item(
            'r4-i1',
            'Chicken Biryani',
            'Aromatic basmati, tender chicken, raita',
            899,
            'chicken-biryani',
            'Biryani & Rice',
            { isPopular: true }
          ),
          item(
            'r4-i2',
            'Beef Nihari Bowl',
            'Slow-cooked beef, naan, garnishes',
            1199,
            'nihari',
            'Biryani & Rice',
            { isPopular: true }
          ),
          item(
            'r4-i3',
            'Veg Pulao',
            'Seasonal vegetables, whole spices',
            699,
            'veg-pulao',
            'Biryani & Rice',
            { isVeg: true }
          ),
        ],
      },
      {
        id: 'm2',
        label: 'Karahi',
        items: [
          item(
            'r4-i4',
            'Chicken Karahi',
            'Wok-fired chicken, tomatoes, green chili',
            1299,
            'chicken-karahi',
            'Karahi'
          ),
          item(
            'r4-i5',
            'Mutton Karahi',
            'Tender mutton, ginger, coriander',
            1899,
            'mutton-karahi',
            'Karahi'
          ),
        ],
      },
      {
        id: 'm3',
        label: 'BBQ',
        items: [
          item(
            'r4-i6',
            'Seekh Kebab Platter',
            'Four seekh kebabs, chutney, salad',
            999,
            'seekh',
            'BBQ'
          ),
          item(
            'r4-i7',
            'Malai Boti',
            'Creamy marinated chicken cubes',
            1099,
            'malai-boti',
            'BBQ'
          ),
        ],
      },
    ]),
  },
  {
    id: 'r5',
    name: 'Green Bowl Co.',
    cuisine: 'Healthy · Salads',
    rating: 4.5,
    reviewCount: 640,
    deliveryTime: 25,
    deliveryFee: 79,
    minOrder: 350,
    imageUrl: img('green-bowl'),
    isOpen: true,
    isFeatured: false,
    tags: ['healthy', 'salads'],
    menu: menu([
      {
        id: 'm1',
        label: 'Bowls',
        items: [
          item(
            'r5-i1',
            'Protein Power Bowl',
            'Quinoa, grilled chicken, avocado, tahini',
            1199,
            'protein-bowl',
            'Bowls',
            { isPopular: true }
          ),
          item(
            'r5-i2',
            'Mediterranean Bowl',
            'Falafel, hummus, olives, feta',
            1099,
            'med-bowl',
            'Bowls',
            { isVeg: true }
          ),
          item(
            'r5-i3',
            'Acai Smoothie Bowl',
            'Acai blend, granola, berries',
            999,
            'acai-bowl',
            'Bowls',
            { isVeg: true, isPopular: true }
          ),
        ],
      },
      {
        id: 'm2',
        label: 'Salads',
        items: [
          item(
            'r5-i4',
            'Kale Caesar',
            'Kale, parmesan, lemon tahini dressing',
            899,
            'kale-caesar',
            'Salads',
            { isVeg: true }
          ),
          item(
            'r5-i5',
            'Grilled Salmon Salad',
            'Mixed greens, salmon, citrus vinaigrette',
            1499,
            'salmon-salad',
            'Salads'
          ),
        ],
      },
      {
        id: 'm3',
        label: 'Cold Press',
        items: [
          item(
            'r5-i6',
            'Green Detox Juice',
            'Spinach, cucumber, apple, ginger',
            549,
            'detox-juice',
            'Cold Press',
            { isVeg: true }
          ),
          item(
            'r5-i7',
            'Berry Antioxidant',
            'Mixed berries, coconut water',
            599,
            'berry-juice',
            'Cold Press',
            { isVeg: true }
          ),
        ],
      },
    ]),
  },
  {
    id: 'r6',
    name: 'Sugar & Crumb',
    cuisine: 'Desserts · Bakery',
    rating: 4.8,
    reviewCount: 890,
    deliveryTime: 30,
    deliveryFee: 99,
    minOrder: 300,
    imageUrl: img('sugar-crumb'),
    isOpen: true,
    isFeatured: false,
    tags: ['desserts', 'bakery'],
    menu: menu([
      {
        id: 'm1',
        label: 'Cakes',
        items: [
          item(
            'r6-i1',
            'Belgian Chocolate Cake',
            'Rich ganache, chocolate sponge',
            899,
            'choc-cake',
            'Cakes',
            { isPopular: true, isVeg: true }
          ),
          item(
            'r6-i2',
            'Red Velvet Slice',
            'Cream cheese frosting, cocoa layers',
            749,
            'red-velvet',
            'Cakes',
            { isVeg: true }
          ),
          item(
            'r6-i3',
            'New York Cheesecake',
            'Classic baked cheesecake, berry compote',
            999,
            'cheesecake',
            'Cakes',
            { isPopular: true, isVeg: true }
          ),
        ],
      },
      {
        id: 'm2',
        label: 'Pastries',
        items: [
          item(
            'r6-i4',
            'Almond Croissant',
            'Flaky layers, almond cream filling',
            649,
            'almond-croissant',
            'Pastries',
            { isVeg: true }
          ),
          item(
            'r6-i5',
            'Lotus Biscoff Donut',
            'Glazed donut, biscoff crumble',
            549,
            'biscoff-donut',
            'Pastries',
            { isVeg: true }
          ),
        ],
      },
      {
        id: 'm3',
        label: 'Ice Cream',
        items: [
          item(
            'r6-i6',
            'Salted Caramel Sundae',
            'Vanilla scoop, caramel, praline',
            799,
            'caramel-sundae',
            'Ice Cream',
            { isVeg: true }
          ),
          item(
            'r6-i7',
            'Mango Sorbet Tub',
            'Fresh mango sorbet, 500ml',
            699,
            'mango-sorbet',
            'Ice Cream',
            { isVeg: true }
          ),
        ],
      },
    ]),
  },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.id === id);
}

export function getMenuItemById(
  restaurantId: string,
  menuItemId: string
): { restaurant: Restaurant; menuItem: MenuItem } | undefined {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return undefined;
  for (const category of restaurant.menu) {
    const menuItem = category.items.find((i) => i.id === menuItemId);
    if (menuItem) return { restaurant, menuItem };
  }
  return undefined;
}
