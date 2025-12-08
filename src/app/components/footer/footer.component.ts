// components/footer/footer.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

export interface FooterConfig {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  customAction?: () => void;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  // Je retire styleUrls pour éviter tout conflit avec l'ancien fichier SCSS
  template: `
    <footer class="bg-[#1c1c1c] text-stone-300 pt-24 pb-12 font-light">

      <div class="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div class="flex flex-col items-center text-center border-b border-white/10 pb-20">

          <span class="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
            {{ languageService.currentLanguage === 'fr' ? "Commencer l'expérience" : 'Start the experience' }}
          </span>

          <h3 class="text-4xl md:text-5xl font-serif !text-white mb-6 italic">
            {{ displayTitle }}
          </h3>

          <p class="text-lg text-stone-300 max-w-2xl mb-10 font-light leading-relaxed">
            {{ displaySubtitle }}
          </p>

          <button
            (click)="handleButtonClick()"
            class="group relative px-8 py-3 overflow-hidden border border-white/20 text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black">
            <span class="relative z-10 text-sm uppercase tracking-widest transition-colors duration-500">
              {{ displayButtonText }}
            </span>
          </button>
        </div>
      </div>

      <div *ngIf="showAdditionalInfo" class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20">

          <div class="space-y-6">
            <h4 class="!text-white font-serif text-xl italic mb-6">
              {{ languageService.currentTranslations.footerContact || 'Contact' }}
            </h4>
            <div class="space-y-4 text-sm tracking-wide text-stone-400">
              <p class="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <span class="w-1 h-1 bg-stone-500 rounded-full"></span>
                Charlotte : +33 6 03 31 67 62
              </p>
              <p class="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <span class="w-1 h-1 bg-stone-500 rounded-full"></span>
                Morgan : +33 6 20 52 47 96
              </p>
              <p class="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <span class="w-1 h-1 bg-stone-500 rounded-full"></span>
                mc.travel73&#64;gmail.com
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="!text-white font-serif text-xl italic mb-6">
              {{ languageService.currentTranslations.footerLinks || 'Navigation' }}
            </h4>
            <div class="flex flex-col space-y-3 text-sm tracking-wide text-stone-400">
              <a (click)="navigateTo('/destinations')"
                 class="cursor-pointer hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                {{ languageService.currentTranslations.menuDestinations || 'Destinations' }}
              </a>
              <a (click)="navigateTo('/conciergerie')"
                 class="cursor-pointer hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                {{ languageService.currentTranslations.menuConciergerie || 'Conciergerie' }}
              </a>
              <a (click)="navigateTo('/properties')"
                 class="cursor-pointer hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                {{ languageService.currentTranslations.menuProperties || 'Propriétés' }}
              </a>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="!text-white font-serif text-xl italic mb-6">
              {{ languageService.currentTranslations.footerFollow || 'Social' }}
            </h4>
            <div class="flex gap-6">
              <a href="#" class="text-stone-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <span class="sr-only">Instagram</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
              </a>
              <a href="#" class="text-stone-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <span class="sr-only">Facebook</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-white/5 pt-8">
        <div class="max-w-7xl mx-auto px-6 text-center text-xs text-stone-500 tracking-wide uppercase">
          <p>© {{ currentYear }} MCTE Travel Agency. {{ languageService.currentTranslations.footerRights || 'Tous droits réservés.' }}</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  @Input() config?: FooterConfig;
  @Input() showAdditionalInfo: boolean = false;

  currentYear = new Date().getFullYear();

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  get displayTitle(): string {
    if (this.config?.title) return this.config.title;
    return this.languageService.currentTranslations.footerCTATitle;
  }

  get displaySubtitle(): string {
    if (this.config?.subtitle) return this.config.subtitle;
    return this.languageService.currentTranslations.footerCTASubtitle;
  }

  get displayButtonText(): string {
    if (this.config?.buttonText) return this.config.buttonText;
    return this.languageService.currentTranslations.menuContact || 'Nous contacter';
  }

  handleButtonClick(): void {
    if (this.config?.customAction) {
      this.config.customAction();
    } else {
      this.goToContact();
    }
  }

  goToContact(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
