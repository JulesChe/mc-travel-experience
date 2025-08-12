// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomeComponent),
    title: 'MC Travel Experiences - Voyages de luxe en montagne'
  },
  {
    path: 'destinations',
    loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent),
    title: 'Destinations - MC Travel Experiences'
  },
{
    path: 'conciergerie',
    loadComponent: () => import('./pages/conciergerie/conciergerie.component').then(m => m.ConciergerieComponent),
    title: 'Destinations - MC Travel Experiences'
  },
  {
    path: '**',
    redirectTo: ''
  }
];