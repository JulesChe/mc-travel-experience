// services/season.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Season = 'winter' | 'summer';

export interface SeasonContent {
  heroVideo: string;
  heroPoster: string;
  heroTitle: string;
  heroSubtitle: string;
  
  // Sections pour l'été
  destinations?: SummerDestination[];
  accommodations?: SummerAccommodation[];
  activities?: SummerActivity[];
  
  // Sections pour l'hiver (existantes)
  section1?: any;
  section2?: any;
  section3?: any;
  section4?: any;
}

export interface SummerDestination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  highlights?: string[];
}

export interface SummerAccommodation {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  description: string;
}

export interface SummerActivity {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private currentSeasonSubject = new BehaviorSubject<Season>('winter');
  public currentSeason$ = this.currentSeasonSubject.asObservable();
  
  constructor() {
    // Récupérer la saison sauvegardée ou déterminer automatiquement
    const savedSeason = localStorage.getItem('selectedSeason') as Season;
    if (savedSeason) {
      this.currentSeasonSubject.next(savedSeason);
    } else {
      // Déterminer automatiquement selon le mois
      const month = new Date().getMonth();
      const isWinter = month >= 10 || month <= 3; // Nov-Avril = hiver
      this.currentSeasonSubject.next(isWinter ? 'winter' : 'summer');
    }
  }
  
  get currentSeason(): Season {
    return this.currentSeasonSubject.value;
  }
  
  switchSeason(season: Season) {
    this.currentSeasonSubject.next(season);
    localStorage.setItem('selectedSeason', season);
  }
  
  toggleSeason() {
    const newSeason = this.currentSeason === 'winter' ? 'summer' : 'winter';
    this.switchSeason(newSeason);
  }
  
  getSeasonContent(lang: 'fr' | 'en'): SeasonContent {
    if (this.currentSeason === 'summer') {
      return this.getSummerContent(lang);
    }
    return this.getWinterContent(lang);
  }
  
