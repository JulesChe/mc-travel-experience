# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MC Travel Experiences is a luxury travel website built with Angular 19 that specializes in high-end mountain and ski experiences in the French Alps. The site features bilingual support (French/English) and focuses on luxury accommodations, concierge services, and exclusive destinations.

## Development Commands

### Development Server

- `npm start` - Start development server (defaults to French locale)
- `npm run start:fr` - Start development server in French
- `npm run start:en` - Start development server in English
- `npm run watch` - Build with file watching in development mode

### Building

- `npm run build` - Standard build (production)
- `npm run build:fr` - Build French version
- `npm run build:en` - Build English version
- `npm run build:prod-fr` - Production build for French
- `npm run build:prod-en` - Production build for English
- `npm run build:i18n` - Build both language versions for production

### Testing

- `npm test` - Run unit tests with Karma
- No e2e test framework configured

### Internationalization

- `npm run extract-i18n` - Extract translatable text
- `npm run serve:prod` - Serve production build locally

## Architecture & Structure

### Routing Architecture

The application uses lazy-loaded routes with the following structure:

- **Home** (`/`) - Homepage with all sections
- **Destinations** (`/destinations`) - Dedicated destinations page
- **Conciergerie** (`/conciergerie`) - Concierge services page
- **Hébergements** (`/hebergements`) - Accommodations page

All route components are lazy-loaded using Angular's `loadComponent()` for optimal performance.

### Component Architecture

**Layout Components:**

- `HeaderComponent` - Main navigation with language switcher
- `FooterComponent` - Site footer with contact info and links

**Content Components:**

- `HeroSectionComponent` - Homepage hero with video/image
- `ExcellenceSectionComponent` - Company excellence presentation
- `DestinationsSectionComponent` - Featured destinations grid
- `ServicesSectionComponent` - Services overview with cards
- `AccommodationsSectionComponent` - Accommodations showcase
- `ContactSectionComponent` - Contact form and information
- `ServiceCardComponent` - Reusable service card component

**Pages:**

- `HomeComponent` - Homepage aggregating all sections
- `DestinationsComponent` - Full destinations listing
- `ConciergerieComponent` - Concierge services details
- `HebergementsComponent` - Accommodations details

### Internationalization System

The application implements a custom bilingual system using a centralized `LanguageService`:

- **Default locale:** French (`fr`)
- **Supported locales:** French (`fr`), English (`en`)
- **Translation storage:** In-memory translations in `LanguageService`
- **Language switching:** Reactive service with `BehaviorSubject`
- **Angular i18n configuration:** Set up for potential future migration to Angular's native i18n

### Services

**LanguageService** (`src/app/services/language.service.ts`):

- Manages current language state
- Provides comprehensive translation interface
- Includes translations for all pages and components
- Reactive language switching with observables

**EmailService** (`src/app/services/email.service.ts`):

- Handles contact form submissions
- Multiple sending methods: API, Web3Forms, mailto fallback
- Configured for `mc.travel73@gmail.com`

### Styling & UI

- **Framework:** TailwindCSS 4.x
- **Custom fonts:** Times New Roman for serif text
- **Style language:** SCSS for component-specific styles
- **Theme:** Luxury/premium design with mountain imagery
- **Responsive:** Mobile-first approach

### Configuration Notes

- **Angular 19** with standalone components architecture
- **TypeScript 5.7** strict configuration
- **Build optimization:** Configured for production with chunking and budgets
- **Assets:** Public folder structure with automatic copying
- **Testing:** Karma + Jasmine setup
- **Analytics:** Google Analytics configured (ID in angular.json)

## Development Guidelines

### Component Creation

When creating new components, follow the existing patterns:

- Use standalone components (no modules)
- Implement responsive design with TailwindCSS
- Include proper TypeScript typing
- Use the LanguageService for all text content
- Follow the established SCSS structure

### Translation Management

All user-facing text must be managed through the LanguageService:

- Add new keys to the `Translations` interface
- Provide both French and English translations
- Use reactive patterns with the language observable
- Maintain consistency with existing translation keys

### Routing

- Use lazy loading for all new pages
- Include proper page titles in route configuration
- Follow the existing route structure pattern
- Ensure proper navigation breadcrumbs

### Email Integration

The EmailService supports multiple sending methods. For production:

- Implement Cloudflare Workers endpoint at `/api/send-email`
- Or configure Web3Forms with access key
- Mailto fallback is always available as backup
