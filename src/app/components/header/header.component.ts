// components/header/header.component.ts
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SeasonService, Season } from '../../services/season.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Barre de contact simple -->
    <div class="bg-gray-900 text-white py-2 text-center text-sm animate-fade-in-up">
      <div class="max-w-7xl mx-auto px-4">
        <span class="font-medium">{{ languageService.currentTranslations.contactBar || 'Pour toute demande :' }} </span>
        <a href="tel:+33620524796" class="text-white hover:text-gray-300 transition-colors font-semibold underline">
          +33 6 20 52 47 96
        </a>
      </div>
    </div>

    <!-- Header principal épuré -->
    <header [class]="'clean-header sticky top-0 z-40' + (isScrolled ? ' scrolled' : '')">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          
          <!-- Bouton saison (gauche) - Affiché seulement sur la home page -->
          <div class="flex justify-start animate-fade-in-left">
            <button 
              *ngIf="isHomePage"
              class="season-toggle text-sm px-3 py-1.5 font-medium transition-all duration-300 hover:scale-105"
              [class.winter-active]="currentSeason === 'summer'"
              [class.summer-active]="currentSeason === 'winter'"
              (click)="toggleSeason()">
              <span class="flex items-center space-x-2">
                <!-- Icône Hiver (affiché quand on est en mode été pour basculer vers hiver) -->
                <svg *ngIf="currentSeason === 'summer'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2l1.5 1.5L10 5 8.5 3.5 10 2zm0 16l1.5-1.5L10 15l-1.5 1.5L10 18zM2 10l1.5 1.5L5 10 3.5 8.5 2 10zm16 0l-1.5 1.5L15 10l1.5-1.5L18 10zM5.636 5.636l1.06-1.06L8.11 6.05 7.05 7.11 5.636 5.636zm8.728 8.728l1.06-1.06-1.414-1.415-1.06 1.06 1.414 1.415zM14.364 5.636l-1.06-1.06L11.89 6.05l1.06 1.06 1.414-1.424zm-8.728 8.728l-1.06-1.06 1.414-1.415 1.06 1.06-1.414 1.415z"/>
                </svg>
                <!-- Icône Été (affiché quand on est en mode hiver pour basculer vers été) -->
                <svg *ngIf="currentSeason === 'winter'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
                </svg>
                <span>
                  {{ currentSeason === 'summer' ? 
                    (languageService.currentTranslations.seasonWinter || 'HIVER') : 
                    (languageService.currentTranslations.seasonSummer || 'ÉTÉ') }}
                </span>
              </span>
            </button>
          </div>
          
          <!-- Logo central parfaitement centré -->
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in-up delay-200">
            <a routerLink="/" class="block">
              <img 
                src="assets/images/icones/Logo_finaux_Plan_de_travail_1_copie_5.png" 
                alt="Logo MC Travel" 
                class="h-20 md:h-24 lg:h-28 transition-transform duration-300 hover:scale-105">
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
            class="h-16 md:h-18">
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
          <h3 class="menu-section-title">{{ languageService.currentTranslations.navigationSection || 'Navigation' }}</h3>
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
                {{ languageService.currentTranslations.menuHome }}
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
                {{ languageService.currentTranslations.menuDestinations }}
              </a>
            </li>
            <li>
              <a routerLink="/conciergerie" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                {{ languageService.currentTranslations.menuConciergerie }}
              </a>
            </li>
            <li>
              <a routerLink="/hebergements" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {{ languageService.currentTranslations.menuAccommodations }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Section contact -->
        <div class="menu-section">
          <h3 class="menu-section-title">{{ languageService.currentTranslations.contactSection || 'Contact' }}</h3>
          <ul class="menu-items">
            <li>
              <a routerLink="/contact" 
                 routerLinkActive="active"
                 class="menu-item" 
                 (click)="closeSideMenu()">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {{ languageService.currentTranslations.menuContact }}
              </a>
            </li>
            
            <!-- Section des numéros de téléphone -->
            <li class="menu-contact-info">
              <div class="text-sm text-gray-500 px-4 py-2 space-y-3">
                <div>
                  <p class="font-medium text-gray-700 mb-1">Charlotte</p>
                  <a href="tel:+33603316762" class="text-blue-600 hover:text-blue-800 block">
                    +33 6 03 31 67 62
                  </a>
                </div>
                <div>
                  <p class="font-medium text-gray-700 mb-1">Morgan</p>
                  <a href="tel:+33620524796" class="text-blue-600 hover:text-blue-800 block">
                    +33 6 20 52 47 96
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    /* Styles du bouton saison améliorés */
    .season-toggle {
      background: white;
      border: 2px solid #d1d5db;
      border-radius: 9999px;
    }
    
    .season-toggle.winter-active {
      background: #dbeafe;
      border-color: #3b82f6;
      color: #1d4ed8;
    }
    
    .season-toggle.summer-active {
      background: #fef3c7;
      border-color: #eab308;
      color: #a16207;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentSeason: Season = 'winter';
  isScrolled = false;
  isSideMenuOpen = false;
  isHomePage = true; // Par défaut sur la home page
  private seasonSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    public languageService: LanguageService,
    public seasonService: SeasonService,
    private router: Router
  ) {}

  ngOnInit() {
    // S'abonner aux changements de saison
    this.seasonSubscription = this.seasonService.currentSeason$.subscribe(season => {
      this.currentSeason = season;
    });
    
    // S'abonner aux changements de route pour détecter la home page
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.url === '/' || event.url === '';
      });
    
    // Vérifier la route initiale
    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }

  ngOnDestroy() {
    if (this.seasonSubscription) {
      this.seasonSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

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
    this.seasonService.toggleSeason();
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
    document.body.style.overflow = this.isSideMenuOpen ? 'hidden' : '';
  }

  closeSideMenu() {
    this.isSideMenuOpen = false;
    document.body.style.overflow = '';
  }
}