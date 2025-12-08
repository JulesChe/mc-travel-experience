// pages/hebergements/hebergements.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { FooterComponent, FooterConfig } from '../../components/footer/footer.component';

@Component({
  selector: 'app-accommodations',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="min-h-screen bg-[#F5F4F0] text-[#1c1c1c]">

      <section class="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        <div class="absolute inset-0">
          <img
            src="assets/images/pas libre de droit/espace_killy_2.jpg"
            alt="Chalets et hôtels de luxe"
            class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/20"></div>
        </div>

        <div class="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
          <span class="block text-white/90 uppercase tracking-[0.3em] text-xs md:text-sm mb-6">
             {{ languageService.currentTranslations.accommodationsTypes || 'Collection Alpine' }}
          </span>
          <h1 class="text-5xl md:text-7xl font-serif text-white italic tracking-wide mb-8">
            {{ languageService.currentTranslations.hebergementsTitle || "Séjours d'Exception" }}
          </h1>
          <div class="w-[1px] h-16 bg-white/60 mx-auto mb-8"></div>

          <p class="text-lg md:text-xl font-light text-stone-100 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            {{ languageService.currentTranslations.hebergementsText1 || "Une sélection exclusive de chalets privés et d'hôtels iconiques au cœur des Alpes." }}
          </p>
        </div>
      </section>

      <section class="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">

        <div class="text-center mb-32 animate-fade-in-up">
          <p class="text-xs uppercase tracking-[0.2em] text-[#a8a29e] mb-4">
            {{ languageService.currentLanguage === 'fr' ? "L\'Art de recevoir" : 'The Art of Hospitality' }}
          </p>
          <h2 class="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
            {{ languageService.currentTranslations.accommodationsTypes || "Nos Types d'Hébergements" }}
          </h2>
        </div>

        <div class="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-40 items-center">

          <div class="w-full lg:w-1/2 animate-fade-in-left">
            <div class="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden">
              <img
                src="assets/images/photo_off/chalet.jpg"
                alt="Chalet Luxe"
                class="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105">
            </div>
          </div>

          <div class="w-full lg:w-1/2 animate-fade-in-right">
            <div class="flex items-center gap-4 mb-6">
              <span class="w-12 h-[1px] bg-[#1c1c1c]"></span>
              <span class="text-xs uppercase tracking-[0.2em] text-[#57534e]">
                {{ languageService.currentLanguage === 'fr' ? 'Intimité & Espace' : 'Privacy & Space' }}
              </span>
            </div>

            <h3 class="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
              {{ languageService.currentTranslations.chalets.title || 'Chalets Privés' }}
            </h3>

            <p class="text-xl text-[#57534e] font-serif italic mb-8">
              {{ languageService.currentTranslations.chalets.subtitle || "L'authenticité alpine revisitée" }}
            </p>

            <div class="prose prose-stone text-[#57534e] font-light leading-loose mb-12">
              <p>
                {{ languageService.currentTranslations.chalets.description || "Nos chalets incarnent l'art de vivre à la montagne..." }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-t border-[#1c1c1c]/10 pt-8">
              <div *ngFor="let feature of getChaletFeatures(); let i = index"
                   class="flex items-start gap-3 group"
                   [style.animation-delay.ms]="i * 100">
                <span class="mt-2 w-1.5 h-1.5 bg-[#a8a29e] rounded-full group-hover:bg-[#1c1c1c] transition-colors"></span>
                <span class="text-sm uppercase tracking-wide text-[#57534e] group-hover:text-[#1c1c1c] transition-colors">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-center">

          <div class="w-full lg:w-1/2 animate-fade-in-right">
            <div class="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden">
              <img
                src="assets/images/photo_off/solaise_hiver.png"
                alt="Hôtel Luxe"
                class="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105">
            </div>
          </div>

          <div class="w-full lg:w-1/2 animate-fade-in-left">
            <div class="flex items-center gap-4 mb-6">
              <span class="w-12 h-[1px] bg-[#1c1c1c]"></span>
              <span class="text-xs uppercase tracking-[0.2em] text-[#57534e]">
                {{ languageService.currentLanguage === 'fr' ? 'Service & Excellence' : 'Service & Excellence' }}
              </span>
            </div>

            <h3 class="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
              {{ languageService.currentTranslations.hotels.title || 'Hôtels 5 Étoiles' }}
            </h3>

            <p class="text-xl text-[#57534e] font-serif italic mb-8">
              {{ languageService.currentTranslations.hotels.subtitle || "Le raffinement à son apogée" }}
            </p>

            <div class="prose prose-stone text-[#57534e] font-light leading-loose mb-12">
              <p>
                {{ languageService.currentTranslations.hotels.description || "Partenaires des plus prestigieux établissements..." }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-t border-[#1c1c1c]/10 pt-8">
              <div *ngFor="let feature of getHotelFeatures(); let i = index"
                   class="flex items-start gap-3 group"
                   [style.animation-delay.ms]="i * 100">
                <span class="mt-2 w-1.5 h-1.5 bg-[#a8a29e] rounded-full group-hover:bg-[#1c1c1c] transition-colors"></span>
                <span class="text-sm uppercase tracking-wide text-[#57534e] group-hover:text-[#1c1c1c] transition-colors">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <app-footer [config]="footerConfig" [showAdditionalInfo]="true"></app-footer>

    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; transform: translateY(30px); }
    .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; opacity: 0; transform: translateX(-30px); }
    .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; opacity: 0; transform: translateX(30px); }

    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInLeft { to { opacity: 1; transform: translateX(0); } }
    @keyframes fadeInRight { to { opacity: 1; transform: translateX(0); } }
  `]
})
export class HebergementsComponent implements OnInit {

  footerConfig: FooterConfig = {
    title: undefined,
    subtitle: undefined,
    buttonText: undefined
  };

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.updateFooterConfig();
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateFooterConfig();
    });
  }

  private updateFooterConfig(): void {
    const ctaTitle = this.languageService.currentTranslations.accommodationsCTA?.title;
    const ctaSubtitle = this.languageService.currentTranslations.accommodationsCTA?.subtitle;

    this.footerConfig = {
      title: ctaTitle,
      subtitle: ctaSubtitle,
      buttonText: this.languageService.currentTranslations.accommodationsCTA?.button,
      customAction: () => this.goToContact()
    };
  }

  getChaletFeatures(): string[] {
    // CORRECTION : Suppression du '?' car TypeScript dit que chalets existe obligatoirement
    const features = this.languageService.currentTranslations.chalets.features;
    return features && features.length > 0 ? features : [
      'Architecture authentique',
      'Service conciergerie 24/7',
      'Chef privé disponible',
      'Spa & Bien-être privatif',
      'Cave à vins & Réception',
      'Accès ski-in/ski-out'
    ];
  }

  getHotelFeatures(): string[] {
    // CORRECTION : Suppression du '?'
    const features = this.languageService.currentTranslations.hotels.features;
    return features && features.length > 0 ? features : [
      'Suites Vue Panoramique',
      'Spas de renommée mondiale',
      'Gastronomie étoilée',
      'Service voiturier',
      'Piscines chauffées',
      'Salons VIP'
    ];
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
}
