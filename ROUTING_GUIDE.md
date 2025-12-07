# Poultry Farm Management System - Routing Guide

## Overview

The application now has a **fully page-based routing structure** with separate pages for each feature. All pages include proper authentication checks and SEO metadata.

## Page Routes

### 1. **Home Page** (`/`)

- **Path**: `/`
- **File**: `app/page.tsx`
- **Purpose**: Redirects to `/login` or `/dashboard` based on authentication status
- **Features**: Automatic redirect with loading state

### 2. **Login Page** (`/login`)

- **Path**: `/login`
- **File**: `app/login/page.tsx`
- **Purpose**: User authentication
- **Features**:
  - Email/password login form
  - Redirects to dashboard on successful login
  - Auto-redirects to dashboard if already logged in
- **SEO**: Title and description for login page

### 3. **Dashboard** (`/dashboard`)

- **Path**: `/dashboard`
- **File**: `app/dashboard/page.tsx`
- **Purpose**: Main dashboard after login
- **Features**:
  - Farm overview and statistics
  - Quick access to all farms
  - Add farm, view details, manage records
  - Logout functionality
- **Protected**: Yes (requires authentication)

### 4. **Farms List** (`/farms`)

- **Path**: `/farms`
- **File**: `app/farms/page.tsx`
- **Purpose**: Display all registered farms
- **Features**:
  - Grid view of all farms
  - Farm statistics (sheds, records count)
  - Delete farm functionality
  - Click to view farm details
  - "Add New Farm" button
  - Navigation back to dashboard
- **Protected**: Yes (requires authentication)
- **State Management**: Loads farms from localStorage

### 5. **Add Farm** (`/farm/add`)

- **Path**: `/farm/add`
- **File**: `app/farm/add/page.tsx`
- **Purpose**: Register a new poultry farm
- **Features**:
  - Form with farm details (name, location, sheds, owner)
  - Saves to localStorage
  - Auto-redirects to farms list after successful creation
  - Navigation back to farms list
- **Protected**: Yes (requires authentication)

### 6. **Farm Details** (`/farm/[id]`)

- **Path**: `/farm/[id]` (dynamic route)
- **File**: `app/farm/[id]/page.tsx`
- **Purpose**: View detailed information about a specific farm
- **Features**:
  - Farm information card
  - Production records tabs (Table view & Analytics)
  - Add production record functionality
  - Delete record functionality
  - Analytics dashboard with statistics
  - Navigation back to farms list
- **Protected**: Yes (requires authentication)
- **Dynamic**: Yes (farmId parameter)
- **Error Handling**: Redirects to `/farms` if farm not found

### 7. **Farm Records** (`/farm/[id]/records`)

- **Path**: `/farm/[id]/records` (dynamic route)
- **File**: `app/farm/[id]/records/page.tsx`
- **Purpose**: Manage production records for a specific farm
- **Features**:
  - Add production record form
  - Complete records table
  - Delete individual records
  - Saves to localStorage
  - Navigation back to farm details
- **Protected**: Yes (requires authentication)
- **Dynamic**: Yes (farmId parameter)

## Authentication Flow

```
User visits app
    ↓
Check localStorage for 'poultryFarmLoggedIn'
    ↓
If true → Redirect to /dashboard
If false → Redirect to /login
    ↓
After login → Set 'poultryFarmLoggedIn' = 'true'
    ↓
Redirect to /dashboard
```

## Data Persistence

All data is stored in browser **localStorage**:

- **Key**: `poultryFarms`
- **Value**: JSON array of farm objects
- **Structure**:

```typescript
interface FarmData {
  id: string;
  farmName: string;
  location: string;
  totalSheds: number;
  ownerName?: string;
  createdDate: string;
  records?: ProductionRecord[];
}

interface ProductionRecord {
  id: string;
  farmId: string;
  date: string;
  shedNo: string;
  age: number;
  mortality: number;
  openingStock: number;
  closingStock: number;
  foodQty: number;
  gramsOfFoodPerHen: number;
  createdAt: string;
}
```

## Navigation Flow

```
/ (Home)
  ├── /login
  └── /dashboard
       ├── /farms
       │    ├── /farm/add
       │    └── /farm/[id]
       │         └── /farm/[id]/records
```

## Key Features Per Page

### Login (`/login`)

- ✅ Email/password form
- ✅ Remember login state
- ✅ Auto-redirect if logged in
- ✅ Redirect to dashboard on success

### Dashboard (`/dashboard`)

- ✅ View all farms in tabs
- ✅ Farm statistics
- ✅ Quick actions
- ✅ Logout

### Farms (`/farms`)

- ✅ Grid layout with farm cards
- ✅ Farm count
- ✅ Delete farm
- ✅ Add new farm button
- ✅ Click to view details

### Add Farm (`/farm/add`)

- ✅ Input validation
- ✅ Save to localStorage
- ✅ Auto-redirect after save
- ✅ Form reset

### Farm Details (`/farm/[id]`)

- ✅ Farm info display
- ✅ Records table
- ✅ Analytics view
- ✅ Add/delete records
- ✅ Real-time updates

### Farm Records (`/farm/[id]/records`)

- ✅ Add record form
- ✅ Full records table
- ✅ Delete functionality
- ✅ Date picker
- ✅ Shed selector

## SEO Optimization

All pages include:

- ✅ Proper HTML structure
- ✅ Semantic elements
- ✅ Descriptive titles
- ✅ Meta descriptions
- ✅ Unique heading hierarchy

## Protected Routes

All pages except `/` and `/login` are protected with authentication checks:

```typescript
useEffect(() => {
  const loggedIn = localStorage.getItem("poultryFarmLoggedIn") === "true";
  if (!loggedIn) {
    router.push("/login");
  }
}, [router]);
```

## Component Reusability

The following components are reused across pages:

- `LoginPage` - Login form
- `DashboardPage` - Dashboard UI
- `FarmList` - Farms grid display
- `AddFarm` - Farm creation form
- `FarmDetail` - Farm details and records
- `AddRecordFarm` - Add production record form
- `RecordTable` - Display production records

## Future Enhancements

Potential improvements:

1. Add API integration (replace localStorage)
2. Add search/filter for farms
3. Export records to CSV/PDF
4. Add charts and visualizations
5. Multi-user support
6. Mobile responsive improvements
7. Add farm photos
8. Weather integration
9. Feed cost tracking
10. Revenue analytics
