import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Composants Hiver
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
    <div *ngIf="currentSeason === 'winter'">
      <app-hero-section></app-hero-section>
      <app-excellence-section></app-excellence-section>
      <app-destinations-section></app-destinations-section>
      <app-services-section></app-services-section>
      <app-accommodations-section></app-accommodations-section>
      <app-contact-section></app-contact-section>
    </div>

    <div *ngIf="currentSeason === 'summer'" class="bg-[#F5F4F0] text-[#1c1c1c]">

      <section class="relative h-screen overflow-hidden flex items-center justify-center bg-[#1c1c1c]">
        <video
          #heroVideo
          class="absolute inset-0 w-full h-full object-cover opacity-90"
          [style.object-position]="getVideoPosition()"
          autoplay muted loop playsinline
          [poster]="seasonContent.heroPoster">
          <source [src]="seasonContent.heroVideo" type="video/mp4">
        </video>

        <div class="absolute inset-0 bg-black/30"></div>

        <button
          (click)="toggleMute()"
          class="absolute top-6 right-6 z-20 text-white p-2 group">
          <div class="p-3 border border-white/30 rounded-full group-hover:border-white transition-colors">
             <svg *ngIf="!isMuted" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z"/></svg>
             <svg *ngIf="isMuted" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z"/></svg>
          </div>
        </button>

        <div class="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div class="animate-fade-in-up">
            <h1 class="text-5xl md:text-8xl font-serif italic mb-8 tracking-wide leading-tight drop-shadow-lg">
              {{ seasonContent.heroTitle }}
            </h1>
          </div>
          <div class="w-[1px] h-20 bg-white/50 mx-auto my-8 animate-fade-in-up delay-200"></div>
          <div class="animate-fade-in-up delay-300">
            <p class="text-xl md:text-2xl font-light mb-12 tracking-wide opacity-90">
              {{ seasonContent.heroSubtitle }}
            </p>
          </div>
        </div>

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
           <div class="w-[1px] h-12 bg-white/30"></div>
        </div>
      </section>

      <nav class="bg-[#F5F4F0] sticky top-0 z-30 border-b border-[#1c1c1c]/5">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-center items-center space-x-8 md:space-x-16 py-6 overflow-x-auto">
            <button *ngFor="let section of ['destinations', 'hebergements', 'activites']"
              (click)="scrollToSection(section)"
              class="text-xs uppercase tracking-[0.2em] text-[#57534e] hover:text-[#1c1c1c] transition-colors whitespace-nowrap">
              {{ section === 'destinations' ? languageService.currentTranslations.summerNavDestinations :
                 section === 'hebergements' ? languageService.currentTranslations.summerNavAccommodations :
                 languageService.currentTranslations.summerNavActivities }}
            </button>
          </div>
        </div>
      </nav>

      <section id="destinations" class="py-32 px-4 md:px-8">
        <div class="max-w-[1600px] mx-auto">
          <div class="text-center mb-24 animate-fade-in-up">
            <h2 class="text-4xl md:text-6xl font-serif text-[#1c1c1c] mb-6">{{ languageService.currentTranslations.summerDestinationsTitle }}</h2>
            <p class="text-lg text-[#57534e] font-light max-w-2xl mx-auto italic font-serif">{{ languageService.currentTranslations.summerDestinationsSubtitle }}</p>
          </div>

          <div class="grid md:grid-cols-2 gap-12 lg:gap-24">
            <div *ngFor="let destination of seasonContent.destinations; let i = index"
                 class="group cursor-pointer animate-fade-in-up"
                 [style.animation-delay]="(i * 100) + 'ms'">

              <div class="relative overflow-hidden aspect-[4/3] mb-8">
                <img [src]="destination.image" [alt]="destination.name"
                     class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">
              </div>

              <div class="px-2">
                <h3 class="text-3xl font-serif text-[#1c1c1c] mb-2">{{ destination.name }}</h3>
                <p class="text-sm uppercase tracking-widest text-[#a8a29e] mb-4">{{ destination.subtitle }}</p>
                <p class="text-[#57534e] font-light leading-relaxed mb-6">{{ destination.description }}</p>
                <div *ngIf="destination.highlights" class="flex flex-wrap gap-x-6 gap-y-2">
                  <span *ngFor="let highlight of destination.highlights" class="text-xs uppercase tracking-wide text-[#1c1c1c] border-b border-[#1c1c1c]/20 pb-1">
                    {{ highlight }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hebergements" class="py-32 bg-white">
        <div class="max-w-[1600px] mx-auto px-4 md:px-8">
          <div class="text-center mb-24 animate-fade-in-up">
            <h2 class="text-4xl md:text-6xl font-serif text-[#1c1c1c] mb-6">{{ languageService.currentTranslations.summerAccommodationsTitle }}</h2>
            <p class="text-lg text-[#57534e] font-light max-w-2xl mx-auto italic font-serif">{{ languageService.currentTranslations.summerAccommodationsSubtitle }}</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div *ngFor="let accommodation of seasonContent.accommodations; let i = index"
                 class="group animate-fade-in-up" [style.animation-delay]="(i * 100) + 'ms'">

              <div class="relative h-80 overflow-hidden mb-6">
                <img [src]="accommodation.image" [alt]="accommodation.name"
                     class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-[#1c1c1c]">
                  {{ accommodation.type }}
                </div>
              </div>

              <div>
                <h3 class="text-xl font-serif text-[#1c1c1c] mb-1">{{ accommodation.name }}</h3>
                <p class="text-xs uppercase tracking-widest text-[#a8a29e] mb-3">{{ accommodation.location }}</p>
                <p class="text-sm text-[#57534e] font-light leading-relaxed">{{ accommodation.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="activites" class="py-32 px-4 md:px-8">
        <div class="max-w-[1600px] mx-auto">
          <div class="text-center mb-24 animate-fade-in-up">
            <h2 class="text-4xl md:text-6xl font-serif text-[#1c1c1c] mb-6">{{ languageService.currentTranslations.summerActivitiesTitle }}</h2>
            <p class="text-lg text-[#57534e] font-light max-w-2xl mx-auto italic font-serif">{{ languageService.currentTranslations.summerActivitiesSubtitle }}</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div *ngFor="let activity of seasonContent.activities; let i = index"
                 class="group relative h-[500px] overflow-hidden cursor-pointer"
                 [style.animation-delay]="(i * 100) + 'ms'">

              <img [src]="activity.image" [alt]="activity.name"
                   class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">

              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              <div class="absolute bottom-0 left-0 p-10 text-white z-10 w-full">
                <h3 class="text-3xl font-serif italic mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">{{ activity.name }}</h3>
                <p class="text-xs uppercase tracking-[0.2em] opacity-80 mb-4">{{ activity.subtitle }}</p>
                <div class="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                  <p class="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 border-l border-white/50 pl-4">
                    {{ activity.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <app-contact-section></app-contact-section>
    </div>
  `
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSeason: Season = 'winter';
  seasonContent!: SeasonContent;
  private seasonSubscription!: Subscription;
  private languageSubscription!: Subscription;
  isMuted = true;
  @ViewChild('heroVideo') videoElement?: ElementRef<HTMLVideoElement>;

  constructor(
    public seasonService: SeasonService,
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.seasonSubscription = this.seasonService.currentSeason$.subscribe(season => {
      this.currentSeason = season;
      this.seasonContent = this.seasonService.getSeasonContent(this.languageService.currentLanguage);
      this.isMuted = true;
      setTimeout(() => this.initVideo(), 100);
    });

    this.languageService.currentLanguage$.subscribe(() => {
      this.seasonContent = this.seasonService.getSeasonContent(this.languageService.currentLanguage);
    });
    this.seasonContent = this.seasonService.getSeasonContent(this.languageService.currentLanguage);
  }

  ngAfterViewInit() { this.initVideo(); }

  initVideo() {
    if (this.videoElement && this.currentSeason === 'summer') {
      const video = this.videoElement.nativeElement;
      video.muted = true;
      video.volume = 0;
      video.play().catch(err => console.log('Autoplay prevented:', err));
    }
  }

  ngOnDestroy() {
    if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
    if (this.languageSubscription) this.languageSubscription.unsubscribe();
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
    const isMobile = window.innerWidth <= 768;
    const isPortrait = window.innerHeight > window.innerWidth;
    return (isMobile && isPortrait) ? 'center 25%' : 'center center';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
