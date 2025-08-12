import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-accommodations-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-[#fff0cf]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- En-tête de section -->
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {{ languageService.currentTranslations.section4Title }}
          </h2>
          <div class="decorative-line"></div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Contenu texte épuré -->
          <div class="animate-fade-in-left delay-200">
            <div class="prose prose-lg text-gray-600 leading-relaxed space-y-6">
              <div class="animate-fade-in-up delay-300">
                <p class="text-lg">{{ languageService.currentTranslations.section4Text1 }}</p>
              </div>
              <div class="animate-fade-in-up delay-400">
                <p class="text-lg">{{ languageService.currentTranslations.section4Text2 }}</p>
              </div>
              <div class="animate-fade-in-up delay-500">
                <p class="text-lg">{{ languageService.currentTranslations.section4Text3 }}</p>
              </div>
              
              <!-- Call-to-action mis en valeur -->
              <div class="animate-fade-in-up delay-600">
                <p class="text-xl font-medium text-[#151c32] mt-8">
                  {{ languageService.currentTranslations.section4Cta }}
                </p>
              </div>
            </div>
            

          </div>
          
          <!-- Image simple -->
          <div class="animate-fade-in-right delay-400">
            <div class="enhanced-image">
              <img 
                src="assets/images/montagne_cover.jpg"
                alt="Vue générale de Courchevel"
                class="w-full h-96 object-cover shadow-xl">
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AccommodationsSectionComponent {
  constructor(public languageService: LanguageService) {}
}