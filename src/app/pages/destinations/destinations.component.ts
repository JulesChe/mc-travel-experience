import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';

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
  imports: [CommonModule, RouterModule],
  
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
              {{ languageService.currentTranslations.section2Title }}
            </h1>
            <div class="decorative-line bg-white"></div>
            <p class="text-xl md:text-2xl font-light mt-8 leading-relaxed opacity-90 max-w-3xl mx-auto">
              {{ languageService.currentTranslations.section2Text }}
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
              {{ destinationsIntro }}
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
                      {{ languageService.currentLanguage === 'fr' ? 'Altitude' : 'Altitude' }}
                    </div>
                    <div class="text-lg font-semibold text-gray-900">
                      {{ destination.altitude }}
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="text-sm uppercase tracking-wide text-gray-500 mb-1">
                      {{ languageService.currentLanguage === 'fr' ? 'Domaine skiable' : 'Ski Area' }}
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

      <!-- Call to Action -->
      <section class="py-20 bg-[#fff0cf]">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 class="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {{ languageService.currentLanguage === 'fr' ? 'Prêt pour votre prochaine aventure alpine ?' : 'Ready for your next alpine adventure?' }}
          </h3>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {{ languageService.currentLanguage === 'fr' ? 
                "Contactez nos experts pour créer votre séjour sur mesure dans l\'une de ces destinations d\'exception." :
                'Contact our experts to create your tailor-made stay in one of these exceptional destinations.' }}
          </p>
        <button (click)="goToContact()" class="btn-primary">
          {{ languageService.currentTranslations.menuContact }}
        </button>
        </div>
      </section>

    </div>
  `,
  styleUrls: ['./destinations.component.scss']
  })
export class DestinationsComponent {
  
  constructor(public languageService: LanguageService,
    private router: Router
  ) {}

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

  get destinationsIntro(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? "Découvrez nos destinations d'exception au cœur des Alpes françaises. Chaque station offre une expérience unique entre tradition alpine et luxe moderne."
      : "Discover our exceptional destinations in the heart of the French Alps. Each resort offers a unique experience between Alpine tradition and modern luxury.";
  }

  destinations: Destination[] = [
    {
      id: 'courchevel',
      name: 'COURCHEVEL',
      subtitle: 'L\'élégance à la française',
      location: 'Savoie, France',
      description: 'Station mythique des Alpes françaises, Courchevel incarne le raffinement et l\'art de vivre à la montagne. Avec ses pistes parfaitement entretenues et ses établissements de prestige, elle offre une expérience ski haut de gamme incomparable.',
      image: 'assets/images/montagne_cover.jpg',
      altitude: '1 850m - 3 230m',
      skiArea: '150 km de pistes',
      highlights: [
        'Restaurants étoilés Michelin',
        'Boutiques de luxe',
        'Héliski accessible',
        'Spas et bien-être',
        'Architecture alpine authentique'
      ]
    },
    {
      id: 'les-3-vallees',
      name: 'LES 3 VALLÉES',
      subtitle: 'Le plus grand domaine skiable du monde',
      location: 'Savoie, France',
      description: 'Avec 600 kilomètres de pistes reliées, Les 3 Vallées offrent un terrain de jeu infini aux amoureux de glisse. De Courchevel à Val Thorens en passant par Méribel, chaque vallée a sa personnalité unique.',
      image: 'assets/images/pas libre de droit/espace_killy_2.jpg',
      altitude: '1 300m - 3 230m',
      skiArea: '600 km de pistes',
      highlights: [
        '8 stations interconnectées',
        'Glacier accessible toute l\'année',
        'Snowparks de renommée mondiale',
        'Restaurants d\'altitude exceptionnels',
        'Ski de printemps jusqu\'en mai'
      ]
    },
    {
      id: 'espace-killy',
      name: 'ESPACE KILLY',
      subtitle: 'Le royaume du ski sportif',
      location: 'Savoie, France',
      description: 'Val d\'Isère et Tignes forment l\'Espace Killy, un domaine légendaire qui a vu naître les plus grands champions. Entre tradition savoyarde et modernité, ces stations offrent des paysages à couper le souffle.',
      image: 'assets/images/photo_mc.JPG',
      altitude: '1 550m - 3 456m',
      skiArea: '300 km de pistes',
      highlights: [
        'Glacier de la Grande Motte',
        'Ski d\'été possible',
        'Pistes olympiques',
        'Freeride exceptionnel',
        'Vie nocturne animée'
      ]
    }
  ];
}