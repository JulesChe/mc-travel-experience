import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Photo hélico/taxi -->
          <div>
            <img 
              src="assets/images/pas libre de droit/tsr-cmbh.jpg"
              alt="Hélicoptère et transferts de luxe"
              class="w-full h-96 object-cover rounded-lg shadow-xl">
          </div>
          
          <!-- Texte 3 -->
          <div>
            <h3 class="text-3xl font-light text-gray-900 mb-2">
               {{ languageService.currentTranslations.section3Title }}
            </h3>
            <h4 class="text-xl text-gray-600 mb-8">{{ languageService.currentTranslations.section3Subtitle }}</h4>
            
            <div class="space-y-6">
              <div *ngFor="let service of languageService.currentTranslations.services" 
                   class="border-l-4 border-[#151c32] pl-6">
                <h5 class="font-semibold text-gray-900 mb-2">{{ service.title }}</h5>
                <p class="text-gray-600">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServicesSectionComponent {
  constructor(public languageService: LanguageService) {}
}