import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!isActivityMode" class="group relative flex flex-col gap-8 md:gap-16 items-center"
         [class.md:flex-row-reverse]="reverse"
         [class.md:flex-row]="!reverse">

      <div class="w-full md:w-1/2 overflow-hidden relative"
           [class.animate-fade-in-left]="!reverse"
           [class.animate-fade-in-right]="reverse">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img
            [src]="imageUrl"
            [alt]="service?.title || activity?.title"
            class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">
        </div>
      </div>

      <div class="w-full md:w-1/2 flex flex-col justify-center"
           [class.animate-fade-in-right]="!reverse"
           [class.animate-fade-in-left]="reverse">

        <div class="mb-6">
          <h3 class="text-3xl md:text-4xl font-serif text-[#1c1c1c] mb-2">
            {{ service?.title || activity?.title }}
          </h3>
          <p class="text-sm uppercase tracking-[0.15em] text-[#57534e]">
            {{ service?.subtitle || activity?.subtitle }}
          </p>
        </div>

        <div class="mb-8">
          <p class="text-[#57534e] font-light leading-relaxed text-lg">
            {{ service?.description || activity?.description }}
          </p>
        </div>

        <div *ngIf="service?.features?.length" class="space-y-3 mb-8">
          <div *ngFor="let feature of service?.features; let i = index"
               class="flex items-center gap-3 text-[#57534e] font-light"
               [style.animation-delay.ms]="i * 100">
            <span class="w-1 h-1 bg-[#1c1c1c] rounded-full"></span>
            <span>{{ feature }}</span>
          </div>
        </div>

        <div *ngIf="showCTA">
          <button (click)="onRequestQuote()"
                  class="inline-block px-8 py-3 border border-[#1c1c1c] text-[#1c1c1c] text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white transition-all duration-500">
            {{ ctaText }}
          </button>
        </div>
      </div>
    </div>


    <div *ngIf="isActivityMode"
         class="group relative h-[500px] w-full cursor-pointer overflow-hidden border border-[#1c1c1c]/5 bg-white"
         [class.mobile-overlay-visible]="isOverlayVisible"
         (click)="onCardClick($event)">

      <div class="relative h-full w-full overflow-hidden">
        <img
          [src]="activity!.image"
          [alt]="activity!.title"
          class="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">

        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

        <div class="absolute inset-0 flex items-center justify-center p-8 bg-black/60 backdrop-blur-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p class="text-white text-center font-light leading-relaxed tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
            {{ activity!.description }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full p-8 z-20">
        <h3 class="text-2xl md:text-3xl font-serif mb-2 italic !text-white drop-shadow-md">
          {{ activity!.title }}
        </h3>
        <p class="text-xs uppercase tracking-[0.2em] opacity-90 border-t border-white/50 pt-4 inline-block !text-white drop-shadow-sm">
          {{ activity!.subtitle }}
        </p>
      </div>
    </div>
  `
})
export class ServiceCardComponent {
  @Input() service?: ServiceData;
  @Input() activity?: Activity;
  @Input() imageUrl?: string;
  @Input() reverse: boolean = false;
  @Input() ctaText: string = 'Demander un devis';
  @Input() showCTA: boolean = true;
  @Input() iconPath: string = '';

  @Output() requestQuote = new EventEmitter<ServiceData | Activity>();

  isOverlayVisible = false;

  get isActivityMode(): boolean {
    return !!this.activity && !this.service;
  }

  onCardClick(event: Event): void {
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) {
      event.preventDefault();
      event.stopPropagation();
      this.isOverlayVisible = !this.isOverlayVisible;
    }
  }

  onRequestQuote() {
    const data = this.service || this.activity;
    if (data) {
      this.requestQuote.emit(data);
    }
  }
}
