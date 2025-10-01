// pages/home-page/home-page.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Composants existants (hiver)
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ExcellenceSectionComponent } from '../../components/excellence-section/excellence-section.component';
import { DestinationsSectionComponent } from '../../components/destinations-section/destinations-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { AccommodationsSectionComponent } from '../../components/accommodations-section/accommodations-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

// Services
import { SeasonService, Season, SeasonContent } from '../../services/season.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    ExcellenceSectionComponent,
    DestinationsSectionComponent,
    ServicesSectionComponent,
    AccommodationsSectionComponent,
    ContactSectionComponent
  ],
  template: `
    <!-- Contenu Hiver (existant) -->
    <div *ngIf="currentSeason === 'winter'">
      <app-hero-section></app-hero-section>
      <app-excellence-section></app-excellence-section>
      <app-destinations-section></app-destinations-section>
      <app-services-section></app-services-section>
      <app-accommodations-section></app-accommodations-section>
      <app-contact-section></app-contact-section>
    </div>

    <!-- Contenu Été (nouveau) -->
    <div *ngIf="currentSeason === 'summer'">

      <!-- Hero Section Été (même style que l'hiver) -->
      <section class="relative h-screen overflow-hidden flex items-center justify-center">
        <video
          #heroVideo
          class="absolute inset-0 w-full h-full object-cover"
          [style.object-position]="getVideoPosition()"
          autoplay
          muted
          loop
          playsinline
          [poster]="seasonContent.heroPoster">
          <source [src]="seasonContent.heroVideo" type="video/mp4">
        </video>

        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Contrôle audio -->
        <button
          (click)="toggleMute()"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 text-white p-3 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 touch-manipulation"
          [title]="isMuted ? 'Activer le son' : 'Couper le son'"
          aria-label="Contrôle du son">

          <!-- Icône son activé -->
          <svg *ngIf="!isMuted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z"/>
          </svg>

          <!-- Icône son coupé -->
          <svg *ngIf="isMuted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z"/>
          </svg>
        </button>

        <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div class="animate-fade-in-up">
            <h1 class="text-5xl md:text-7xl font-light mb-8 tracking-wide leading-tight">
              <span class="block font-serif italic">{{ seasonContent.heroTitle }}</span>
            </h1>
          </div>

          <div class="decorative-line animate-fade-in-up delay-200"></div>

          <div class="animate-fade-in-up delay-300">
            <p class="text-xl md:text-2xl font-light mb-12 leading-relaxed opacity-90">
              {{ seasonContent.heroSubtitle }}
            </p>
          </div>
        </div>

        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div class="flex flex-col items-center space-y-2">
            <span class="text-xs uppercase tracking-wide opacity-80">{{ languageService.currentTranslations.discoverScroll }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <!-- Menu Navigation Été -->
      <nav class="bg-white sticky top-0 z-30 shadow-md">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="flex justify-center items-center space-x-2 sm:space-x-6 lg:space-x-8 py-4 sm:py-6 overflow-x-auto">
            <button
              (click)="scrollToSection('destinations')"
              class="text-sm sm:text-base lg:text-lg font-light text-gray-700 hover:text-[#151c32] transition-colors uppercase tracking-wide whitespace-nowrap flex-shrink-0">
              {{ languageService.currentTranslations.summerNavDestinations }}
            </button>
            <span class="text-gray-300 flex-shrink-0">|</span>
            <button
              (click)="scrollToSection('hebergements')"
              class="text-sm sm:text-base lg:text-lg font-light text-gray-700 hover:text-[#151c32] transition-colors uppercase tracking-wide whitespace-nowrap flex-shrink-0">
              {{ languageService.currentTranslations.summerNavAccommodations }}
            </button>
            <span class="text-gray-300 flex-shrink-0">|</span>
            <button
              (click)="scrollToSection('activites')"
              class="text-sm sm:text-base lg:text-lg font-light text-gray-700 hover:text-[#151c32] transition-colors uppercase tracking-wide whitespace-nowrap flex-shrink-0">
              {{ languageService.currentTranslations.summerNavActivities }}
            </button>
          </div>
        </div>
      </nav>

<!-- Section Destinations Été -->
<section id="destinations" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div class="text-center mb-16 animate-fade-in-up">
      <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
        {{ languageService.currentTranslations.summerDestinationsTitle }}
      </h2>
      <div class="decorative-line"></div>
      <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
        {{ languageService.currentTranslations.summerDestinationsSubtitle }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12">
      <div *ngFor="let destination of seasonContent.destinations; let i = index"
           class="group cursor-pointer animate-fade-in-up"
           [style.animation-delay]="(i * 100) + 'ms'">

        <div class="relative overflow-hidden rounded-lg shadow-xl">
          <img
            [src]="destination.image"
            [alt]="destination.name"
            class="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110">

          <!-- Overlay plus sombre pour meilleur contraste -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

          <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
            <!-- Titre en blanc avec ombre pour lisibilité -->
            <h3 class="text-3xl font-light mb-2 summer-title">{{ destination.name }}</h3>
            <p class="text-lg font-light opacity-90">{{ destination.subtitle }}</p>
          </div>
        </div>

        <div class="mt-6 px-4">
          <p class="text-gray-600 leading-relaxed mb-4">{{ destination.description }}</p>

          <div *ngIf="destination.highlights" class="flex flex-wrap gap-2 mt-4">
            <span *ngFor="let highlight of destination.highlights"
                  class="px-3 py-1 bg-[#fff0cf] text-[#151c32] text-sm rounded-full">
              {{ highlight }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section Hébergements Été -->
<section id="hebergements" class="py-24 bg-[#fff0cf]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div class="text-center mb-16 animate-fade-in-up">
      <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
        {{ languageService.currentTranslations.summerAccommodationsTitle }}
      </h2>
      <div class="decorative-line"></div>
      <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
        {{ languageService.currentTranslations.summerAccommodationsSubtitle }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div *ngFor="let accommodation of seasonContent.accommodations; let i = index"
           class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
           [style.animation-delay]="(i * 100) + 'ms'">

        <div class="relative h-48 overflow-hidden">
          <img
            [src]="accommodation.image"
            [alt]="accommodation.name"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">

          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span class="text-xs font-medium text-gray-700">{{ accommodation.type }}</span>
          </div>
        </div>

        <div class="p-6">
          <!-- Ce titre reste sombre car il est sur fond blanc -->
          <h3 class="text-xl font-semibold text-[#151c32] mb-2">{{ accommodation.name }}</h3>
          <p class="text-sm text-gray-500 mb-3">
            <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {{ accommodation.location }}
          </p>
          <p class="text-gray-600 text-sm leading-relaxed">{{ accommodation.description }}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section Activités -->
<section id="activites" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div class="text-center mb-16 animate-fade-in-up">
      <h2 class="text-4xl md:text-5xl font-light summer-h2-title mb-6">
        {{ languageService.currentTranslations.summerActivitiesTitle }}
      </h2>
      <div class="decorative-line"></div>
      <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
        {{ languageService.currentTranslations.summerActivitiesSubtitle }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div *ngFor="let activity of seasonContent.activities; let i = index"
           class="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up cursor-pointer"
           [style.animation-delay]="(i * 100) + 'ms'">

        <div class="relative h-80">
          <img
            [src]="activity.image"
            [alt]="activity.name"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

          <!-- Overlay avec dégradé -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>

          <!-- Contenu fixe aligné en bas -->
          <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 class="text-2xl font-semibold mb-2 summer-title transform transition-transform duration-300 group-hover:-translate-y-2">
              {{ activity.name }}
            </h3>
            <p class="text-lg font-light opacity-90">{{ activity.subtitle }}</p>
          </div>

          <!-- Description hover en position absolue séparée -->
          <div class="absolute bottom-8 left-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-white">
            <div class="bg-black/60 backdrop-blur-sm rounded-lg p-4 mt-4">
              <p class="text-sm leading-relaxed">{{ activity.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <!-- Section Contact ou autre section de clôture -->
      <app-contact-section></app-contact-section>
    </div>
  `,
  styles: [`
    .decorative-line {
      width: 60px;
      height: 2px;
      background: var(--primary-blue);
      margin: 1.5rem auto;
    }
  `]
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSeason: Season = 'winter';
  seasonContent!: SeasonContent;
  private seasonSubscription!: Subscription;
  private languageSubscription!: Subscription;

  // Audio controls
  isMuted = true;

  @ViewChild('heroVideo') videoElement?: ElementRef<HTMLVideoElement>;

  constructor(
    public seasonService: SeasonService,
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // S'abonner aux changements de saison
    this.seasonSubscription = this.seasonService.currentSeason$.subscribe(season => {
      this.currentSeason = season;
      this.seasonContent = this.seasonService.getSeasonContent(this.languageService.currentLanguage);
      
      // S'assurer que la vidéo démarre toujours en mode muet lors du changement de saison
      this.isMuted = true;
      
      // Si on a une vidéo active, la mettre en muet
      setTimeout(() => {
        if (this.videoElement) {
          const video = this.videoElement.nativeElement;
          video.muted = true;
          video.volume = 0;
        }
      }, 100);
    });

    // S'abonner aux changements de langue
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.seasonContent = this.seasonService.getSeasonContent(this.languageService.currentLanguage);
    });

    // Initialiser le contenu
    this.seasonContent = this.seasonService.getSeasonContent(this.languageService.currentLanguage);
  }

  ngAfterViewInit() {
    if (this.videoElement && this.currentSeason === 'summer') {
      const video = this.videoElement.nativeElement;
      // S'assurer que la vidéo démarre toujours en mode muet
      this.isMuted = true;
      video.muted = true;
      video.volume = 0;
      video.play().catch(err => console.log('Autoplay prevented:', err));
    }
  }

  ngOnDestroy() {
    if (this.seasonSubscription) {
      this.seasonSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      video.muted = this.isMuted;
      video.volume = this.isMuted ? 0 : 0.7;
    }
  }

  getVideoPosition(): string {
    // Détecter si c'est un appareil mobile
    const isMobile = window.innerWidth <= 768;
    const isPortrait = window.innerHeight > window.innerWidth;
    
    if (isMobile) {
      if (isPortrait) {
        // Mobile en portrait : remonter la vidéo pour éviter la coupure
        return 'center 25%';
      } else {
        // Mobile en paysage : centrer normalement
        return 'center center';
      }
    }
    
    // Desktop : position normale
    return 'center center';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
