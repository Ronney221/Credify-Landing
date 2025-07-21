# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build & Development
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run generate-icons` - Generate icons using custom script

## Architecture Overview

### Project Structure
This is a React web application built with Vite and TypeScript, serving as a landing page for the Credify mobile app. The project follows modern web development patterns with a focus on performance and user experience.

**Frontend Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Tailwind CSS for styling with shadcn/ui components
- Framer Motion for animations
- React Router DOM for navigation
- React Hook Form with Zod for form validation

**Backend Integration:**
- Supabase client for database operations (waitlist, feedback forms)
- Vercel Analytics for tracking
- Environment variables for configuration

**Key Features:**
- Landing page showcasing Credify mobile app features
- Waitlist signup functionality with Supabase backend
- Feedback form submission system
- Interactive UI components with animations
- Responsive design optimized for conversion

### Directory Structure
- `src/` - Main application source code
  - `components/` - Reusable React components
    - `sections/` - Page sections (Hero, FAQ, Features, etc.)
    - `layout/` - Layout components (Header, Footer, RootLayout)
    - `forms/` - Form components (WaitlistForm, FeedbackForm)
    - `ui/` - shadcn/ui components and custom UI elements
  - `pages/` - Individual page components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions and configurations
  - `TextAnimations/` - Animation components
- `public/` - Static assets (images, icons, manifest)
  - `assets/` - Images and SVGs organized by type
- `supabase/` - Database functions and migrations
- `sql/` - Database schema files

### Key Technical Patterns
- Uses functional React components with hooks
- Implements custom hooks for analytics and scroll behavior
- Singleton pattern for Supabase client initialization
- Component-based architecture with clear separation of concerns
- CSS custom properties with Tailwind CSS variables
- Optimized build configuration with manual chunks for performance

### UI/UX Framework
- Built on shadcn/ui component library with "new-york" style
- Tailwind CSS with custom color palette and typography scale
- Radix UI primitives for accessible components
- Framer Motion for smooth animations and transitions
- Responsive design with mobile-first approach

## Important Development Notes

### Code Style Guidelines
- Use functional components and hooks over class components
- Prefer TypeScript interfaces and proper type definitions
- Follow React best practices with proper dependency arrays
- Use Tailwind CSS classes for styling
- Implement proper error boundaries and loading states

### Environment Configuration
- Uses Vite environment variables (VITE_ prefix)
- Supabase configuration through environment variables
- Production builds optimized with code splitting

### Build Optimization
- Manual chunks configured for React vendor libraries
- Framer Motion separated into its own chunk
- Optimized dependencies inclusion for faster builds
- TypeScript compilation before build process