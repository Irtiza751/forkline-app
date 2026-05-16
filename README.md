# ForkLine

ForkLine is a food ordering mobile app built with **Expo SDK 55** and **React Native**. Customers can browse restaurants, search menus, manage a cart, place orders (cash on delivery), and track order status.

## Tech stack

- Expo ~55, React Native 0.83, React 19
- React Navigation 7 (native stack + bottom tabs)
- NativeWind v4 + Tailwind CSS 3
- Expo Google Fonts (Inter)
- Expo Haptics, Linear Gradient, Image

## Architecture

| Pattern | Where | Why |
|--------|--------|-----|
| **Brand** | `src/components/brand/Logo` | SVG logo from `assets/svgs/logo.svg` |
| **Primitive UI (shadcn-style)** | `src/components/ui/*` | Reusable `Button`, `Card`, `Input`, etc. with `cn()` and variant maps |
| **Compound components** | `Card`, `BottomSheet`, `MenuItemCard`, `OrderProgressTracker` | Flexible composition for domain UI |
| **Container / Presentational** | `src/screens/*/*Screen.tsx` + `*View.tsx` | Logic and navigation in containers; pure render in views |
| **Context + hooks** | `CartContext`, `OrdersContext`, `useCart`, `useSearch` | Shared cart/order state with a clean hook API |
| **HOC** | `withSkeleton` | Consistent loading placeholders for lists |

## Project structure

```
App.tsx                 # Entry: fonts, providers, RootNavigator
global.css              # Tailwind directives (NativeWind)
src/
  components/ui/        # Design system primitives
  components/composite/ # RestaurantCard, MenuItemCard, etc.
  components/layout/    # Screen, Section, Divider
  context/              # Cart & orders state
  data/mockData.ts      # 6 restaurants, full menus (PKR)
  hooks/
  lib/                  # cn, format, withSkeleton
  navigation/           # Root stack + custom tab bar
  screens/              # 6 feature screens (container + view)
  types/
```

## Features (MVP)

- **Home** — categories, featured carousel, restaurant list, pull-to-refresh
- **Search** — debounced query, popular/recent terms, category filters
- **Restaurant** — menu by category, add to cart, floating cart bar
- **Cart** — swipe to delete, quantity steppers, GST summary, place order sheet
- **Orders** — active/past tabs, progress tracker, reorder
- **Profile** — mock user, settings rows, logout

## Setup

```bash
npm install
npx expo start
```

`postinstall` applies `patches/react-native-css-interop+0.2.4.patch`, which fixes a Metro 0.83 crash on hot reload (NativeWind + Expo SDK 55).

Typecheck:

```bash
npm run typecheck
```

## Configuration

- **NativeWind**: `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css`
- **Path alias**: `@/*` → `src/*` in `tsconfig.json`

## Notes

- Brand colors: primary `oklch(0.508 0.118 165.612)` / `#007A55`, background mist `oklch(0.963 0.002 197.1)` / `#F1F3F3`.
- All prices use **PKR** formatting (`en-PK` locale).
- Data is **mock-only**; no backend required for this MVP.
- Payments, GPS tracking, reviews, and promos are out of scope.
