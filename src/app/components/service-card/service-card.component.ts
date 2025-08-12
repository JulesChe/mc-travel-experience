// components/service-card/service-card.component.ts
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
    <!-- Mode Service (layout horizontal) -->
    <div *ngIf="!isActivityMode" class="service-card" [class.reverse]="reverse">
      <!-- Image Section -->
      <div class="service-image" 
           [class.animate-fade-in-left]="!reverse"
           [class.animate-fade-in-right]="reverse">
        <div class="enhanced-image">
          <img 
            [src]="imageUrl"
            [alt]="service?.title || activity?.title"
            class="w-full h-80 lg:h-96 object-cover shadow-xl">
        </div>
      </div>

      <!-- Content Section -->
      <div class="service-content"
           [class.animate-fade-in-right]="!reverse"
           [class.animate-fade-in-left]="reverse">
        
        <!-- Header -->
        <div class="service-header">
          <h3 class="service-title">{{ service?.title || activity?.title }}</h3>
          <p class="service-subtitle">{{ service?.subtitle || activity?.subtitle }}</p>
        </div>

        <!-- Description -->
        <div class="service-description">
          <p>{{ service?.description || activity?.description }}</p>
        </div>

        <!-- Features (optionnel) -->
        <div *ngIf="service?.features?.length" class="service-features">
          <div *ngFor="let feature of service?.features; let i = index" 
               class="feature-item"
               [style.animation-delay.ms]="i * 100">
            <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
              <path [attr.d]="iconPath"></path>
            </svg>
            <span>{{ feature }}</span>
          </div>
        </div>

        <!-- CTA Button -->
        <div *ngIf="showCTA" class="service-cta">
          <button (click)="onRequestQuote()" class="btn-primary">
            {{ ctaText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mode Activity (layout carte) -->
    <div *ngIf="isActivityMode" class="activity-card-wrapper">
      <div class="activity-image-container">
        <img 
          [src]="activity!.image" 
          [alt]="activity!.title"
          class="activity-image">
        
        <!-- Hover Overlay -->
        <div class="activity-overlay">
          <div class="overlay-content">
            <p class="overlay-description">{{ activity!.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Content Section -->
      <div class="activity-content">
        <h3 class="activity-title">{{ activity!.title }}</h3>
        <p class="activity-subtitle">{{ activity!.subtitle }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input() service?: ServiceData;
  @Input() activity?: Activity;
  @Input() imageUrl?: string;
  @Input() reverse: boolean = false;
  @Input() ctaText: string = 'Demander un devis';
  @Input() showCTA: boolean = true;
  @Input() iconPath: string = 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z';
  
  @Output() requestQuote = new EventEmitter<ServiceData | Activity>();

  get isActivityMode(): boolean {
    return !!this.activity && !this.service;
  }

  onRequestQuote() {
    const data = this.service || this.activity;
    if (data) {
      this.requestQuote.emit(data);
      console.log('Demande de devis pour:', data.title);
    }
  }
}