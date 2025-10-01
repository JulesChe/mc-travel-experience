import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { FooterComponent, FooterConfig } from '../../components/footer/footer.component';

interface Accommodation {
  id: string;
  type: 'chalet' | 'hotel' | 'apartment';
  name: string;
  location: string;
  image: string;
  stats: {
    capacity?: string;
    surface?: string;
    rooms?: string;
    bathrooms?: string;
    features?: string[];
  };
  priceRange: string;
  highlights: string[];
}

@Component({
  selector: 'app-accommodations',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <!-- Page Hébergements -->
    <div class="min-h-screen bg-white">
      
      <!-- Hero Section -->
      <section class="relative h-[80vh] overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="assets/images/pas libre de droit/espace_killy_2.jpg"
          alt="Chalets et hôtels de luxe en montagne"
          class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div class="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div class="max-w-5xl mx-auto animate-fade-in-up">
          
          <!-- Badge -->
          <div class="mb-6">
            <span class="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm uppercase tracking-wide border border-white/20">
              {{ languageService.currentTranslations.accommodationsTypes || 'Hébergements Premium' }}
            </span>
          </div>
          
          <!-- Titre principal -->
          <h1 class="text-5xl md:text-7xl font-light mb-6 tracking-wide">
            {{ languageService.currentTranslations.hebergementsTitle || "Séjours d'Exception en Montagne" }}
          </h1>
          
          <div class="decorative-line bg-white"></div>
          
          <!-- Texte client intégré -->
          <div class="mt-8 space-y-4 text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-4xl mx-auto">
            <p>{{ languageService.currentTranslations.hebergementsText1 || "MCTE est spécialisée dans la sélection et la promotion de chalets privés et hôtels haut de gamme au cœur des plus belles stations alpines." }}</p>
            
            <p>{{ languageService.currentTranslations.hebergementsText2 || "Nous vous proposons des hébergements d'exception, alliant luxe, confort et authenticité, avec une offre de services personnalisés : chef privé, concierge, transferts premium, activités sur mesure…" }}</p>
            
            <p>{{ languageService.currentTranslations.hebergementsText3 || "Que ce soit pour des vacances en famille, une escapade romantique ou un séjour d'entreprise, nous créons des expériences uniques à la montagne, pensées dans les moindres détails." }}</p>
            
            <p class="text-xl md:text-2xl font-medium mt-6 text-[#fff0cf]">
              {{ languageService.currentTranslations.hebergementsText4 || 'Votre évasion commence ici.' }}
            </p>
          </div>
          
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div class="flex flex-col items-center space-y-2">
          <span class="text-xs uppercase tracking-wide opacity-80">
            {{ languageService.currentTranslations.discoverScroll || 'Découvrir' }}
          </span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

      <!-- Types d'hébergements Section -->
      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Section Header -->
          <div class="text-center mb-20 animate-fade-in-up">
            <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {{ languageService.currentTranslations.accommodationsTypes || "Nos Types d\'Hébergements" }}
            </h2>
            <div class="decorative-line"></div>
          </div>

          <!-- Chalets Section -->
          <div class="mb-32">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
              
              <!-- Image -->
              <div class="animate-fade-in-left">
                <div class="enhanced-image">
                  <img 
                    src="assets/images/photo_off/chalet.jpg"
                    alt="Chalet de luxe"
                    class="w-full h-96 lg:h-[500px] object-cover shadow-xl">
                </div>
              </div>

              <!-- Content -->
              <div class="animate-fade-in-right">
                <div class="mb-8">
                  <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">
                    {{ languageService.currentLanguage === 'fr' ? 'Hébergement Premium' : 'Premium Accommodation' }}
                  </div>
                  <h3 class="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                    {{ languageService.currentTranslations.chalets.title || 'Chalets Privés de Luxe' }}
                  </h3>
                  <p class="text-xl text-gray-600 font-light">
                    {{ languageService.currentTranslations.chalets.subtitle || "L\'authenticité alpine revisitée" }}
                  </p>
                </div>

                <div class="prose prose-lg text-gray-600 mb-8">
                  <p class="leading-relaxed">
                    {{ languageService.currentTranslations.chalets.description || "Nos chalets privés incarnent l\'art de vivre à la montagne..." }}
                  </p>
                </div>

                <!-- Features -->
                <div class="space-y-4">
                  <div *ngFor="let feature of getChaletFeatures(); let i = index" 
                       class="flex items-start space-x-3"
                       [style.animation-delay.ms]="i * 100">
                    <svg class="w-5 h-5 text-[#151c32] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-gray-700">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hotels Section -->
          <div class="mb-32">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
              
              <!-- Content (ordre inversé) -->
              <div class="order-2 lg:order-1 animate-fade-in-left">
                <div class="mb-8">
                  <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">
                    {{ languageService.currentLanguage === 'fr' ? 'Hôtellerie de Prestige' : 'Luxury Hospitality' }}
                  </div>
                  <h3 class="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                    {{ languageService.currentTranslations.hotels.title || 'Hôtels & Palaces 5 Étoiles' }}
                  </h3>
                  <p class="text-xl text-gray-600 font-light">
                    {{ languageService.currentTranslations.hotels.subtitle || 'Le raffinement à son apogée' }}
                  </p>
                </div>

                <div class="prose prose-lg text-gray-600 mb-8">
                  <p class="leading-relaxed">
                    {{ languageService.currentTranslations.hotels.description || 'Partenaires des plus prestigieux établissements alpins...' }}
                  </p>
                </div>

                <!-- Features -->
                <div class="space-y-4">
                  <div *ngFor="let feature of getHotelFeatures(); let i = index" 
                       class="flex items-start space-x-3"
                       [style.animation-delay.ms]="i * 100">
                    <svg class="w-5 h-5 text-[#151c32] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-gray-700">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Image -->
              <div class="order-1 lg:order-2 animate-fade-in-right">
                <div class="enhanced-image">
                  <img 
                    src="assets/images/photo_off/solaise_hiver.png"
                    alt="Hôtel de luxe en montagne"
                    class="w-full h-96 lg:h-[500px] object-cover shadow-xl">
                </div>
              </div>
            </div>
          </div>



        </div>
      </section>


      <!-- Footer avec CTA personnalisé -->
      <app-footer [config]="footerConfig" [showAdditionalInfo]="true"></app-footer>

    </div>
  `,
})
export class HebergementsComponent implements OnInit {
  
  // Initialisation par défaut sans utiliser le service
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
    
    // Initialiser le footer config après l'injection du service
    this.updateFooterConfig();
    
    // Mise à jour du footer config quand la langue change
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateFooterConfig();
    });
  }

  private updateFooterConfig(): void {
    this.footerConfig = {
      title: this.languageService.currentTranslations.accommodationsCTA?.title,
      subtitle: this.languageService.currentTranslations.accommodationsCTA?.subtitle,
      buttonText: this.languageService.currentTranslations.accommodationsCTA?.button,
      customAction: () => this.goToContact()
    };
  }

  getChaletFeatures(): string[] {
    return this.languageService.currentTranslations.chalets?.features || [
      'Architecture authentique et matériaux nobles',
      'Service de conciergerie privé 24h/7j',
      'Chef privé et personnel de maison disponible',
      'Spa privatif avec sauna et jacuzzi',
      'Cave à vins et espaces de réception',
      'Accès ski-in/ski-out pour certaines propriétés'
    ];
  }

  getHotelFeatures(): string[] {
    return this.languageService.currentTranslations.hotels?.features || [
      'Suites et chambres avec vue panoramique',
      'Spas de renommée mondiale',
      'Restaurants gastronomiques étoilés',
      'Service voiturier et conciergerie',
      'Piscines intérieures et extérieures chauffées',
      'Salons privés et espaces VIP'
    ];
  }


  getServicesIncluded(): Array<{name: string, description: string}> {
    return this.languageService.currentTranslations.accommodationServices?.list || [
      {
        name: 'Transferts Premium',
        description: 'Navettes privées, véhicules de luxe ou hélicoptère selon vos préférences'
      },
      {
        name: 'Conciergerie Dédiée',
        description: 'Une équipe à votre service pour organiser chaque détail de votre séjour'
      },
      {
        name: 'Restauration sur Mesure',
        description: 'Chef privé, livraisons gastronomiques ou réservations dans les meilleurs restaurants'
      },
      {
        name: 'Activités Exclusives',
        description: 'Ski privé, wellness, excursions et expériences uniques'
      },
      {
        name: 'Services Quotidiens',
        description: 'Ménage, linge, maintenance et assistance technique'
      },
      {
        name: 'Équipements de Ski',
        description: 'Location et livraison de matériel haut de gamme directement sur site'
      }
    ];
  }

  getServiceIcon(index: number): string {
    const icons = [
      // Transferts Premium - Icône voiture/transport
      'M8 12h8l2 2v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-6l2-2zm2-8a3 3 0 013 3v1h2a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h2V7a3 3 0 013-3z',
      // Conciergerie - Icône service/personne
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      // Restauration - Icône restaurant/chef
      'M3 3h18l-2 13H5L3 3zm0 0l-.5-2M7 13h10l1.5-9H5.5L7 13z',
      // Activités - Icône montagne/ski
      'M5.636 18.364L12 12l6.364 6.364M12 12L5.636 5.636M12 12l6.364-6.364',
      // Services quotidiens - Icône maison/services
      'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zM9 12l2 2 4-4',
      // Équipements ski - Icône équipement/ski
      'M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    ];
    return icons[index] || icons[0];
  }

  goToContact(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    });
  }
}