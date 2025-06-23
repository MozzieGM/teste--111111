# Simulador de Gastos - Santa Cruz de la Sierra

## Overview

This is a focused expense calculator for Brazilians planning to live in Santa Cruz de la Sierra, Bolivia. The application allows users to input their expected monthly expenses across 6 main categories and calculate costs for different time periods (monthly, annual, or 6-year course duration) with accurate currency conversions between Bolivian Bolivianos (BOB), Brazilian Reais (BRL), and US Dollars (USD).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Bolivia-themed color scheme
- **State Management**: React useState/useEffect with custom hooks
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Charts**: Recharts for data visualization
- **Persistence**: Local Storage for saving user simulations

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Development**: Hot reload with tsx and Vite middleware integration

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── dist/           # Build output directory
```

## Key Components

### Frontend Components
1. **CitySelector**: Interactive city selection with cost level indicators
2. **ExpenseCalculator**: Multi-currency expense input forms with real-time validation
3. **ResultsPanel**: Comprehensive results display with charts and recommendations
4. **CityComparison**: Side-by-side cost comparison between Bolivian cities

### Data Management
- **bolivia-data.ts**: Static data for cities, expense categories, and exchange rates
- **currency-utils.ts**: Currency conversion utilities supporting BOB, BRL, and USD
- **use-local-storage.ts**: Custom hook for persistent user data

### User Experience Features
- Multi-currency support with real-time conversions
- Progressive expense calculation with visual feedback
- PDF export functionality for simulation results
- WhatsApp sharing integration
- Responsive design optimized for mobile and desktop
- Brazilian Portuguese localization

## Data Flow

1. **User Input**: Users select a city and input expenses in their preferred currency
2. **Real-time Calculation**: Expenses are converted and adjusted based on city cost multipliers
3. **Visualization**: Results are displayed in interactive charts and comparison tables
4. **Persistence**: Simulations can be saved locally and reloaded
5. **Export**: Users can generate PDF reports or share via WhatsApp

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library
- **Styling**: Tailwind CSS with PostCSS processing
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Utilities**: date-fns, clsx, class-variance-authority

### Backend Dependencies
- **Database**: Drizzle ORM with Neon Database adapter
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Session**: connect-pg-simple for PostgreSQL session management

### Development Tools
- **TypeScript**: Strict type checking across the entire stack
- **ESLint/Prettier**: Code formatting and linting (implied)
- **Vite Plugins**: Runtime error overlay and development cartographer

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Hot Reload**: Vite dev server with Express middleware integration
- **Port Configuration**: Application runs on port 5000

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `npm run db:push`

### Deployment Target
- **Platform**: Replit with autoscale deployment
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Environment**: Requires `DATABASE_URL` environment variable

### Database Schema
Currently includes a basic user authentication schema with:
- Users table with username/password fields
- Drizzle ORM integration with PostgreSQL
- Schema validation using Zod

## Key Features

### Core Functionality
- **Focused Location**: Exclusively Santa Cruz de la Sierra calculations
- **Accurate Exchange Rates**: BRL to BOB at 2.5-3.0 range (corrected from previous 1.35)
- **Multiple Time Periods**: Monthly, Annual, and 6-year course duration options
- **6 Essential Categories**: Housing, Food, Transport, Education, Health, Personal expenses
- **Real-time Calculations**: Instant updates with progress bars and charts
- **Local Storage**: Save and reload simulations
- **Export Features**: WhatsApp sharing with formatted messages

### Technical Improvements
- **Simplified UI**: Single city focus with streamlined interface
- **Period-based Calculations**: Dynamic totals based on selected timeframe
- **Currency Range Display**: Shows BRL range (min/max) for accurate budgeting
- **Responsive Design**: Optimized for mobile and desktop use

## Changelog
- December 22, 2024: Focused redesign for Santa Cruz de la Sierra
- December 22, 2024: Corrected BRL-BOB exchange rate to 2.5-3.0
- December 22, 2024: Added period options (monthly, annual, 6-year)
- December 22, 2024: Simplified to 6 essential expense categories
- December 22, 2024: Updated branding to "Simulador de Gastos"
- June 22, 2025: Initial setup
- June 22, 2025: Updated documentation with 2025 references
- June 22, 2025: Removed all visual assets per user request - clean interface

## User Preferences

Preferred communication style: Simple, everyday language.
Focus on Santa Cruz de la Sierra only.
Accurate financial data with proper exchange rates.