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
        class="absolute inset-0 w-full h-full object-cover"
        autoplay 
        muted 
        loop
        playsinline
        [poster]="'assets/images/photo_mc.JPG'">
        <source src="assets/images/video1.mp4" type="video/mp4">
      </video>
      
      <!-- Overlay simple -->
      <div class="absolute inset-0 bg-black/40"></div>
      
      <!-- Contenu principal -->
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        
        <!-- Tagline principal -->
        <div class="animate-fade-in-up">
          <h1 class="text-5xl md:text-7xl font-light mb-8 tracking-wide leading-tight">
            <span class="block font-serif italic">L'art du voyage</span>
            <span class="block mt-2">haut de gamme</span>
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
          <span class="text-xs uppercase tracking-wide opacity-80">Découvrir</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent implements AfterViewInit {
  constructor(public languageService: LanguageService) {}

  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.muted = true;
    video.volume = 0;
    video.play().catch(err => console.log('Autoplay prevented:', err));
  }
}