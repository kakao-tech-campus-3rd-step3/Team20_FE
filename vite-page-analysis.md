# Vite Page Structure and Routing Analysis

## Overview
This document analyzes the Vite page structure and TanStack Router patterns to map them to NextJS App Router equivalents.

## Current Vite Page Structure

### Root Structure
- `src/pages/__root.tsx` - Root route with GlobalLayout and context
- `src/routeTree.gen.ts` - Generated route tree configuration

### Static Pages
1. `src/pages/index.tsx` → `/` (Home page)
2. `src/pages/contact.tsx` → `/contact`
3. `src/pages/map.tsx` → `/map`
4. `src/pages/mypage.tsx` → `/mypage` (protected)
5. `src/pages/privacy.tsx` → `/privacy`
6. `src/pages/terms.tsx` → `/terms`
7. `src/pages/not-found.tsx` → `/not-found`

### Dynamic Routes
1. `src/pages/content.$id.tsx` → `/content/[id]`
2. `src/pages/location.$id.tsx` → `/location/[id]`
3. `src/pages/content.$contentId.map.tsx` → `/content/[contentId]/map`

### Auth Routes (Nested)
1. `src/pages/auth/login.tsx` → `/auth/login`
2. `src/pages/auth/signup.tsx` → `/auth/signup`
3. `src/pages/auth/forgot-password.tsx` → `/auth/forgot-password`
4. `src/pages/auth/reset-password.tsx` → `/auth/reset-password`
5. `src/pages/auth/reset-password-success.tsx` → `/auth/reset-password-success`
6. `src/pages/auth/signup-success.tsx` → `/auth/signup-success`
7. `src/pages/auth/verified-email.tsx` → `/auth/verified-email`

### Verified Email Routes (Redirect Routes)
1. `src/pages/verified-email/reset-password.tsx` → `/verified-email/reset-password`
2. `src/pages/verified-email/verify-email.tsx` → `/verified-email/verify-email`

## TanStack Router Patterns Identified

### 1. Route Definition Pattern
```typescript
export const Route = createFileRoute('/path')({
  component: ComponentName,
  // Optional configurations
});
```

### 2. Dynamic Route Parameters
- `$id` syntax for dynamic segments (e.g., `content.$id.tsx`)
- `$contentId` for specific parameter names
- Accessed via `Route.useParams()`

### 3. Route Guards and Redirects
```typescript
beforeLoad: async ({ context }) => {
  if (condition) {
    throw redirect({ to: '/target' });
  }
}
```

### 4. Data Loading
```typescript
loader: async ({ params }) => {
  const data = await fetchData(params.id);
  return data;
}
```

### 5. Search Parameters
```typescript
validateSearch: (search: Record<string, unknown>) => {
  return { token: search.token as string };
}
```

### 6. Error Handling
```typescript
errorComponent: () => <Navigate to="/not-found" />
```

## NextJS App Router Mapping

### Current NextJS Structure
```
nextjs/src/app/
├── layout.tsx (Root layout)
├── page.tsx (Home page)
├── (auth)/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
├── content/
│   └── [id]/
│       ├── page.tsx
│       └── map/page.tsx (missing)
├── location/
│   └── [id]/page.tsx
├── map/page.tsx
└── mypage/page.tsx
```

### Missing Pages in NextJS
1. `/contact` - Contact page
2. `/privacy` - Privacy policy page
3. `/terms` - Terms of service page
4. `/not-found` - Custom 404 page
5. `/auth/reset-password` - Password reset page
6. `/auth/reset-password-success` - Reset success page
7. `/auth/signup-success` - Signup success page
8. `/auth/verified-email` - Email verification page
9. `/verified-email/reset-password` - Redirect route
10. `/verified-email/verify-email` - Redirect route

### Route Conversion Requirements

#### 1. Static Pages
- Convert `createFileRoute()` to NextJS page components
- Add metadata exports for SEO
- Remove TanStack Router specific code

#### 2. Dynamic Routes
- Convert `$id` syntax to `[id]` folder structure
- Replace `Route.useParams()` with NextJS `params` prop
- Convert loaders to server components or API calls

#### 3. Protected Routes
- Convert `beforeLoad` guards to middleware or client-side checks
- Implement authentication context in NextJS

#### 4. Redirect Routes
- Convert redirect logic to NextJS redirects or middleware
- Handle search parameters with NextJS searchParams

#### 5. Error Handling
- Convert error components to NextJS error.tsx files
- Implement not-found.tsx for 404 handling

## Implementation Strategy

### Phase 1: Missing Static Pages
1. Create `/contact/page.tsx`
2. Create `/privacy/page.tsx`
3. Create `/terms/page.tsx`
4. Create `not-found.tsx` at app root

### Phase 2: Missing Auth Pages
1. Create `/auth/reset-password/page.tsx`
2. Create `/auth/reset-password-success/page.tsx`
3. Create `/auth/signup-success/page.tsx`
4. Create `/auth/verified-email/page.tsx`

### Phase 3: Redirect Routes
1. Create `/verified-email/reset-password/page.tsx`
2. Create `/verified-email/verify-email/page.tsx`

### Phase 4: Enhanced Dynamic Routes
1. Update existing dynamic routes with Vite improvements
2. Add missing nested routes (e.g., content map pages)

### Phase 5: Route Guards and Middleware
1. Implement authentication middleware
2. Convert route guards to NextJS patterns
3. Handle redirects and protected routes

## Key Differences to Address

### 1. Router Context
- Vite: Uses router context for auth state
- NextJS: Need to implement auth context/middleware

### 2. Navigation
- Vite: Uses TanStack Router navigation
- NextJS: Uses Next.js Link and useRouter

### 3. Data Loading
- Vite: Client-side loaders
- NextJS: Server components and API routes

### 4. Error Boundaries
- Vite: Route-level error components
- NextJS: error.tsx and not-found.tsx files

### 5. Search Parameters
- Vite: validateSearch function
- NextJS: searchParams prop in page components