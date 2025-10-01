import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./hero-section.component.scss'],
  template: `
    <section class="relative h-screen overflow-hidden flex items-center justify-center">
      <!-- Vidéo de fond responsive -->
      <video 
        #heroVideo
        class="absolute inset-0 w-full h-full object-cover"
        [style.object-position]="getVideoPosition()"
        autoplay 
        muted 
        loop
        playsinline
        preload="metadata"
        [poster]="'assets/images/photo_mc.JPG'">
        <source src="https://pub-3255f12a5223472980a97fe319ca6482.r2.dev/BASE M 2K.mov" type="video/mp4">
      </video>
      
      <!-- Overlay simple -->
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
      
      <!-- Contenu principal -->
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        
        <!-- Tagline principal -->
        <div class="animate-fade-in-up">
          <h1 class="text-5xl md:text-7xl font-light mb-8 tracking-wide leading-tight">
            <span class="block font-serif italic">{{ languageService.currentTranslations.heroTitle }}</span>
          </h1>
        </div>
        
        <!-- Ligne décorative -->
        <div class="decorative-line animate-fade-in-up delay-200"></div>
        
        <!-- Sous-titre -->
        <div class="animate-fade-in-up delay-300">
          <p class="text-xl md:text-2xl font-light mb-12 leading-relaxed opacity-90">
            {{ languageService.currentTranslations.heroSubtitle }}
          </p>
        </div>
      </div>
      
      <!-- Indicateur de scroll simple -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div class="flex flex-col items-center space-y-2">
          <span class="text-xs uppercase tracking-wide opacity-80">{{ languageService.currentTranslations.discoverScroll }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent implements AfterViewInit {
  isMuted = true;
  
  constructor(public languageService: LanguageService) {}

  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.muted = this.isMuted;
    video.volume = this.isMuted ? 0 : 0.7;
    video.play().catch(err => console.log('Autoplay prevented:', err));
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

  toggleMute() {
    this.isMuted = !this.isMuted;
    const video = this.videoElement.nativeElement;
    video.muted = this.isMuted;
    video.volume = this.isMuted ? 0 : 0.7;
  }
}