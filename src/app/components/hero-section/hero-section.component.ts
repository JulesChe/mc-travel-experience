import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative h-screen overflow-hidden flex items-center justify-center bg-[#1c1c1c]">
      <video
        #heroVideo
        class="absolute inset-0 w-full h-full object-cover opacity-90"
        [style.object-position]="getVideoPosition()"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        [poster]="'assets/images/photo_mc.JPG'">
        <source src="https://pub-3255f12a5223472980a97fe319ca6482.r2.dev/BASE M 2K.mov" type="video/mp4">
      </video>

      <div class="absolute inset-0 bg-black/30"></div>

      <button
        (click)="toggleMute()"
        class="absolute top-6 right-6 z-20 text-white p-2 transition-all duration-300 hover:opacity-70 group"
        [title]="isMuted ? 'Activer le son' : 'Couper le son'">

        <div class="p-3 border border-white/30 rounded-full group-hover:border-white transition-colors">
            <svg *ngIf="!isMuted" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z"/>
            </svg>
            <svg *ngIf="isMuted" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z"/>
            </svg>
        </div>
      </button>

      <div class="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">

        <div class="animate-fade-in-up">
          <h1 class="text-5xl md:text-8xl font-serif italic mb-8 tracking-wide leading-tight drop-shadow-lg">
            {{ languageService.currentTranslations.heroTitle }}
          </h1>
        </div>

        <div class="w-[1px] h-20 bg-white/50 mx-auto my-8 animate-fade-in-up delay-200"></div>

        <div class="animate-fade-in-up delay-300">
          <p class="text-lg md:text-2xl font-light mb-12 tracking-wide opacity-90 max-w-2xl mx-auto">
            {{ languageService.currentTranslations.heroSubtitle }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] uppercase tracking-[0.3em] opacity-70">
            {{ languageService.currentTranslations.discoverScroll }}
          </span>
          <div class="w-[1px] h-12 bg-white/30"></div>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent implements AfterViewInit {
  isMuted = true;
  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(public languageService: LanguageService) {}

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.muted = this.isMuted;
    video.volume = this.isMuted ? 0 : 0.7;
    video.play().catch(err => console.log('Autoplay prevented:', err));
  }

  getVideoPosition(): string {
    const isMobile = window.innerWidth <= 768;
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile) {
      return isPortrait ? 'center 25%' : 'center center';
    }
    return 'center center';
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const video = this.videoElement.nativeElement;
    video.muted = this.isMuted;
    video.volume = this.isMuted ? 0 : 0.7;
  }
}
