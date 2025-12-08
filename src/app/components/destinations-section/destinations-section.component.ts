import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="destinations" class="py-16 md:py-24 bg-[#F5F4F0] text-[#1c1c1c]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="text-3xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
            {{ languageService.currentTranslations.section2Title }}
          </h2>
          <div class="w-[1px] h-10 bg-[#1c1c1c]/20 mx-auto mb-6"></div>

          <p class="text-lg text-[#57534e] font-light max-w-2xl mx-auto leading-relaxed italic font-serif">
            {{ languageService.currentTranslations.section2Text }}
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div class="animate-fade-in-left delay-200 order-2 lg:order-1">
            <div class="space-y-0 border-t border-[#1c1c1c]/10">

              <div *ngFor="let destination of languageService.currentTranslations.destinations; let i = index"
                   class="group py-5 border-b border-[#1c1c1c]/10 cursor-pointer transition-all duration-500 hover:pl-4"
                   [style.animation-delay]="(300 + i * 100) + 'ms'">

                <div class="flex justify-between items-baseline mb-1">
                  <h4 class="text-xl font-serif text-[#1c1c1c] group-hover:italic transition-all">
                    {{ destination.name }}
                  </h4>
                  <span class="text-[10px] uppercase tracking-widest text-[#a8a29e] opacity-0 group-hover:opacity-100 transition-opacity duration-500">Découvrir</span>
                </div>

                <p class="text-[#57534e] font-light leading-snug text-sm">
                  {{ destination.description }}
                </p>

              </div>
            </div>

            <div class="mt-8 animate-fade-in-up delay-500">
              <button (click)="goToDestinations()"
                      class="px-8 py-3 border border-[#1c1c1c] text-[#1c1c1c] text-xs uppercase tracking-[0.2em] hover:bg-[#1c1c1c] hover:text-white transition-all duration-500">
                {{ languageService.currentTranslations.viewAllDestinations }}
              </button>
            </div>
          </div>

          <div class="animate-fade-in-right delay-400 order-1 lg:order-2">
            <div class="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5] h-full max-h-[500px]">
              <img
                src="assets/images/photo_off/espace_killy.jpg"
                alt="Montagne enneigée"
                class="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105">
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class DestinationsSectionComponent {
  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  goToDestinations() {
    this.router.navigate(['/destinations']);
  }
}
