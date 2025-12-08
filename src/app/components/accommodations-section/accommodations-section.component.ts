import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-accommodations-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 bg-white text-[#1c1c1c]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <div class="text-center mb-24 animate-fade-in-up">
           <span class="text-xs uppercase tracking-[0.2em] text-[#a8a29e] mb-4 block">
             Art de vivre
           </span>
          <h2 class="text-4xl md:text-6xl font-serif text-[#1c1c1c] mb-6">
            {{ languageService.currentTranslations.section4Title }}
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-20 items-center">

          <div class="animate-fade-in-left delay-200">
            <div class="prose prose-lg text-[#57534e] font-light leading-loose space-y-8">

              <div class="animate-fade-in-up delay-300 border-l border-[#1c1c1c]/20 pl-6">
                <p class="text-xl italic font-serif text-[#1c1c1c]">
                  {{ languageService.currentTranslations.section4Text1 }}
                </p>
              </div>

              <div class="animate-fade-in-up delay-400">
                <p>{{ languageService.currentTranslations.section4Text2 }}</p>
              </div>

              <div class="animate-fade-in-up delay-500">
                <p>{{ languageService.currentTranslations.section4Text3 }}</p>
              </div>

              <div class="animate-fade-in-up delay-600 pt-8">
                <p class="text-2xl font-serif italic text-[#1c1c1c]">
                  {{ languageService.currentTranslations.section4Cta }}
                </p>
              </div>
            </div>
          </div>

          <div class="animate-fade-in-right delay-400">
            <div class="relative overflow-hidden aspect-square md:aspect-[4/5]">
              <img
                src="assets/images/photo_off/lac_montagne.jpg"
                alt="Vue générale de Courchevel"
                class="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105 filter saturate-50 hover:saturate-100">
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
