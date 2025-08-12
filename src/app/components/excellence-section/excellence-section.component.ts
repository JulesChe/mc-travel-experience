import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-excellence-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="excellence" class="py-24 bg-white relative overflow-hidden">
      
      <!-- Éléments décoratifs de fond -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-48 translate-x-48 opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-yellow-50 to-transparent rounded-full translate-y-36 -translate-x-36 opacity-50"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- En-tête de section -->
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            {{ languageService.currentTranslations.section1Title }}
          </h2>
          <div class="decorative-line"></div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Photo avec effets -->
          <div class="order-2 lg:order-1 animate-fade-in-left delay-200">
            <div class="enhanced-image relative group">
              <img 
                src="assets/images/photo_mc.JPG"
                alt="Fondateur MC Travel"
                class="w-full h-96 object-cover shadow-2xl">
              
              <!-- Effet de lueur -->
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          
          <!-- Contenu texte amélioré -->
          <div class="order-1 lg:order-2 animate-fade-in-right delay-300">
            
            
            <!-- Texte principal avec animations échelonnées -->
            <div class="prose prose-lg text-gray-600 leading-relaxed space-y-6">
              <div class="animate-slide-in-scale delay-400">
                <p class="text-lg">{{ languageService.currentTranslations.section1Text1 }}</p>
              </div>
              <div class="animate-slide-in-scale delay-500">
                <p class="text-lg">{{ languageService.currentTranslations.section1Text2 }}</p>
              </div>
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