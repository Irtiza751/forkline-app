Here's your upgraded Cursor prompt:

---

````
You are a world-class React Native architect and senior UI engineer. Your job is to scaffold a production-quality, fully reusable component library and MVP app for **ForkLine** — a food ordering platform — using the absolute latest tooling and strict architectural patterns.

---

## 1. Tech Stack (Latest Versions)

```bash
npx create-expo-app@latest ForkLine --template blank-typescript
````

**Core dependencies:**

```json
{
  "expo": "~52.0.0",
  "react-native": "0.76.x",
  "nativewind": "^4.1.x",
  "tailwindcss": "^3.4.x",
  "react-navigation/native": "^7.x",
  "react-navigation/bottom-tabs": "^7.x",
  "react-navigation/native-stack": "^7.x",
  "expo-haptics": "~14.x",
  "expo-font": "~13.x",
  "@expo-google-fonts/inter": "latest",
  "@expo-google-fonts/poppins": "latest",
  "@expo/vector-icons": "^14.x",
  "react-native-safe-area-context": "^4.x",
  "react-native-screens": "^4.x",
  "react-native-reanimated": "~3.16.x",
  "react-native-gesture-handler": "~2.20.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

**NativeWind v4 setup** — follow the official v4 setup exactly:

* `babel.config.js`: add `"nativewind/babel"` plugin
* `metro.config.js`: wrap with `withNativeWind(config, { input: "./global.css" })`
* `global.css`: `@tailwind base; @tailwind components; @tailwind utilities;`
* `tailwind.config.js`: content paths include `./app/**/*.{ts,tsx}` and `./src/**/*.{ts,tsx}`
* `app/_layout.tsx` or `App.tsx`: import `"./global.css"` at the top

---

## 2. Project Structure

```
ForkLine/
├── app/                        # Expo Router OR React Navigation entry
├── src/
│   ├── components/
│   │   ├── ui/                 # Primitives (shadcn-style)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   ├── Input/
│   │   │   ├── Avatar/
│   │   │   ├── Skeleton/
│   │   │   ├── BottomSheet/
│   │   │   └── Typography/
│   │   ├── composite/          # Domain-aware compositions
│   │   │   ├── RestaurantCard/
│   │   │   ├── MenuItemCard/
│   │   │   ├── CartItem/
│   │   │   └── OrderProgressTracker/
│   │   └── layout/             # Layout primitives
│   │       ├── Screen/
│   │       ├── Section/
│   │       └── Divider/
│   ├── hooks/                  # Custom hooks
│   │   ├── useCart.ts
│   │   ├── useSearch.ts
│   │   ├── useDebounce.ts
│   │   ├── useHaptics.ts
│   │   └── useSkeletonAnimation.ts
│   ├── context/
│   │   └── CartContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── lib/
│   │   └── cn.ts               # clsx + twMerge utility
│   ├── screens/
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.tsx          # Container
│   │   │   ├── HomeScreenView.tsx      # Presentational
│   │   │   └── index.ts
│   │   ├── RestaurantScreen/
│   │   ├── CartScreen/
│   │   ├── SearchScreen/
│   │   ├── OrdersScreen/
│   │   └── ProfileScreen/
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   └── BottomTabNavigator.tsx
│   └── types/
│       ├── restaurant.types.ts
│       ├── order.types.ts
│       └── navigation.types.ts
```

---

## 3. The `cn` Utility (shadcn pattern)

**`src/lib/cn.ts`** — use this in every component:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 4. Design Tokens — Tailwind Config

Extend `tailwind.config.js` with a ForkLine design system:

```js
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: "#FF5A1F",
        dark:    "#E04010",
        light:   "#FFF0EB",
      },
      navy:    { DEFAULT: "#1A1A2E", light: "#2D2D44" },
      accent:  "#FFB830",
      surface: { DEFAULT: "#FFFFFF", alt: "#F8F9FA", input: "#F1F3F5" },
      muted:   { DEFAULT: "#6B7280", light: "#9CA3AF" },
      border:  "#E5E7EB",
    },
    borderRadius: {
      "4xl": "2rem",
    },
    fontFamily: {
      sans:     ["Inter_400Regular"],
      "sans-md":["Inter_500Medium"],
      "sans-bd":["Inter_700Bold"],
      heading:  ["Poppins_600SemiBold"],
      "heading-bd": ["Poppins_700Bold"],
    },
  }
}
```

---

## 5. Architectural Patterns — Apply to Every Component

### 5.1 Primitive UI Components (shadcn-style)

Each primitive in `src/components/ui/` must follow this exact pattern:

**`Button/Button.types.ts`**

```ts
export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive";
export type ButtonSize    = "sm" | "md" | "lg" | "icon";

export interface ButtonProps {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  disabled?:  boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children:   React.ReactNode;
  onPress?:   () => void;
}
```

**`Button/Button.tsx`** — variant map using `cn`:

```tsx
const variantStyles: Record<ButtonVariant, string> = {
  solid:       "bg-brand text-white active:bg-brand-dark",
  outline:     "border border-brand text-brand bg-transparent",
  ghost:       "bg-transparent text-brand",
  destructive: "bg-red-500 text-white active:bg-red-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm:   "h-8 px-3 text-sm rounded-lg",
  md:   "h-11 px-5 text-base rounded-xl",
  lg:   "h-14 px-6 text-lg rounded-2xl",
  icon: "h-10 w-10 rounded-full",
};

export const Button = React.forwardRef<View, ButtonProps>(
  ({ variant = "solid", size = "md", loading, disabled, leftIcon, rightIcon,
     fullWidth, className, children, onPress }, ref) => {

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.75}
        className={cn(
          "flex-row items-center justify-center",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          (disabled || loading) && "opacity-50",
          className
        )}
      >
        {loading
          ? <ActivityIndicator color={variant === "solid" ? "#fff" : "#FF5A1F"} />
          : <>
              {leftIcon}
              <Text className={cn("font-sans-bd", sizeStyles[size])}>{children}</Text>
              {rightIcon}
            </>
        }
      </TouchableOpacity>
    );
  }
);
```

Apply this same pattern to: `Badge`, `Card`, `Input`, `Avatar`, `Typography` (with `variant` prop: `h1|h2|h3|body|caption|label`).

---

### 5.2 Compound Component Pattern

Use for complex stateful components. Example: **`Card`**

```tsx
// Usage:
<Card>
  <Card.Image source={uri} />
  <Card.Body>
    <Card.Title>Burger Palace</Card.Title>
    <Card.Description>Fast food · Burgers</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Badge variant="success">Open</Badge>
  </Card.Footer>
</Card>

// Implementation (Card/Card.tsx):
const CardRoot = ({ className, children }: CardProps) => (
  <View className={cn("bg-surface rounded-2xl overflow-hidden shadow-md", className)}>
    {children}
  </View>
);

const CardImage  = ({ source, className }: ...) => ( <Image ... /> );
const CardBody   = ({ children, className }: ...) => ( <View className={cn("p-4", className)}>{children}</View> );
const CardTitle  = ({ children }: ...) => ( <Typography variant="h3">{children}</Typography> );
const CardDescription = ...;
const CardFooter = ({ children, className }: ...) => ( <View className={cn("px-4 pb-4", className)}>{children}</View> );

export const Card = Object.assign(CardRoot, {
  Image:       CardImage,
  Body:        CardBody,
  Title:       CardTitle,
  Description: CardDescription,
  Footer:      CardFooter,
});
```

Apply Compound Component pattern also to: **`BottomSheet`**, **`MenuItemCard`**, **`OrderProgressTracker`**.

---

### 5.3 Container / Presentational Pattern

Every screen is split into two files:

**Container** (`HomeScreen.tsx`) — owns data, state, handlers:

```tsx
export const HomeScreen = () => {
  const { restaurants, isLoading, refetch } = useRestaurants();
  const { categories, activeCategory, setActiveCategory } = useCategories();
  const { cartCount } = useCart();
  const navigation = useNavigation();

  const handleRestaurantPress = useCallback((id: string) => {
    navigation.navigate("Restaurant", { restaurantId: id });
  }, [navigation]);

  const handleCategoryPress = useCallback((id: string) => {
    setActiveCategory(id);
  }, []);

  return (
    <HomeScreenView
      restaurants={restaurants}
      isLoading={isLoading}
      categories={categories}
      activeCategory={activeCategory}
      cartCount={cartCount}
      onRefresh={refetch}
      onRestaurantPress={handleRestaurantPress}
      onCategoryPress={handleCategoryPress}
    />
  );
};
```

**Presentational** (`HomeScreenView.tsx`) — pure render, zero business logic, all props:

```tsx
interface HomeScreenViewProps {
  restaurants:      Restaurant[];
  isLoading:        boolean;
  categories:       Category[];
  activeCategory:   string;
  cartCount:        number;
  onRefresh:        () => void;
  onRestaurantPress:(id: string) => void;
  onCategoryPress:  (id: string) => void;
}

export const HomeScreenView = ({ ... }: HomeScreenViewProps) => {
  return (
    <Screen>
      <HomeHeader cartCount={cartCount} />
      <FlatList
        data={restaurants}
        ...
      />
    </Screen>
  );
};
```

Apply this pattern to **all 6 screens**.

---

### 5.4 Custom Hook Pattern

Every piece of reusable logic lives in `src/hooks/`:

**`useCart.ts`** — consumes `CartContext`, exposes clean API:

```ts
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");

  const addItem    = useCallback((item: CartItem) => { ... }, []);
  const removeItem = useCallback((id: string) => { ... }, []);
  const updateQty  = useCallback((id: string, qty: number) => { ... }, []);
  const clearCart  = useCallback(() => { ... }, []);
  const total      = useMemo(() => context.items.reduce((sum, i) => sum + i.price * i.quantity, 0), [context.items]);
  const itemCount  = useMemo(() => context.items.reduce((sum, i) => sum + i.quantity, 0), [context.items]);

  return { items: context.items, addItem, removeItem, updateQty, clearCart, total, itemCount };
};
```

**`useDebounce.ts`:**

```ts
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};
```

**`useHaptics.ts`:**

```ts
import * as Haptics from "expo-haptics";
export const useHaptics = () => ({
  light:   () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium:  () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error:   () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
});
```

**`useSkeletonAnimation.ts`:**

```ts
export const useSkeletonAnimation = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1,   duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return { opacity };
};
```

---

### 5.5 Render Props / HOC Pattern (where relevant)

Use `withSkeleton` HOC for any loading state:

```tsx
export const withSkeleton = <P extends object>(
  Component: React.ComponentType<P>,
  Skeleton: React.ComponentType
) => {
  return ({ isLoading, ...props }: P & { isLoading: boolean }) => {
    if (isLoading) return <Skeleton />;
    return <Component {...(props as P)} />;
  };
};

// Usage:
const RestaurantCardWithSkeleton = withSkeleton(RestaurantCard, RestaurantCardSkeleton);
```

---

## 6. Type System — Strict Typing

**`src/types/restaurant.types.ts`:**

```ts
export interface MenuItem {
  id:          string;
  name:        string;
  description: string;
  price:       number;
  imageUrl:    string;
  isPopular:   boolean;
  isVeg:       boolean;
  category:    string;
}

export interface MenuCategory {
  id:    string;
  label: string;
  items: MenuItem[];
}

export interface Restaurant {
  id:           string;
  name:         string;
  cuisine:      string;
  rating:       number;
  reviewCount:  number;
  deliveryTime: number;   // minutes
  deliveryFee:  number;   // PKR
  minOrder:     number;
  imageUrl:     string;
  isOpen:       boolean;
  isFeatured:   boolean;
  tags:         string[];
  menu:         MenuCategory[];
}

export interface CartItem {
  menuItemId:     string;
  restaurantId:   string;
  restaurantName: string;
  name:           string;
  price:          number;
  quantity:       number;
  imageUrl:       string;
}

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id:           string;
  restaurantId: string;
  restaurantName:string;
  items:        CartItem[];
  total:        number;
  status:       OrderStatus;
  placedAt:     string;
  estimatedTime:number;
}
```

---

## 7. Screen Specifications

### HomeScreen
- Sticky animated header: logo in `font-heading-bd text-brand text-2xl` + location pill + cart icon with animated badge
- Large hero `SearchBar` component (navigates to `SearchScreen` on tap — no inline search on home)
- Category pills horizontal scroll — active state: `bg-brand text-white`, inactive: `bg-surface-alt text-muted`
- "Featured" horizontal `FlatList` with `FeaturedRestaurantCard` (image, gradient overlay, name, rating)
- "All Restaurants" `FlatList` with `RestaurantCard` compound component
- Skeleton loading for 1.2s on mount using `withSkeleton` HOC
- `RefreshControl` with 1.5s simulated refetch

### RestaurantScreen
- Hero image 220px with `LinearGradient` overlay (bottom fade), back + favorite buttons floating
- Restaurant info: name, cuisine, rating stars, delivery pills
- Sticky category tab bar with `ScrollView` — highlights active section
- `MenuItemCard` compound component: image thumbnail (right), name, 2-line description, veg indicator dot, price in PKR, `+` Add button → inline quantity stepper
- Floating "View Cart" bar at bottom (animated slide-up when cart is non-empty)

### CartScreen
- `CartItem` list with swipe-to-delete (`react-native-gesture-handler` `Swipeable`)
- Quantity stepper per item (− / qty / +)
- Order summary: subtotal, delivery fee, 5% GST, **Total** in PKR
- `Button` variant `solid` fullWidth: "Place Order"
- On tap: `useHaptics().success()` → success `BottomSheet` with order ID + ETA → clear cart → navigate to Orders

### SearchScreen
- Auto-focus input on mount
- `useDebounce` hook (300ms) on search query
- Recent searches chips (persisted in state)
- Popular Searches pills when input empty
- Category filter pills row
- Filtered restaurant results list

### OrdersScreen
- Two-tab toggle (Active / Past) — custom tab using `Button` compound
- Active: `OrderProgressTracker` compound component with 4 steps, pulsing animated dot on current step using `Animated.loop`
- Past: order history list with "Reorder" button

### ProfileScreen
- Avatar with initials, name, email (hardcoded mock)
- Settings rows as a typed list: `{ icon, label, onPress }[]`
- Logout row: `Button` variant `destructive`

---

## 8. Navigation Types

```ts
export type RootStackParamList = {
  BottomTabs: undefined;
  Restaurant: { restaurantId: string };
};

export type BottomTabParamList = {
  Home:    undefined;
  Search:  undefined;
  Cart:    undefined;
  Orders:  undefined;
  Profile: undefined;
};
```

Custom bottom tab bar component: raised center Cart tab circle in `bg-brand`, white icon, badge. All other tabs: icon + label, active in `text-brand`, inactive in `text-muted`.

---

## 9. Mock Data

6 restaurants with full menus. All prices in PKR (500–2500 range). Image URLs via `https://picsum.photos/seed/{uniqueSeed}/400/250`. Categories: Pizza, Burgers, Sushi, Desi, Healthy, Desserts. Each restaurant has 3 menu categories, each with 3–4 items.

---

## 10. Code Quality Rules

- **Zero `any` types** — strict TypeScript throughout
- **No inline styles** — all styling via NativeWind `className` + `cn()` utility
- **Every component exports from `index.ts`** — barrel exports only
- **No business logic in presentational components** — only props and render
- **`React.memo`** wrapping on all list-item components (`RestaurantCard`, `MenuItemCard`, `CartItem`)
- **`useCallback`** on all handler functions passed as props
- **`useMemo`** on derived values (cart total, filtered lists)
- `keyExtractor` must always use a stable unique `id` field
- Every component file ends with `export default` and a named export
- All currency formatted as: `PKR ${amount.toLocaleString("en-PK")}`

---

## 11. Deliverables

1. All files in `src/` fully implemented — **zero `// TODO` comments**
2. `App.tsx` wired to `RootNavigator` with `CartProvider` wrapping
3. `global.css`, `tailwind.config.js`, `babel.config.js`, `metro.config.js` all correctly configured for NativeWind v4
4. `package.json` with exact dependency versions
5. `README.md` with: project overview, architecture decisions (patterns used + why), folder structure, setup instructions

The app must run with `npx expo start` with zero errors and zero TypeScript errors (`npx tsc --noEmit`).

```

---

Here's what makes this prompt significantly stronger than the previous one:

**Patterns are shown with real code, not just named.** Cursor needs to see the exact shape of a `forwardRef` Button, a Compound Card, a Container/Presentational split — otherwise it defaults to whatever pattern it feels like. Showing the skeleton forces consistent output across all components.

**The `cn()` utility is the architectural glue.** By defining it once and telling Cursor to use it in every single component, all className merging stays consistent — exactly how shadcn works in web.

**Type system is defined upfront.** Cursor generates far fewer type errors when the interfaces are declared in the prompt itself, because it doesn't have to infer or guess shapes mid-generation.

**Patterns are separated by responsibility.** Hooks own logic, containers own state + handlers, presentational components own render — and the prompt makes this boundary explicit so Cursor doesn't blur them.
````