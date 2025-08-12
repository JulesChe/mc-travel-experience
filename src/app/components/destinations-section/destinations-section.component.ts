import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-destinations-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="destinations" class="py-24 bg-[#fff0cf]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- En-tête de section -->
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {{ languageService.currentTranslations.section2Title }}
          </h2>
          <div class="decorative-line"></div>
          <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
            {{ languageService.currentTranslations.section2Text }}
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Destinations épurées -->
          <div class="animate-fade-in-left delay-200">
            <div class="space-y-6">
              <div *ngFor="let destination of languageService.currentTranslations.destinations; let i = index" 
                   class="simple-card p-6 animate-fade-in-up"
                   [style.animation-delay]="(300 + i * 100) + 'ms'">
                   
                <h4 class="text-xl font-semibold text-gray-900 mb-3">{{ destination.name }}</h4>
                <p class="text-gray-600 leading-relaxed mb-4">{{ destination.description }}</p>
                
              </div>
            </div>
            
            <!-- Call-to-action simple -->
            <div class="mt-8 animate-fade-in-up delay-500">
              <button class="btn-primary w-full">
                {{ languageService.currentTranslations.viewAllDestinations }}
              </button>
            </div>
          </div>
          
          <!-- Image simple -->
          <div class="animate-fade-in-right delay-400">
            <div class="enhanced-image">
              <img 
                src="assets/images/pas libre de droit/espace_killy_2.jpg"
                alt="Montagne enneigée"
                class="w-full h-96 object-cover shadow-xl">
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DestinationsSectionComponent {
  constructor(public languageService: LanguageService) {}
}