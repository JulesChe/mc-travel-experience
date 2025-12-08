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
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="min-h-screen bg-[#F5F4F0] text-[#1c1c1c]">

      <section class="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <div class="absolute inset-0">
           <img
            src="assets/images/pas libre de droit/espace_killy_2.jpg"
            alt="Montagnes"
            class="w-full h-full object-cover">
           <div class="absolute inset-0 bg-black/30"></div>
        </div>

        <div class="relative z-10 text-center px-4 animate-fade-in-up">
          <span class="block text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-4">
             {{ languageService.currentLanguage === 'fr' ? 'Collection Alpine' : 'Alpine Collection' }}
          </span>
          <h1 class="text-5xl md:text-7xl font-serif text-white italic tracking-wide mb-8">
            {{ languageService.currentTranslations.section2Title || 'Nos Destinations' }}
          </h1>
          <div class="w-[1px] h-16 bg-white/50 mx-auto"></div>
        </div>
      </section>

      <section class="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">

        <div class="max-w-3xl mx-auto text-center mb-32 animate-fade-in-up delay-100">
           <p class="text-xl md:text-2xl font-light text-stone-600 leading-relaxed font-serif italic">
             {{ languageService.currentTranslations.destinationsIntro }}
           </p>
        </div>

        <div class="space-y-32 md:space-y-48">

          <div *ngFor="let destination of destinations; let i = index"
               class="group relative flex flex-col md:flex-row items-center gap-12 md:gap-24"
               [class.md:flex-row-reverse]="i % 2 !== 0">

            <div class="w-full md:w-1/2 overflow-hidden relative aspect-[4/5] md:aspect-[3/4]">
               <div class="absolute inset-0 bg-stone-200 animate-pulse" *ngIf="!destination.image"></div>
               <img
                 [src]="destination.image"
                 [alt]="destination.name"
                 class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">
            </div>

            <div class="w-full md:w-1/2 flex flex-col justify-center animate-fade-in-up">
               <div class="flex items-center gap-4 mb-6">
                 <span class="w-8 h-[1px] bg-stone-400"></span>
                 <span class="text-xs uppercase tracking-[0.2em] text-stone-500">{{ destination.location }}</span>
               </div>

               <h2 class="text-4xl md:text-6xl font-serif text-[#1c1c1c] mb-4">
                 {{ destination.name }}
               </h2>

               <p class="text-lg text-stone-500 font-serif italic mb-8">
                 {{ destination.subtitle }}
               </p>

               <div class="prose prose-stone prose-lg text-stone-600 font-light leading-loose mb-10">
                 <p>{{ destination.description }}</p>
               </div>

               <div class="grid grid-cols-2 gap-8 py-6 border-t border-b border-stone-300 mb-8">
                 <div>
                   <span class="block text-xs uppercase tracking-widest text-stone-400 mb-1">
                     {{ languageService.currentTranslations.altitudeLabel }}
                   </span>
                   <span class="font-serif text-xl">{{ destination.altitude }}</span>
                 </div>
                 <div>
                   <span class="block text-xs uppercase tracking-widest text-stone-400 mb-1">
                     {{ languageService.currentTranslations.skiAreaLabel }}
                   </span>
                   <span class="font-serif text-xl">{{ destination.skiArea }}</span>
                 </div>
               </div>

               <div class="flex flex-wrap gap-x-6 gap-y-2">
                 <span *ngFor="let highlight of destination.highlights"
                       class="text-sm text-stone-500 italic font-serif">
                   # {{ highlight }}
                 </span>
               </div>
            </div>

          </div>

        </div>

      </section>

      <app-footer [showAdditionalInfo]="true"></app-footer>
    </div>
  `,
  styles: [`
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }
    .delay-100 { animation-delay: 0.1s; }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class DestinationsComponent implements OnInit, OnDestroy {
  private languageSubscription!: Subscription;
  destinations: Destination[] = [];

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(() => {
      this.updateDestinations();
    });
    this.updateDestinations();
    // Scroll en haut au chargement
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  updateDestinations() {
    this.destinations = this.getDestinationsForLanguage();
  }

  // NOTE: Je garde ta logique de données intacte
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
        highlights: isFr ? ['Restaurants étoilés', 'Shopping de luxe', 'Héliski', 'Spas'] : ['Michelin Starred', 'Luxury Shopping', 'Heliski', 'Spas']
      },
      {
        id: 'les-3-vallees',
        name: 'LES 3 VALLÉES',
        subtitle: isFr ? 'Le plus grand domaine du monde' : 'The world\'s largest ski area',
        location: 'Savoie, France',
        description: isFr
          ? 'Avec 600 kilomètres de pistes reliées, Les 3 Vallées offrent un terrain de jeu infini aux amoureux de glisse. De Courchevel à Val Thorens en passant par Méribel, chaque vallée a sa personnalité unique.'
          : 'With 600 kilometers of connected slopes, Les 3 Vallées offers an infinite playground for ski lovers. From Courchevel to Val Thorens via Méribel, each valley has its unique personality.',
        image: 'assets/images/photo_off/espace_killy.jpg',
        altitude: '1 300m - 3 230m',
        skiArea: isFr ? '600 km de pistes' : '600 km of slopes',
        highlights: isFr ? ['8 stations', 'Glacier', 'Ski de printemps'] : ['8 resorts', 'Glacier', 'Spring Skiing']
      },
      {
        id: 'espace-killy',
        name: 'ESPACE KILLY',
        subtitle: isFr ? 'Le royaume du ski sportif' : 'The kingdom of sport skiing',
        location: 'Savoie, France',
        description: isFr
          ? 'Val d\'Isère et Tignes forment l\'Espace Killy, un domaine légendaire qui a vu naître les plus grands champions. Entre tradition savoyarde et modernité, ces stations offrent des paysages à couper le souffle.'
          : 'Val d\'Isère and Tignes form the Espace Killy, a legendary domain that has seen the birth of the greatest champions. Between Savoyard tradition and modernity, these resorts offer breathtaking landscapes.',
        image: 'assets/images/pas libre de droit/espace_killy_2.jpg',
        altitude: '1 550m - 3 456m',
        skiArea: isFr ? '300 km de pistes' : '300 km of slopes',
        highlights: isFr ? ['Glacier Grande Motte', 'Pistes Olympiques', 'Vie Nocturne'] : ['Grande Motte Glacier', 'Olympic Slopes', 'Nightlife']
      }
    ];
  }
}
