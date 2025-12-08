import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-excellence-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="excellence" class="py-32 bg-white relative">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        <div class="text-center mb-24 animate-fade-in-up">
          <span class="text-xs uppercase tracking-[0.2em] text-[#a8a29e] mb-4 block">Since 2003</span>
          <h2 class="text-4xl md:text-6xl font-serif text-[#1c1c1c] mb-8">
            {{ languageService.currentTranslations.section1Title }}
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-20 items-center">

          <div class="order-2 lg:order-1 animate-fade-in-left delay-200">
            <div class="relative overflow-hidden">
               <img
                src="assets/images/photo_mc.JPG"
                alt="Fondateur MC Travel"
                class="w-full h-[600px] object-cover hover:grayscale-0 transition-all duration-[1.5s] ease-out">
            </div>
            <div class="mt-4 text-xs uppercase tracking-widest text-[#a8a29e] text-right">
              Morgan & Charlotte - Founders
            </div>
          </div>

          <div class="order-1 lg:order-2 animate-fade-in-right delay-300">
            <div class="flex items-center gap-4 mb-10">
               <span class="w-16 h-[1px] bg-[#1c1c1c]"></span>
               <span class="text-sm uppercase tracking-widest text-[#1c1c1c]">Notre Philosophie</span>
            </div>

            <div class="space-y-8 text-[#57534e] font-light text-lg leading-loose">
              <p class="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#1c1c1c]">
                {{ languageService.currentTranslations.section1Text1 }}
              </p>
              <p>
                {{ languageService.currentTranslations.section1Text2 }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ExcellenceSectionComponent {
  constructor(public languageService: LanguageService) {}
}
