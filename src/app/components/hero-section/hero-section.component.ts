import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative h-screen overflow-hidden flex items-center justify-center">
      <!-- Vidéo de fond -->
      <video 
        #heroVideo
        class="absolute inset-0 w-full h-full object-cover sm:object-center object-center-top"
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
        <svg *ngIf="!isMuted" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.82L4.4 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.4l3.983-2.82a1 1 0 011.617-.18z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M12.146 4.146a.5.5 0 01.708 0 4 4 0 010 5.708.5.5 0 01-.708-.708 3 3 0 000-4.292.5.5 0 010-.708z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M14.146 2.146a.5.5 0 01.708 0 8 8 0 010 11.708.5.5 0 01-.708-.708 7 7 0 000-10.292.5.5 0 010-.708z" clip-rule="evenodd"/>
        </svg>
        
        <!-- Icône son coupé -->
        <svg *ngIf="isMuted" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.82L4.4 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.4l3.983-2.82a1 1 0 011.617-.18z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M12.22 4.22a.75.75 0 011.06 0L15 5.94l1.72-1.72a.75.75 0 111.06 1.06L16.06 7l1.72 1.72a.75.75 0 01-1.06 1.06L15 8.06l-1.72 1.72a.75.75 0 01-1.06-1.06L13.94 7l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"/>
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

  toggleMute() {
    this.isMuted = !this.isMuted;
    const video = this.videoElement.nativeElement;
    video.muted = this.isMuted;
    video.volume = this.isMuted ? 0 : 0.7;
  }
}