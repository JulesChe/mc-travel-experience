# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MC Travel Experience is an Angular 19 application for a luxury travel agency specializing in high-end Alpine ski experiences. The site features a dual-season concept (winter/summer) with dynamic content switching and comprehensive internationalization (French/English).

## Development Commands

### Basic Commands
- `npm start` - Start development server on http://localhost:4200
- `npm run build` - Production build
- `npm test` - Run unit tests with Karma
- `npm run watch` - Development build with file watching

### Internationalization Commands
- `npm run start:fr` - Start development server with French locale
- `npm run start:en` - Start development server with English locale
- `npm run build:fr` - Build French version
- `npm run build:en` - Build English version
- `npm run build:i18n` - Build both language versions
- `npm run extract-i18n` - Extract translatable content
- `npm run serve:prod` - Build and serve production version locally

## Architecture

### Core Concepts

1. **Dual Season System**: The application dynamically switches between winter and summer content using the `SeasonService`. This affects hero sections, destinations, accommodations, and activities.

2. **Internationalization**: Built-in Angular i18n with French as source locale and English translations. Comprehensive translation interface in `LanguageService`.

3. **Component-based Architecture**: Modular components for each section (hero, destinations, accommodations, services, contact, etc.).

### Key Services

#### SeasonService (`src/app/services/season.service.ts`)
- Manages winter/summer content switching
- Persists season preference in localStorage
- Provides season-specific content for hero sections, destinations, accommodations, and activities
- Uses BehaviorSubject for reactive season changes

#### LanguageService (`src/app/services/language.service.ts`)
- Centralized translation management
- Comprehensive translation interface covering all UI text
- BehaviorSubject-based reactive language switching
- Extensive translations for both seasons and all page content

### Component Structure

#### Pages
- `home-page` - Main landing page with season-aware content
- Pages are located in `src/app/pages/`

#### Reusable Components
- `header` - Navigation with season toggle and language switcher
- `hero-section` - Video background hero with season-specific content
- `excellence-section`, `destinations-section`, `services-section`, `accommodations-section` - Content sections
- `contact-section` - Contact form and information
- `footer` - Site footer with links and contact info

### Styling Architecture

#### CSS Organization
- `src/styles.scss` - Global styles with comprehensive design system
- Tailwind CSS integration for utility classes
- SCSS for component-specific styles
- CSS custom properties for consistent theming

#### Design System Features
- Unified color palette with CSS custom properties
- Consistent typography system
- Comprehensive animation classes
- Responsive design utilities
- Accessibility considerations (reduced motion support)

#### Season-Specific Styling
- `.season-toggle` with `.winter-active` and `.summer-active` classes
- Dynamic styling based on current season
- Consistent brand colors: winter (blue), summer (yellow/gold)

## Build Configuration

### Angular Configuration
- Uses Angular 19 with standalone components
- SCSS preprocessing enabled
- i18n configured with French source locale
- Production builds with optimization and tree-shaking
- Bundle size limits: 500kB warning, 1MB error

### Build Targets
- `development` - Dev build with source maps
- `production` - Optimized production build
- `fr`/`en` - Language-specific development builds  
- `production-fr`/`production-en` - Language-specific production builds

## Key Features

### Season Toggle System
- Header component contains season toggle button
- Visual feedback with distinct styling for each season
- Smooth transitions between winter and summer content
- State persistence across browser sessions

### Responsive Design
- Mobile-first approach
- Comprehensive breakpoint system
- Touch-friendly interactions
- Optimized for both desktop and mobile experiences

### Performance Considerations
- Lazy loading where applicable
- Optimized images and assets
- Bundle splitting for production
- Service worker ready (can be enabled)

## Important Implementation Details

### Season Content Structure
When working with seasonal content, use the interfaces defined in `season.service.ts`:
- `SeasonContent` for overall content structure
- `SummerDestination`, `SummerAccommodation`, `SummerActivity` for summer-specific content
- Winter content uses existing component structure

### Translation Management
All user-facing text should be managed through the `LanguageService`. The `Translations` interface provides type safety for all translatable content. Both French and English versions must be maintained.

### Component Communication
- Services use BehaviorSubject for reactive data flow
- Components subscribe to service observables for real-time updates
- Parent-child communication via @Input/@Output where appropriate

### Asset Management
- Images stored in `public/assets/images/`
- Videos served from external CDN (R2 Cloudflare)
- Proper lazy loading and optimization for media assets

## Development Guidelines

### Linting and Type Checking
The project uses standard Angular linting. Run `ng lint` for code quality checks and ensure TypeScript strict mode compliance.

### Component Creation
Use `ng generate component component-name` with the `--style=scss` flag (configured as default). All components use standalone architecture.

### Testing
- Unit tests with Jasmine and Karma
- Component tests should cover season switching and language changes
- Service tests should verify state management and data flow