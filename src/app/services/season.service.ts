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
    // Récupérer la saison sauvegardée ou utiliser hiver par défaut
    const savedSeason = localStorage.getItem('selectedSeason') as Season;
    if (savedSeason) {
      this.currentSeasonSubject.next(savedSeason);
    } else {
      // Par défaut, toujours commencer en mode hiver
      this.currentSeasonSubject.next('winter');
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
          id: 'entre-lac-et-montagnes',
          name: 'Entre lac et montagnes',
          subtitle: 'Des Alpes aux lacs cristallins',
          description: 'De Courchevel à Chamonix, entre l\'ascension de l\'Aiguille du Midi et la douceur du lac d\'Annecy, partez à la découverte des plus beaux joyaux alpins. Et pour prolonger l\'aventure, franchissez la frontière jusqu\'à Sestrières en Italie, où la montagne se vit à l\'heure de la dolce vita.',
          image: 'assets/images/photo_off/lac_montagne.jpg',
          highlights: ['Aiguille du Midi', 'Lac d\'Annecy', 'Mont-Blanc', 'Sestrières Italie', 'Dolce vita alpine']
        },
        {
          id: 'bourgogne',
          name: 'La Bourgogne',
          subtitle: 'Des sentiers aux vignobles',
          description: 'Explorez la Bourgogne en VTT à travers vignes et villages, avant de savourer ses Grands Crus et sa gastronomie authentique. Sport, plaisir et art de vivre pour une expérience inoubliable.',
          image: 'assets/images/photo_off/bourgogne.jpg',
          highlights: ['VTT dans les vignes', 'Grands Crus', 'Gastronomie authentique', 'Villages bourguignons', 'Art de vivre']
        }
      ],

      accommodations: [
        {
          id: 'refuge-solaise',
          name: 'Refuge de Solaise',
          location: 'Val d\'Isère',
          type: 'Refuge d\'altitude',
          image: 'assets/images/photo_off/solaise_ete.jpg',
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
          id: 'auberge-sulpice',
          name: 'Auberge de Sulpice',
          location: 'Annecy',
          type: 'Hotel',
          image: 'assets/images/photo_off/palace_menthon.jpg',
          description: 'Luxe et raffinement sur les rives du lac d\'Annecy.'
        }
      ],

      activities: [
        {
          id: 'parapente',
          name: 'Parapente',
          subtitle: 'Volez au-dessus des Alpes',
          description: 'Découvrez la sensation unique du vol libre avec des vues spectaculaires sur les sommets alpins.',
          image: 'assets/images/photo_off/parapente.jpg'
        },
        {
          id: 'vtt',
          name: 'VTT & VTT Électrique',
          subtitle: 'Explorez les sentiers',
          description: 'Des descentes vertigineuses aux balades familiales, parcourez les plus beaux sentiers des Alpes.',
          image: 'assets/images/photo_off/vtt.png'
        },
        {
          id: 'randonnees',
          name: 'Randonnées',
          subtitle: 'À la découverte des sommets',
          description: 'Randonnées guidées pour tous niveaux, des lacs d\'altitude aux glaciers éternels.',
          image: 'assets/images/photo_off/randonnees.jpg'
        },
        {
          id: 'yoga-wellness',
          name: 'Yoga & Wellness',
          subtitle: 'Harmonie en altitude',
          description: 'Séances de yoga face aux montagnes, spa et soins bien-être pour une détente absolue.',
          image: 'assets/images/photo_off/yoga.jpg'
        },
        {
          id: 'rafting',
          name: 'Rafting & Eaux Vives',
          subtitle: 'Sensations fortes garanties',
          description: 'Descendez les rivières alpines en rafting, canyoning ou hydrospeed pour une dose d\'adrénaline.',
          image: 'assets/images/photo_off/rafting.jpg'
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
          id: 'entre-lac-et-montagnes',
          name: 'Between lake and mountains',
          subtitle: 'From Alps to crystal lakes',
          description: 'From Courchevel to Chamonix, between the ascent of the Aiguille du Midi and the gentle shores of Lake Annecy, discover the finest jewels of the Alps. And to extend the adventure, cross the border to Sestrières in Italy, where the mountains embrace the dolce vita.',
          image: 'assets/images/photo_off/lac_montagne.jpg',
          highlights: ['Aiguille du Midi', 'Lake Annecy', 'Mont Blanc', 'Sestrières Italy', 'Alpine dolce vita']
        },
        {
          id: 'bourgogne',
          name: 'Burgundy Getaway',
          subtitle: 'From trails to vineyards',
          description: 'Ride through Burgundy\'s vineyards and villages by MTB, then indulge in its finest wines and authentic cuisine. Adventure, pleasure, and art de vivre await you in this new experience!',
          image: 'assets/images/photo_off/bourgogne.jpg',
          highlights: ['MTB through vineyards', 'Grand Cru wines', 'Authentic gastronomy', 'Burgundy villages', 'Art de vivre']
        }
      ],

      accommodations: [
        {
          id: 'refuge-solaise',
          name: 'Solaise Refuge',
          location: 'Val d\'Isère',
          type: 'High altitude refuge',
          image: 'assets/images/photo_off/solaise_ete.jpg',
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
          id: 'auberge-sulpice',
          name: 'Auberge de Sulpice',
          location: 'Annecy',
          type: 'Hotel',
          image: 'assets/images/photo_off/palace_menthon.jpg',
          description: 'Luxury and refinement on the shores of Lake Annecy.'
        }
      ],

      activities: [
        {
          id: 'paragliding',
          name: 'Paragliding',
          subtitle: 'Fly over the Alps',
          description: 'Experience the unique sensation of free flight with spectacular views of the Alpine peaks.',
          image: 'assets/images/photo_off/parapente.jpg'
        },
        {
          id: 'mtb',
          name: 'Mountain Biking & E-MTB',
          subtitle: 'Explore the trails',
          description: 'From thrilling descents to family rides, explore the most beautiful trails in the Alps.',
          image: 'assets/images/photo_off/vtt.png'
        },
        {
          id: 'hiking',
          name: 'Hiking',
          subtitle: 'Discover the peaks',
          description: 'Guided hikes for all levels, from high-altitude lakes to eternal glaciers.',
          image: 'assets/images/photo_off/randonnees.jpg'
        },
        {
          id: 'yoga-wellness',
          name: 'Yoga & Wellness',
          subtitle: 'Harmony at altitude',
          description: 'Yoga sessions facing the mountains, spa and wellness treatments for absolute relaxation.',
          image: 'assets/images/photo_off/yoga.jpg'
        },
        {
          id: 'rafting',
          name: 'Rafting & Whitewater',
          subtitle: 'Thrills guaranteed',
          description: 'Descend Alpine rivers by rafting, canyoning or hydrospeed for an adrenaline rush.',
          image: 'assets/images/photo_off/rafting.jpg'
        }
      ]
    };

    return content;
  }

  private getWinterContent(lang: 'fr' | 'en'): SeasonContent {
    // Contenu existant pour l'hiver
    return {
      heroVideo: 'https://pub-3255f12a5223472980a97fe319ca6482.r2.dev/BASE M 2K.mov',
      heroPoster: 'assets/images/photo_off/espace_killy.jpg',
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
