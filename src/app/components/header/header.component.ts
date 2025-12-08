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
    <div class="h-[36px] bg-[#1c1c1c] text-stone-300 flex items-center justify-center text-[11px] uppercase tracking-[0.15em] animate-fade-in-up border-b border-white/5 relative z-50">
      <div class="max-w-7xl mx-auto px-4 flex justify-center items-center gap-4">
        <span class="opacity-80 hidden sm:inline">{{ languageService.currentTranslations.contactBar || 'Demandes & Réservations :' }} </span>
        <a href="tel:+33620524796" class="text-white hover:text-stone-400 transition-colors duration-300">
          +33 6 20 52 47 96
        </a>
      </div>
    </div>

    <header
      [class]="'fixed w-full z-40 transition-all duration-500 ease-in-out ' +
      (isScrolled
        ? 'top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#1c1c1c]/5 py-2'
        : 'top-[36px] bg-transparent py-6')"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">

          <div class="w-1/3 flex justify-start">
            <button
              *ngIf="isHomePage"
              class="group flex items-center gap-2 px-4 py-2 border border-[#1c1c1c]/20 rounded-full transition-all duration-500 hover:border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white bg-white/50 backdrop-blur-sm"
              (click)="toggleSeason()">

              <span class="relative w-4 h-4 overflow-hidden">
                <svg *ngIf="currentSeason === 'summer'" class="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                <svg *ngIf="currentSeason === 'winter'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              </span>

              <span class="text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block">
                 {{ currentSeason === 'summer' ?
                   (languageService.currentTranslations.seasonWinter || 'Mode Hiver') :
                   (languageService.currentTranslations.seasonSummer || 'Mode Été') }}
              </span>
            </button>
          </div>

          <div class="w-1/3 flex justify-center">
            <a routerLink="/" class="block relative z-50">
              <img
                src="assets/images/icones/Logo_finaux_Plan_de_travail_1_copie_5.png"
                alt="Logo MC Travel"
                class="h-16 md:h-20 transition-all duration-500 hover:opacity-80">
            </a>
          </div>

          <div class="w-1/3 flex justify-end items-center gap-6 md:gap-8">

            <div class="hidden md:flex items-center gap-4 text-[10px] font-medium tracking-widest text-[#1c1c1c]">
              <button
                (click)="languageService.switchLanguage('fr')"
                [class.opacity-40]="languageService.currentLanguage !== 'fr'"
                class="hover:opacity-100 transition-opacity uppercase">FR</button>
              <span class="opacity-30">|</span>
              <button
                (click)="languageService.switchLanguage('en')"
                [class.opacity-40]="languageService.currentLanguage !== 'en'"
                class="hover:opacity-100 transition-opacity uppercase">EN</button>
            </div>

            <button
              class="group flex flex-col justify-center items-end gap-[5px] w-8 h-8 cursor-pointer z-50"
              (click)="toggleSideMenu()"
              [class.active]="isSideMenuOpen"
              aria-label="Menu">
              <span class="w-8 h-[1px] bg-[#1c1c1c] transition-all duration-300 group-hover:w-6" [class.bg-white]="isSideMenuOpen"></span>
              <span class="w-5 h-[1px] bg-[#1c1c1c] transition-all duration-300 group-hover:w-8" [class.bg-white]="isSideMenuOpen"></span>
              <span class="w-8 h-[1px] bg-[#1c1c1c] transition-all duration-300 group-hover:w-6" [class.bg-white]="isSideMenuOpen"></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div
      [class]="'fixed inset-0 bg-[#1c1c1c]/20 backdrop-blur-sm z-40 transition-opacity duration-500 ' + (isSideMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible')"
      (click)="closeSideMenu()">
    </div>

    <nav [class]="'fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) ' + (isSideMenuOpen ? 'translate-x-0' : 'translate-x-full')">

      <div class="p-8 md:p-12 flex justify-between items-center">
        <span class="text-xs uppercase tracking-[0.2em] text-[#a8a29e]">Menu</span>
        <button (click)="closeSideMenu()" class="group p-2">
          <svg class="w-6 h-6 text-[#1c1c1c] transition-transform duration-500 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="px-8 md:px-12 h-[calc(100%-200px)] overflow-y-auto">
        <div class="mb-16">
          <h3 class="font-serif italic text-2xl text-[#1c1c1c] mb-8 opacity-50">Navigation</h3>
          <ul class="space-y-6">
            <li>
              <a routerLink="/" (click)="closeSideMenu()" class="menu-link block text-4xl font-serif text-[#1c1c1c] hover:italic hover:pl-4 transition-all duration-500">
                {{ languageService.currentTranslations.menuHome || 'Accueil' }}
              </a>
            </li>
            <li>
              <a routerLink="/destinations" (click)="closeSideMenu()" class="menu-link block text-4xl font-serif text-[#1c1c1c] hover:italic hover:pl-4 transition-all duration-500">
                {{ languageService.currentTranslations.menuDestinations || 'Destinations' }}
              </a>
            </li>
            <li>
              <a routerLink="/hebergements" (click)="closeSideMenu()" class="menu-link block text-4xl font-serif text-[#1c1c1c] hover:italic hover:pl-4 transition-all duration-500">
                {{ languageService.currentTranslations.menuAccommodations || 'Hébergements' }}
              </a>
            </li>
            <li>
              <a routerLink="/conciergerie" (click)="closeSideMenu()" class="menu-link block text-4xl font-serif text-[#1c1c1c] hover:italic hover:pl-4 transition-all duration-500">
                {{ languageService.currentTranslations.menuConciergerie || 'Conciergerie' }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-serif italic text-2xl text-[#1c1c1c] mb-8 opacity-50">Contact</h3>
          <div class="space-y-4 text-[#57534e] font-light">
            <a href="tel:+33603316762" class="block hover:text-[#1c1c1c] transition-colors">Charlotte: +33 6 03 31 67 62</a>
            <a href="tel:+33620524796" class="block hover:text-[#1c1c1c] transition-colors">Morgan: +33 6 20 52 47 96</a>
            <a routerLink="/contact" (click)="closeSideMenu()" class="inline-block mt-4 text-xs uppercase tracking-[0.2em] border-b border-[#1c1c1c] pb-1 text-[#1c1c1c]">
              {{ languageService.currentTranslations.menuContact || 'Formulaire de contact' }}
            </a>
          </div>
        </div>

        <div class="md:hidden mt-12 pt-12 border-t border-[#1c1c1c]/10 flex gap-6">
           <button (click)="languageService.switchLanguage('fr')" [class.font-bold]="languageService.currentLanguage === 'fr'">FR</button>
           <button (click)="languageService.switchLanguage('en')" [class.font-bold]="languageService.currentLanguage === 'en'">EN</button>
        </div>

      </div>
    </nav>
  `,
  styles: [`
    .cubic-bezier { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
    .animate-spin-slow { animation: spin 3s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentSeason: Season = 'winter';
  isScrolled = false;
  isSideMenuOpen = false;
  isHomePage = true;
  private seasonSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    public languageService: LanguageService,
    public seasonService: SeasonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.seasonSubscription = this.seasonService.currentSeason$.subscribe(season => {
      this.currentSeason = season;
    });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.url === '/' || event.url === '';
        this.closeSideMenu();
      });

    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }

  ngOnDestroy() {
    if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Scroll détecté plus tôt pour une meilleure réactivité
    this.isScrolled = window.pageYOffset > 20;
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