  private getSummerContent(lang: 'fr' | 'en'): SeasonContent {
    const content = lang === 'fr' ? {
      heroVideo: 'https://pub-3255f12a5223472980a97fe319ca6482.r2.dev/BASE M 2K.mov', // À remplacer par vidéo été
      heroPoster: 'assets/images/montagne_cover.jpg',
      heroTitle: "L'art de vivre l'été en montagne",
      heroSubtitle: "Découvrez nos expériences estivales d'exception",
      
      destinations: [
        {
          id: 'montagne',
          name: 'Montagne',
          subtitle: 'Respirez l\'air pur des sommets',
          description: 'Les Alpes en été révèlent leur beauté verdoyante. Randonnées, lacs cristallins et panoramas à couper le souffle.',
          image: 'assets/images/montagne_cover.jpg',
          highlights: ['Randonnées guidées', 'Lacs d\'altitude', 'Refuges authentiques', 'Faune et flore alpines']
        },
        {
          id: 'bourgogne',
          name: 'Bourgogne',
          subtitle: 'Art de vivre et gastronomie',
          description: 'Explorez la Bourgogne à travers des expériences uniques : VTT dans les vignobles, gastronomie étoilée, rallyes de voitures anciennes, dégustations œnologiques et moments de détente au spa.',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg',
          highlights: ['Trip VTT', 'Gastronomie', 'Vieilles voitures', 'Œnologie', 'Spa']
        },
        {
          id: 'bordeaux',
          name: 'Bordeaux',
          subtitle: 'Vignobles et élégance',
          description: 'Découvrez les grands crus classés, les châteaux prestigieux et l\'art de vivre bordelais dans un cadre d\'exception.',
          image: 'assets/images/montagne_cover.jpg',
          highlights: ['Châteaux viticoles', 'Dégustations privées', 'Golf', 'Croisières sur la Garonne']
        },
        {
          id: 'annecy-chamonix',
          name: 'Annecy & Chamonix',
          subtitle: 'Entre lac et montagne',
          description: 'Le charme d\'Annecy et la majesté de Chamonix. Une combinaison parfaite entre activités nautiques et alpines.',
          image: 'assets/images/helico.jpg',
          highlights: ['Lac d\'Annecy', 'Mont-Blanc', 'Sports nautiques', 'Alpinisme']
        }
      ],
      
      accommodations: [
        {
          id: 'refuge-solaise',
          name: 'Refuge de Solaise',
          location: 'Val d\'Isère',
          type: 'Refuge d\'altitude',
          image: 'assets/images/montagne_cover.jpg',
          description: 'Un refuge d\'exception à 2551m d\'altitude avec vue panoramique sur les Alpes.'
        },
        {
          id: 'refuge-traye',
          name: 'Refuge de la Traye',
          location: 'Méribel',
          type: 'Refuge traditionnel',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg',
          description: 'Authenticité et charme savoyard au cœur des 3 Vallées.'
        },
        {
          id: 'domaine-leflaive',
          name: 'Domaine Leflaive',
          location: 'Puligny-Montrachet',
          type: 'Domaine viticole',
          image: 'assets/images/montagne_cover.jpg',
          description: 'Séjournez au cœur des grands crus de Bourgogne dans un domaine d\'exception.'
        },
        {
          id: 'palace-menthon',
          name: 'Palace de Menthon',
          location: 'Annecy',
          type: 'Palace 5 étoiles',
          image: 'assets/images/helico.jpg',
          description: 'Luxe et raffinement sur les rives du lac d\'Annecy.'
        }
      ],
      
      activities: [
        {
          id: 'parapente',
          name: 'Parapente',
          subtitle: 'Volez au-dessus des Alpes',
          description: 'Découvrez la sensation unique du vol libre avec des vues spectaculaires sur les sommets alpins.',
          image: 'assets/images/montagne_cover.jpg'
        },
        {
          id: 'vtt',
          name: 'VTT & VTT Électrique',
          subtitle: 'Explorez les sentiers',
          description: 'Des descentes vertigineuses aux balades familiales, parcourez les plus beaux sentiers des Alpes.',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg'
        },
        {
          id: 'randonnees',
          name: 'Randonnées',
          subtitle: 'À la découverte des sommets',
          description: 'Randonnées guidées pour tous niveaux, des lacs d\'altitude aux glaciers éternels.',
          image: 'assets/images/montagne_cover.jpg'
        },
        {
          id: 'yoga-wellness',
          name: 'Yoga & Wellness',
          subtitle: 'Harmonie en altitude',
          description: 'Séances de yoga face aux montagnes, spa et soins bien-être pour une détente absolue.',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg'
        },
        {
          id: 'rafting',
          name: 'Rafting & Eaux Vives',
          subtitle: 'Sensations fortes garanties',
          description: 'Descendez les rivières alpines en rafting, canyoning ou hydrospeed pour une dose d\'adrénaline.',
          image: 'assets/images/helico.jpg'
        }
      ]
    } : {
      // Version anglaise
      heroVideo: 'https://pub-3255f12a5223472980a97fe319ca6482.r2.dev/BASE M 2K.mov',
      heroPoster: 'assets/images/montagne_cover.jpg',
      heroTitle: "The art of summer living in the mountains",
      heroSubtitle: "Discover our exceptional summer experiences",
      
      destinations: [
        {
          id: 'mountain',
          name: 'Mountain',
          subtitle: 'Breathe the pure mountain air',
          description: 'The Alps in summer reveal their lush beauty. Hiking, crystal-clear lakes and breathtaking panoramas.',
          image: 'assets/images/montagne_cover.jpg',
          highlights: ['Guided hikes', 'High-altitude lakes', 'Authentic refuges', 'Alpine flora and fauna']
        },
        {
          id: 'burgundy',
          name: 'Burgundy',
          subtitle: 'Art of living and gastronomy',
          description: 'Explore Burgundy through unique experiences: mountain biking through vineyards, starred gastronomy, vintage car rallies, wine tastings and spa relaxation.',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg',
          highlights: ['Mountain biking', 'Gastronomy', 'Vintage cars', 'Wine tasting', 'Spa']
        },
        {
          id: 'bordeaux',
          name: 'Bordeaux',
          subtitle: 'Vineyards and elegance',
          description: 'Discover the great classified growths, prestigious châteaux and the Bordeaux art of living in an exceptional setting.',
          image: 'assets/images/montagne_cover.jpg',
          highlights: ['Wine châteaux', 'Private tastings', 'Golf', 'Garonne cruises']
        },
        {
          id: 'annecy-chamonix',
          name: 'Annecy & Chamonix',
          subtitle: 'Between lake and mountain',
          description: 'The charm of Annecy and the majesty of Chamonix. A perfect combination of water and alpine activities.',
          image: 'assets/images/helico.jpg',
          highlights: ['Lake Annecy', 'Mont Blanc', 'Water sports', 'Mountaineering']
        }
      ],
      
      accommodations: [
        {
          id: 'refuge-solaise',
          name: 'Solaise Refuge',
          location: 'Val d\'Isère',
          type: 'High altitude refuge',
          image: 'assets/images/montagne_cover.jpg',
          description: 'An exceptional refuge at 2551m altitude with panoramic views of the Alps.'
        },
        {
          id: 'refuge-traye',
          name: 'La Traye Refuge',
          location: 'Méribel',
          type: 'Traditional refuge',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg',
          description: 'Authenticity and Savoyard charm in the heart of the 3 Valleys.'
        },
        {
          id: 'domaine-leflaive',
          name: 'Domaine Leflaive',
          location: 'Puligny-Montrachet',
          type: 'Wine estate',
          image: 'assets/images/montagne_cover.jpg',
          description: 'Stay in the heart of Burgundy\'s grand crus in an exceptional estate.'
        },
        {
          id: 'palace-menthon',
          name: 'Palace de Menthon',
          location: 'Annecy',
          type: '5-star Palace',
          image: 'assets/images/helico.jpg',
          description: 'Luxury and refinement on the shores of Lake Annecy.'
        }
      ],
      
      activities: [
        {
          id: 'paragliding',
          name: 'Paragliding',
          subtitle: 'Fly over the Alps',
          description: 'Experience the unique sensation of free flight with spectacular views of the Alpine peaks.',
          image: 'assets/images/montagne_cover.jpg'
        },
        {
          id: 'mtb',
          name: 'Mountain Biking & E-MTB',
          subtitle: 'Explore the trails',
          description: 'From thrilling descents to family rides, explore the most beautiful trails in the Alps.',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg'
        },
        {
          id: 'hiking',
          name: 'Hiking',
          subtitle: 'Discover the peaks',
          description: 'Guided hikes for all levels, from high-altitude lakes to eternal glaciers.',
          image: 'assets/images/montagne_cover.jpg'
        },
        {
          id: 'yoga-wellness',
          name: 'Yoga & Wellness',
          subtitle: 'Harmony at altitude',
          description: 'Yoga sessions facing the mountains, spa and wellness treatments for absolute relaxation.',
          image: 'assets/images/pas libre de droit/espace_killy_2.jpg'
        },
        {
          id: 'rafting',
          name: 'Rafting & Whitewater',
          subtitle: 'Thrills guaranteed',
          description: 'Descend Alpine rivers by rafting, canyoning or hydrospeed for an adrenaline rush.',
          image: 'assets/images/helico.jpg'
        }
      ]
    };
    
    return content;
  }
  
  private getWinterContent(lang: 'fr' | 'en'): SeasonContent {
    // Contenu existant pour l'hiver
    return {
      heroVideo: 'https://pub-3255f12a5223472980a97fe319ca6482.r2.dev/BASE M 2K.mov',
      heroPoster: 'assets/images/photo_mc.JPG',
      heroTitle: lang === 'fr' ? "L'art du voyage haut de gamme" : "The art of high-end travel",
      heroSubtitle: lang === 'fr' ? "Plus de 20 ans d'expertise dans l'univers du ski" : "More than 20 years of expertise in the ski universe",
      
      // Les sections existantes restent inchangées pour l'hiver
      section1: true,
      section2: true,
      section3: true,
      section4: true
    };
  }
}