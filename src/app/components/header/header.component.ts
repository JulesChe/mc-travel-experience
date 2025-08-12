import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Barre de contact simple -->
    <div class="bg-gray-900 text-white py-2 text-center text-sm animate-fade-in-up">
      <div class="max-w-7xl mx-auto px-4">
        <span class="font-medium">Pour toute demande : </span>
        <a href="tel:+33620524796" class="text-white hover:text-gray-300 transition-colors font-semibold underline">
          +33(0) 620 524 796
        </a>
      </div>
    </div>

    <!-- Header principal épuré -->
    <header [class]="'clean-header sticky top-0 z-40' + (isScrolled ? ' scrolled' : '')">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-5">
          
          <!-- Bouton saison (gauche) -->
          <div class="flex justify-start animate-fade-in-left">
            <button 
              class="season-toggle"
              (click)="toggleSeason()">
              {{ currentSeason === 'winter' ? 'HIVER' : 'ÉTÉ' }}
            </button>
          </div>
          
          <!-- Logo central parfaitement centré -->
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in-up delay-200">
            <a routerLink="/" class="block">
              <img 
                src="assets/images/icones/Logo_finaux_Plan_de_travail_1_copie_5.png" 
                alt="Logo MC Travel" 
                class="h-16 md:h-18 transition-transform duration-300 hover:scale-105">
            </a>
          </div>
          
          <!-- Section droite -->
          <div class="flex justify-end items-center space-x-4 animate-fade-in-right delay-300">
            
            <!-- Langues épurées -->
            <div class="flex items-center space-x-2">
              <button 
                (click)="languageService.switchLanguage('fr')"
                [class]="'language-btn ' + (languageService.currentLanguage === 'fr' ? 'active' : 'inactive')">
                FR
              </button>
              <button 
                (click)="languageService.switchLanguage('en')"
                [class]="'language-btn ' + (languageService.currentLanguage === 'en' ? 'active' : 'inactive')">
                EN
              </button>
            </div>
            
            <!-- Menu burger élégant -->
            <button 
              class="menu-burger"
              (click)="toggleSideMenu()"
              [class.active]="isSideMenuOpen">
              <span class="burger-line"></span>
              <span class="burger-line"></span>
              <span class="burger-line"></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Overlay pour fermer le menu -->
    <div 
      [class]="'menu-overlay' + (isSideMenuOpen ? ' active' : '')"
      (click)="closeSideMenu()">
    </div>

    <!-- Menu latéral coulissant -->
    <nav [class]="'side-menu' + (isSideMenuOpen ? ' open' : '')">
      
      <!-- En-tête du menu -->
      <div class="side-menu-header">
        <div class="flex items-center justify-between">
          <img 
            src="assets/images/icones/Logo_finaux_Plan_de_travail_1_copie_5.png" 
            alt="Logo MC Travel" 
            class="h-12">
          <button 
            class="close-menu-btn"
            (click)="closeSideMenu()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation principale -->
      <div class="side-menu-content">
        <div class="menu-section">
          <h3 class="menu-section-title">Navigation</h3>
          <ul class="menu-items">
            <li>
              <a routerLink="/" 
                 routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                {{ languageService.currentTranslations.menuHome || 'Accueil' }}
              </a>
            </li>
            <li>
              <a routerLink="/destinations" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ languageService.currentTranslations.menuDestinations || 'Destinations' }}
              </a>
            </li>
            <li>
              <a routerLink="/services" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
                {{ languageService.currentTranslations.menuServices || 'Services' }}
              </a>
            </li>
            <li>
              <a routerLink="/accommodations" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {{ languageService.currentTranslations.menuAccommodations || 'Hébergements' }}
              </a>
            </li>
            <li>
              <a routerLink="/about" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ languageService.currentTranslations.menuAbout || 'À propos' }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Section contact -->
        <div class="menu-section">
          <h3 class="menu-section-title">Contact</h3>
          <ul class="menu-items">
            <li>
              <a routerLink="/contact" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {{ languageService.currentTranslations.menuContact || 'Contact' }}
              </a>
            </li>
            <li class="menu-contact-info">
              <div class="text-sm text-gray-500 px-4 py-2">
                <p class="font-medium text-gray-700 mb-1">Appelez-nous</p>
                <a href="tel:+33620524796" class="text-blue-600 hover:text-blue-800">
                  +33(0) 620 524 796
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  currentSeason: 'winter' | 'summer' = 'winter';
  isScrolled = false;
  isSideMenuOpen = false;

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    if (this.isSideMenuOpen) {
      this.closeSideMenu();
    }
  }

  toggleSeason() {
    this.currentSeason = this.currentSeason === 'winter' ? 'summer' : 'winter';
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isSideMenuOpen ? 'hidden' : '';
  }

  closeSideMenu() {
    this.isSideMenuOpen = false;
    document.body.style.overflow = '';
  }
}