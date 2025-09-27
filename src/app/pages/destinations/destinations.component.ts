// destinations.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';
import { FooterComponent, FooterConfig } from '../../components/footer/footer.component';
import { Subscription } from 'rxjs';


interface Destination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  location: string;
  image: string;
  altitude: string;
  skiArea: string;
  highlights: string[];
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterModule,FooterComponent],

  template: `
    <!-- Page Destinations -->
    <div class="min-h-screen bg-white">

      <!-- Hero Section -->
      <section class="relative h-[70vh] overflow-hidden">
        <div class="absolute inset-0">
          <img
            src="assets/images/pas libre de droit/espace_killy_2.jpg"
            alt="Montagnes enneigées"
            class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <div class="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div class="max-w-4xl mx-auto animate-fade-in-up">
            <h1 class="text-5xl md:text-7xl font-light mb-6 tracking-wide">
              {{ languageService.currentTranslations.section2Title || 'Nos Destinations' }}
            </h1>
            <div class="decorative-line bg-white"></div>
            <p class="text-xl md:text-2xl font-light mt-8 leading-relaxed opacity-90 max-w-3xl mx-auto">
              {{ languageService.currentTranslations.section2Text || "Des stations d\'exception au cœur des Alpes" }}
            </p>
          </div>
        </div>
      </section>

      <!-- Destinations Grid -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">

          <!-- Introduction -->
          <div class="text-center mb-16 animate-fade-in-up">
            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {{ languageService.currentTranslations.destinationsIntro }}
            </p>
          </div>

          <!-- Destinations Cards -->
          <div class="space-y-24">
            <div *ngFor="let destination of destinations; let i = index"
                 class="destination-card"
                 [class.reverse]="i % 2 === 1">

              <!-- Image -->
              <div class="destination-image animate-fade-in-left"
                   [class.animate-fade-in-right]="i % 2 === 1">
                <div class="enhanced-image">
                  <img
                    [src]="destination.image"
                    [alt]="destination.name"
                    class="w-full h-96 lg:h-[500px] object-cover shadow-xl">
                </div>
              </div>

              <!-- Content -->
              <div class="destination-content animate-fade-in-right"
                   [class.animate-fade-in-left]="i % 2 === 1">

                <!-- Header -->
                <div class="mb-8">
                  <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">
                    {{ destination.location }}
                  </div>
                  <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                    {{ destination.name }}
                  </h2>
                  <p class="text-xl text-gray-600 font-light">
                    {{ destination.subtitle }}
                  </p>
                </div>

                <!-- Description -->
                <div class="prose prose-lg text-gray-600 mb-8">
                  <p class="leading-relaxed">{{ destination.description }}</p>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-6 mb-8">
                  <div class="stat-item">
                    <div class="text-sm uppercase tracking-wide text-gray-500 mb-1">
                      {{ languageService.currentTranslations.altitudeLabel }}
                    </div>
                    <div class="text-lg font-semibold text-gray-900">
                      {{ destination.altitude }}
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="text-sm uppercase tracking-wide text-gray-500 mb-1">
                      {{ languageService.currentTranslations.skiAreaLabel }}
                    </div>
                    <div class="text-lg font-semibold text-gray-900">
                      {{ destination.skiArea }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

    <app-footer [showAdditionalInfo]="true"></app-footer>


    </div>
  `,
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit, OnDestroy {
  private languageSubscription!: Subscription;

  footerConfig: FooterConfig = {
    title: undefined, // Utilise le titre par défaut
    subtitle: undefined, // Utilise le sous-titre par défaut
    buttonText: undefined // Utilise le texte par défaut
  };

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // S'abonner aux changements de langue
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      // Forcer la mise à jour des destinations
      this.updateDestinations();
    });

    // Initialiser les destinations
    this.updateDestinations();
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }


  goToContact() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  updateDestinations() {
    this.destinations = this.getDestinationsForLanguage();
  }

  private getDestinationsForLanguage(): Destination[] {
    const isFr = this.languageService.currentLanguage === 'fr';

    return [
      {
        id: 'courchevel',
        name: 'COURCHEVEL',
        subtitle: isFr ? 'L\'élégance à la française' : 'French elegance',
        location: 'Savoie, France',
        description: isFr
          ? 'Station mythique des Alpes françaises, Courchevel incarne le raffinement et l\'art de vivre à la montagne. Avec ses pistes parfaitement entretenues et ses établissements de prestige, elle offre une expérience ski haut de gamme incomparable.'
          : 'Legendary resort of the French Alps, Courchevel embodies refinement and the art of mountain living. With its perfectly groomed slopes and prestigious establishments, it offers an incomparable high-end ski experience.',
        image: 'assets/images/montagne_cover.jpg',
        altitude: '1 850m - 3 230m',
        skiArea: isFr ? '150 km de pistes' : '150 km of slopes',
        highlights: isFr ? [
          'Restaurants étoilés Michelin',
          'Boutiques de luxe',
          'Héliski accessible',
          'Spas et bien-être',
          'Architecture alpine authentique'
        ] : [
          'Michelin-starred restaurants',
          'Luxury boutiques',
          'Accessible heliskiing',
          'Spas and wellness',
          'Authentic Alpine architecture'
        ]
      },
      {
        id: 'les-3-vallees',
        name: 'LES 3 VALLÉES',
        subtitle: isFr ? 'Le plus grand domaine skiable du monde' : 'The world\'s largest ski area',
        location: 'Savoie, France',
        description: isFr
          ? 'Avec 600 kilomètres de pistes reliées, Les 3 Vallées offrent un terrain de jeu infini aux amoureux de glisse. De Courchevel à Val Thorens en passant par Méribel, chaque vallée a sa personnalité unique.'
          : 'With 600 kilometers of connected slopes, Les 3 Vallées offers an infinite playground for ski lovers. From Courchevel to Val Thorens via Méribel, each valley has its unique personality.',
        image: 'assets/images/photo_off/espace_killy.jpg',
        altitude: '1 300m - 3 230m',
        skiArea: isFr ? '600 km de pistes' : '600 km of slopes',
        highlights: isFr ? [
          '8 stations interconnectées',
          'Glacier accessible toute l\'année',
          'Snowparks de renommée mondiale',
          'Restaurants d\'altitude exceptionnels',
          'Ski de printemps jusqu\'en mai'
        ] : [
          '8 interconnected resorts',
          'Year-round glacier access',
          'World-renowned snow parks',
          'Exceptional mountain restaurants',
          'Spring skiing until May'
        ]
      },
      {
        id: 'espace-killy',
        name: 'ESPACE KILLY',
        subtitle: isFr ? 'Le royaume du ski sportif' : 'The kingdom of sport skiing',
        location: 'Savoie, France',
        description: isFr
          ? 'Val d\'Isère et Tignes forment l\'Espace Killy, un domaine légendaire qui a vu naître les plus grands champions. Entre tradition savoyarde et modernité, ces stations offrent des paysages à couper le souffle.'
          : 'Val d\'Isère and Tignes form the Espace Killy, a legendary domain that has seen the birth of the greatest champions. Between Savoyard tradition and modernity, these resorts offer breathtaking landscapes.',
        image: 'assets/images/photo_off/espace_killy.jpg',
        altitude: '1 550m - 3 456m',
        skiArea: isFr ? '300 km de pistes' : '300 km of slopes',
        highlights: isFr ? [
          'Glacier de la Grande Motte',
          'Ski d\'été possible',
          'Pistes olympiques',
          'Freeride exceptionnel',
          'Vie nocturne animée'
        ] : [
          'Grande Motte Glacier',
          'Summer skiing possible',
          'Olympic slopes',
          'Exceptional freeride',
          'Lively nightlife'
        ]
      }
    ];
  }

  destinations: Destination[] = [];
}
