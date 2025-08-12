// services/language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translations {
  // Navigation menu
  menuHome: string;
  menuDestinations: string;
  menuServices: string;
  menuAccommodations: string;
  menuAbout: string;
  menuContact: string;
  
  // Header specific
  contactBar: string;
  seasonWinter: string;
  seasonSummer: string;
  navigationSection: string;
  contactSection: string;
  callUs: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  discoverScroll: string;
  
  // Section 1 - Excellence
  section1Title: string;
  section1Text1: string;
  section1Text2: string;
  
  // Section 2 - Destinations
  section2Title: string;
  section2Text: string;
  viewAllDestinations: string;
  destinations: Array<{
    name: string;
    description: string;
    slug: string;
  }>;
  
  // Section 3 - Services
  section3Title: string;
  section3Subtitle: string;
  services: Array<{
    title: string;
    description: string;
  }>;
  
  // Section 4 - Accommodations
  section4Title: string;
  section4Text1: string;
  section4Text2: string;
  section4Text3: string;
  section4Cta: string;
  
  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactLegalTitle: string;
  contactQuoteTitle: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSubmit: string;
  formNamePlaceholder: string;
  formEmailPlaceholder: string;
  formMessagePlaceholder: string;
  
  // Common
  discoverMore: string;
  bookNow: string;
  learnMore: string;
  
  // Legal info
  legalAtout: string;
  legalGuarantee: string;
  legalInsurance: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<'fr' | 'en'>('fr');
  public currentLanguage$ = this.currentLang.asObservable();

  private translations: { [key: string]: Translations } = {
    fr: {
      // Navigation menu
      menuHome: 'Accueil',
      menuDestinations: 'Destinations',
      menuServices: 'Services',
      menuAccommodations: 'Hébergements',
      menuAbout: 'À propos',
      menuContact: 'Contact',
      
      // Header specific
      contactBar: 'Pour toute demande :',
      seasonWinter: 'HIVER',
      seasonSummer: 'ÉTÉ',
      navigationSection: 'Navigation',
      contactSection: 'Contact',
      callUs: 'Appelez-nous',
      
      // Hero section
      heroTitle: "L'art du voyage haut de gamme",
      heroSubtitle: "Plus de 20 ans d'expertise dans l'univers du ski",
      discoverScroll: 'Découvrir',
      
      // Section 1 - Excellence
      section1Title: "Notre Excellence",
      section1Text1: "MC Travel Experiences incarne l'art du voyage haut de gamme avec plus de 20 ans d'expertise dans l'univers du ski. Spécialisée dans les séjours de luxe à la montagne et les expériences de ski exclusives, notre agence conçoit des voyages sur mesure, à la hauteur des attentes les plus exigeantes.",
      section1Text2: "Chaque détail compte. C'est pourquoi nous offrons un service de conciergerie personnalisé, disponible à chaque étape de votre voyage : Transferts privés, réservation des meilleurs chalets ou hôtels 5 étoiles, cours de ski avec moniteurs d'exception, tables gastronomiques, ou encore activités uniques hors des sentiers battus.",
      
      // Section 2 - Destinations
      section2Title: "Destinations d'Exception",
      section2Text: "Notre agence vous ouvre les portes des plus prestigieux domaines skiables d'Europe : Courchevel, Les 3 Vallées et l'Espace Killy (Val d'Isère – Tignes), pour des escapades inoubliables entre luxe, sport et élégance alpine.",
      viewAllDestinations: "Voir toutes nos destinations",
      destinations: [
        {
          name: "COURCHEVEL",
          description: "L'élégance à la française alliée à un domaine skiable hors normes.",
          slug: "courchevel"
        },
        {
          name: "LES 3 VALLÉES", 
          description: "Le plus grand domaine skiable du monde, pour des sensations sans limites.",
          slug: "les-3-vallees"
        },
        {
          name: "ESPACE KILLY",
          description: "Le royaume du ski sportif et des panoramas spectaculaires.",
          slug: "espace-killy"
        }
      ],
      
      // Section 3 - Services
      section3Title: "Notre Signature",
      section3Subtitle: "L'Excellence au Sommet",
      services: [
        {
          title: "Hébergements haut de gamme",
          description: "Chalets privés avec service hôtelier, suites de prestige, lodges avec vue imprenable."
        },
        {
          title: "Prestations personnalisées",
          description: "Chef privé, conciergerie 24/7, transfert en hélicoptère ou véhicule de luxe, cours de ski avec moniteurs privés."
        },
        {
          title: "Expériences exclusives",
          description: "Dîner en altitude dans un refuge privatisé, baptême en montgolfière au-dessus des montagnes, dégustations privées, randonnées en raquettes avec guide naturaliste…"
        }
      ],
      
      // Section 4 - Accommodations
      section4Title: "Séjours d'Exception en Montagne",
      section4Text1: "MCTE est spécialisée dans la sélection et la promotion de chalets privés et hôtels haut de gamme au cœur des plus belles stations alpines.",
      section4Text2: "Nous vous proposons des hébergements d'exception, alliant luxe, confort et authenticité, avec une offre de services personnalisés : chef privé, concierge, transferts premium, activités sur mesure…",
      section4Text3: "Que ce soit pour des vacances en famille, une escapade romantique ou un séjour d'entreprise, nous créons des expériences uniques à la montagne, pensées dans les moindres détails.",
      section4Cta: "Votre évasion commence ici.",
      
      // Contact
      contactTitle: "Nous Contacter",
      contactSubtitle: "Prêt à vivre une expérience alpine d'exception ? Contactez-nous pour créer votre séjour sur mesure.",
      contactAddress: "Adresse",
      contactPhone: "Téléphone",
      contactEmail: "Email",
      contactLegalTitle: "Informations légales",
      contactQuoteTitle: "Demande de devis",
      formName: "Votre nom",
      formEmail: "Votre email", 
      formMessage: "Votre message",
      formSubmit: "Envoyer",
      formNamePlaceholder: "Votre nom complet",
      formEmailPlaceholder: "votre@email.com",
      formMessagePlaceholder: "Décrivez-nous votre projet de séjour...",
      
      // Legal info
      legalAtout: "N° ATOUT FRANCE : IM073250002",
      legalGuarantee: "Garantie financière : APST",
      legalInsurance: "Assurance RCP : Hiscox",
      
      // Common
      discoverMore: "Découvrir plus",
      bookNow: "Réserver maintenant",
      learnMore: "En savoir plus"
    },
    en: {
      // Navigation menu
      menuHome: 'Home',
      menuDestinations: 'Destinations',
      menuServices: 'Services',
      menuAccommodations: 'Accommodations',
      menuAbout: 'About',
      menuContact: 'Contact',
      
      // Header specific
      contactBar: 'For any inquiry:',
      seasonWinter: 'WINTER',
      seasonSummer: 'SUMMER',
      navigationSection: 'Navigation',
      contactSection: 'Contact',
      callUs: 'Call us',
      
      // Hero section
      heroTitle: "The art of high-end travel",
      heroSubtitle: "More than 20 years of expertise in the ski universe",
      discoverScroll: 'Discover',
      
      // Section 1 - Excellence
      section1Title: "Our Excellence",
      section1Text1: "MCTE has embodied the art of high-end travel for more than 20 years. Specializing in luxury mountain escapes and exclusive ski experiences, our agency creates tailor-made journeys that exceed the expectations of even the most discerning travelers.",
      section1Text2: "Every detail matters. That's why we offer a dedicated concierge service at every step of your journey — from securing the finest chalets and 5-star hotels, to private transfers, elite ski instructors, gourmet dining, and unique off-the-beaten-path activities.",
      
      // Section 2 - Destinations
      section2Title: "Exceptional Destinations",
      section2Text: "Our agency opens the doors to the most prestigious ski areas in Europe: Courchevel, Les 3 Vallées, and the Espace Killy (Val d'Isère – Tignes), offering unforgettable getaways that combine luxury, sport, and alpine elegance.",
      viewAllDestinations: "View all destinations",
      destinations: [
        {
          name: "COURCHEVEL",
          description: "French elegance meets a world-class ski resort.",
          slug: "courchevel"
        },
        {
          name: "LES 3 VALLÉES",
          description: "The largest ski area in the world, for endless thrills and exploration.",
          slug: "les-3-vallees"
        },
        {
          name: "ESPACE KILLY", 
          description: "A paradise for passionate skiers and lovers of breathtaking mountain scenery.",
          slug: "espace-killy"
        }
      ],
      
      // Section 3 - Services
      section3Title: "Our Signature",
      section3Subtitle: "Excellence at the Summit",
      services: [
        {
          title: "High-end accommodations",
          description: "Private chalets with hotel-style service, luxury suites, and lodges with breathtaking views."
        },
        {
          title: "Personalized services",
          description: "Private chef, 24/7 concierge, helicopter or luxury vehicle transfers, private ski lessons with expert instructors."
        },
        {
          title: "Exclusive experiences",
          description: "Dinner at altitude in a private mountain refuge, hot air balloon rides over the Alps, private tastings, snowshoe hikes with a naturalist guide…"
        }
      ],
      
      // Section 4 - Accommodations
      section4Title: "Exceptional Mountain Stays",
      section4Text1: "We are specialized in curating and promoting luxury chalets and high-end hotels in the most prestigious Alpine resorts.",
      section4Text2: "We offer a selection of exclusive accommodations combining comfort, elegance, and authenticity, with a full range of personalized services: private chef, concierge, premium transfers, and tailor-made activities.",
      section4Text3: "Whether you're planning a family vacation, a romantic getaway, or a corporate retreat, we design unique, unforgettable mountain experiences, crafted down to the last detail.",
      section4Cta: "Your alpine escape starts here.",
      
      // Contact
      contactTitle: "Contact Us",
      contactSubtitle: "Ready to experience an exceptional alpine adventure? Contact us to create your tailor-made stay.",
      contactAddress: "Address",
      contactPhone: "Phone",
      contactEmail: "Email",
      contactLegalTitle: "Legal Information",
      contactQuoteTitle: "Request a Quote",
      formName: "Your name",
      formEmail: "Your email",
      formMessage: "Your message", 
      formSubmit: "Send",
      formNamePlaceholder: "Your full name",
      formEmailPlaceholder: "your@email.com",
      formMessagePlaceholder: "Tell us about your travel project...",
      
      // Legal info
      legalAtout: "ATOUT FRANCE No.: IM073250002",
      legalGuarantee: "Financial guarantee: APST",
      legalInsurance: "Liability insurance: Hiscox",
      
      // Common
      discoverMore: "Discover more",
      bookNow: "Book now",
      learnMore: "Learn more"
    }
  };

  get currentLanguage(): 'fr' | 'en' {
    return this.currentLang.value;
  }

  get currentTranslations(): Translations {
    return this.translations[this.currentLanguage];
  }

  switchLanguage(lang: 'fr' | 'en') {
    this.currentLang.next(lang);
  }
}