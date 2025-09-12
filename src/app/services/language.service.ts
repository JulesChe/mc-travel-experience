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
  menuConciergerie: string;
  menuProperties: string; // Ajout
  
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
  
  // Footer specific - NOUVEAU
  footerTitle: string;
  footerSubtitle: string;
  footerButtonText: string;
  footerContact: string;
  footerLinks: string;
  footerFollow: string;
  footerRights: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerCompany: string;
  footerPrivacy: string;
  footerTerms: string;
  footerLegal: string;
  
  // Conciergerie Page
  conciergerieTitle: string;
  conciergerieSubtitle: string;
  conciergerieIntro: string;
  conciergeriePromise: string;
  
  // Conciergerie Services
  conciergerieServicesTitle: string;
  conciergerieServicesSubtitle: string;
  
  conciergerieHelico: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  conciergerieChef: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  conciergerieMoniteur: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  conciergerieMontgolfiere: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  conciergerieRaquette: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  conciergerieYoga: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  conciergerieS3V: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  
  // Conciergerie CTA
  conciergerieCTA: {
    title: string;
    subtitle: string;
    button: string;
  };
  
  // Common
  discoverMore: string;
  bookNow: string;
  learnMore: string;
  requestQuote: string;
  available24h: string;
  
  // Legal info
  legalAtout: string;
  legalGuarantee: string;
  legalInsurance: string;

  formPhone: string;
  formPhonePlaceholder: string;

  // Page Hébergements - NOUVEAU
  accommodationsPageTitle: string;
  accommodationsPageSubtitle: string;
  accommodationsIntro: string;
  accommodationsTypes: string;
  
  // Types d'hébergements
  chalets: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  hotels: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  apartments: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  };
  
  // Services hébergements
  accommodationServices: {
    title: string;
    subtitle: string;
    list: Array<{
      name: string;
      description: string;
    }>;
  };
  
  // CTA hébergements
  accommodationsCTA: {
    title: string;
    subtitle: string;
    button: string;
  };
  
  // Stats/caractéristiques
  accommodationsStats: {
    capacity: string;
    surface: string;
    rooms: string;
    bathrooms: string;
    terrace: string;
    parking: string;
    wifi: string;
    kitchen: string;
  };

  // Texte client hébergements - NOUVEAU
hebergementsTitle: string;
hebergementsText1: string;
hebergementsText2: string;
hebergementsText3: string;
hebergementsText4: string;

// Contenus été - NOUVEAU
summerDestinationsTitle: string;
summerDestinationsSubtitle: string;
summerAccommodationsTitle: string;
summerAccommodationsSubtitle: string;
summerActivitiesTitle: string;
summerActivitiesSubtitle: string;

// Messages et textes supplémentaires
excellenceBanner: string;
submittingText: string;
successMessage: string;
errorMessage: string;
emailClientMessage: string;
validationMessage: string;
footerCTATitle: string;
footerCTASubtitle: string;

// Navigation été
summerNavDestinations: string;
summerNavAccommodations: string;
summerNavActivities: string;

// Page destinations
destinationsIntro: string;
altitudeLabel: string;
skiAreaLabel: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<'fr' | 'en'>('fr');
  public currentLanguage$ = this.currentLang.asObservable();

  private translations: { [key: string]: Translations } = {
    fr: {

      hebergementsTitle: 'Séjours d\'Exception en Montagne',
      hebergementsText1: 'MCTE est spécialisée dans la sélection et la promotion de chalets privés et hôtels haut de gamme au cœur des plus belles stations alpines.',
      hebergementsText2: 'Nous vous proposons des hébergements d\'exception, alliant luxe, confort et authenticité, avec une offre de services personnalisés : chef privé, concierge, transferts premium, activités sur mesure…',
      hebergementsText3: 'Que ce soit pour des vacances en famille, une escapade romantique ou un séjour d\'entreprise, nous créons des expériences uniques à la montagne, pensées dans les moindres détails.',
      hebergementsText4: 'Votre évasion commence ici.',

      // Contenus été
      summerDestinationsTitle: 'Destinations d\'Été',
      summerDestinationsSubtitle: 'Explorez nos destinations estivales soigneusement sélectionnées',
      summerAccommodationsTitle: 'Hébergements d\'Exception',
      summerAccommodationsSubtitle: 'Des lieux uniques pour des séjours mémorables',
      summerActivitiesTitle: 'Activités Estivales',
      summerActivitiesSubtitle: 'Des expériences uniques pour tous les goûts',

      // Messages et textes supplémentaires
      excellenceBanner: 'Votre voyage, notre signature',
      submittingText: 'Envoi en cours...',
      successMessage: 'Votre message a été envoyé avec succès à MC Travel !',
      errorMessage: 'Une erreur est survenue. Utilisez le bouton email ci-dessous.',
      emailClientMessage: 'Votre client email s\'ouvre avec le message pré-rempli.',
      validationMessage: 'Veuillez remplir tous les champs obligatoires.',
      footerCTATitle: 'Prêt à vivre une expérience unique ?',
      footerCTASubtitle: 'Contactez nos experts pour créer votre séjour sur mesure dans les Alpes françaises.',

      // Navigation été
      summerNavDestinations: 'Destinations',
      summerNavAccommodations: 'Hébergements',
      summerNavActivities: 'Activités',

      // Page destinations
      destinationsIntro: "Découvrez nos destinations d'exception au cœur des Alpes françaises. Chaque station offre une expérience unique entre tradition alpine et luxe moderne.",
      altitudeLabel: 'Altitude',
      skiAreaLabel: 'Domaine skiable',

    // Page Hébergements - NOUVEAU
    accommodationsPageTitle: 'Hébergements d\'Exception',
    accommodationsPageSubtitle: 'Chalets privés et hôtels de prestige au cœur des Alpes',
    accommodationsIntro: 'Découvrez notre sélection exclusive d\'hébergements haut de gamme, alliant luxe, confort et authenticité alpine. Chaque propriété est soigneusement choisie pour offrir une expérience unique à nos clients les plus exigeants.',
    accommodationsTypes: 'Nos Types d\'Hébergements',

    // Types d'hébergements
    chalets: {
      title: 'Chalets Privés de Luxe',
      subtitle: 'L\'authenticité alpine revisitée',
      description: 'Nos chalets privés incarnent l\'art de vivre à la montagne. Alliant charme traditionnel et équipements modernes, ils offrent intimité et prestations hôtelières dans un cadre d\'exception.',
      features: [
        'Architecture authentique et matériaux nobles',
        'Service de conciergerie privé 24h/7j',
        'Chef privé et personnel de maison disponible',
        'Spa privatif avec sauna et jacuzzi',
        'Cave à vins et espaces de réception',
        'Accès ski-in/ski-out pour certaines propriétés'
      ]
    },

    hotels: {
      title: 'Hôtels & Palaces 5 Étoiles',
      subtitle: 'Le raffinement à son apogée',
      description: 'Partenaires des plus prestigieux établissements alpins, nous vous ouvrons les portes des palaces mythiques où excellence du service et raffinement se conjuguent pour créer des séjours inoubliables.',
      features: [
        'Suites et chambres avec vue panoramique',
        'Spas de renommée mondiale',
        'Restaurants gastronomiques étoilés',
        'Service voiturier et conciergerie',
        'Piscines intérieures et extérieures chauffées',
        'Salons privés et espaces VIP'
      ]
    },

    apartments: {
      title: 'Résidences de Standing',
      subtitle: 'L\'indépendance avec les services',
      description: 'Pour ceux qui privilégient l\'indépendance sans renoncer au confort, nos résidences de standing offrent des appartements spacieux avec services hôteliers à la carte.',
      features: [
        'Appartements spacieux et lumineux',
        'Cuisines équipées haut de gamme',
        'Services hôteliers optionnels',
        'Espaces wellness et fitness',
        'Réception et conciergerie',
        'Terrasses avec vue montagne'
      ]
    },

    // Services hébergements
    accommodationServices: {
      title: 'Services Inclus',
      subtitle: 'Pour un séjour sans contrainte',
      list: [
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
      ]
    },

    // CTA hébergements
    accommodationsCTA: {
      title: 'Trouvez Votre Hébergement Idéal',
      subtitle: 'Nos experts vous accompagnent dans le choix de l\'hébergement parfait pour votre séjour d\'exception.',
      button: 'Consulter nos disponibilités'
    },

    // Stats/caractéristiques
    accommodationsStats: {
      capacity: 'Capacité',
      surface: 'Surface',
      rooms: 'Chambres',
      bathrooms: 'Salles de bain',
      terrace: 'Terrasse',
      parking: 'Parking privé',
      wifi: 'WiFi haut débit',
      kitchen: 'Cuisine équipée'
    },
      // Navigation menu
      menuHome: 'Accueil',
      menuDestinations: 'Destinations',
      menuServices: 'Services',
      menuAccommodations: 'Chalets & Hôtels',
      menuAbout: 'À propos',
      menuContact: 'Contact',
      menuConciergerie: 'Conciergerie',
      menuProperties: 'Propriétés',
      
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
      
      // Footer specific - NOUVEAU
      footerTitle: "Prêt à vivre une expérience unique ?",
      footerSubtitle: "Contactez nos experts pour créer votre séjour sur mesure dans les Alpes françaises.",
      footerButtonText: "Nous contacter",
      footerContact: "Contact",
      footerLinks: "Liens Rapides",
      footerFollow: "Suivez-nous",
      footerRights: "Tous droits réservés.",
      footerPhone: "+33 (0)6 12 34 56 78",
      footerEmail: "contact@tsr-experience.com",
      footerAddress: "73120 Courchevel, France",
      footerCompany: "MC Travel Experiences",
      footerPrivacy: "Politique de confidentialité",
      footerTerms: "Conditions générales",
      footerLegal: "Mentions légales",
      
      // Conciergerie Page
      conciergerieTitle: "Service de Conciergerie",
      conciergerieSubtitle: "Votre assistant personnel pour des expériences d'exception",
      conciergerieIntro: "Notre service de conciergerie transforme vos rêves en réalité. Disponible 24h/24, notre équipe d'experts organise chaque détail de votre séjour pour créer des moments inoubliables.",
      conciergeriePromise: "Parce que chaque moment compte, nous mettons notre savoir-faire et notre réseau d'excellence à votre service.",
      
      // Conciergerie Services
      conciergerieServicesTitle: "Nos Services Exclusifs",
      conciergerieServicesSubtitle: "Une palette d'expériences sur mesure",
      
      conciergerieHelico: {
        title: "Transferts en Hélicoptère",
        subtitle: "Voyagez avec panache",
        description: "Découvrez les Alpes depuis les airs avec nos transferts en hélicoptère. Une approche spectaculaire qui transforme le trajet en expérience mémorable.",
        features: [
          "Transferts aéroport-station",
          "Tours panoramiques des Alpes",
          "Héliski sur glaciers",
          "Dîners en altitude accessible uniquement par hélico"
        ]
      },
      
      conciergerieChef: {
        title: "Chef Privé à Domicile",
        subtitle: "Gastronomie d'exception chez vous",
        description: "Savourez une cuisine raffinée dans l'intimité de votre chalet. Nos chefs étoilés créent des menus personnalisés avec des produits locaux d'exception.",
        features: [
          "Menus sur mesure selon vos goûts",
          "Produits locaux premium",
          "Service discret et professionnel",
          "Spécialités savoyardes revisitées"
        ]
      },
      
      conciergerieMoniteur: {
        title: "Moniteur de Ski Privé",
        subtitle: "Excellence technique et sécurité",
        description: "Perfectionnez votre technique ou découvrez les pistes secrètes avec nos moniteurs d'élite. Formation personnalisée pour tous les niveaux.",
        features: [
          "Cours particuliers sur mesure",
          "Guidage hors-piste sécurisé",
          "Initiation aux techniques de compétition",
          "Découverte des spots secrets"
        ]
      },
      
      conciergerieMontgolfiere: {
        title: "Vol en Montgolfière",
        subtitle: "Émerveillement garanti",
        description: "Survolez les sommets enneigés dans le silence majestueux d'une montgolfière. Une expérience poétique et inoubliable au lever du soleil.",
        features: [
          "Vols au lever ou coucher du soleil",
          "Champagne servi en vol",
          "Vues panoramiques uniques",
          "Certificat de vol personnalisé"
        ]
      },
      
      conciergerieRaquette: {
        title: "Randonnées Raquettes",
        subtitle: "Sérénité en montagne",
        description: "Explorez la montagne en silence sur des sentiers préservés. Nos guides naturalistes vous dévoilent les secrets de la faune alpine.",
        features: [
          "Guides naturalistes expérimentés",
          "Itinéraires secrets hors des sentiers battus",
          "Observation de la faune sauvage",
          "Pause gourmande en refuge d'altitude"
        ]
      },
      
      conciergerieYoga: {
        title: "Yoga & Bien-être",
        subtitle: "Harmonie corps et esprit",
        description: "Reconnectez-vous avec vous-même dans le cadre exceptionnel des Alpes. Séances privées avec vue sur les sommets.",
        features: [
          "Professeurs certifiés et expérimentés",
          "Séances en extérieur face aux sommets",
          "Yoga, méditation et relaxation",
          "Matériel professionnel fourni"
        ]
      },
      
      conciergerieS3V: {
        title: "Forfaits Ski S3V",
        subtitle: "Les 3 Vallées à prix préférentiel",
        description: "Profitez de tarifs exclusifs sur les forfaits du plus grand domaine skiable du monde. Vente directe avec avantages conciergerie.",
        features: [
          "Tarifs préférentiels négociés",
          "Forfaits multi-jours disponibles",
          "Livraison directe à votre hébergement",
          "Support conciergerie 24h/24"
        ]
      },
      
      
      // Conciergerie CTA
      conciergerieCTA: {
        title: "Créons Ensemble Votre Expérience Parfaite",
        subtitle: "Notre équipe de conciergerie est à votre écoute pour organiser chaque détail de votre séjour d'exception.",
        button: "Contactez notre conciergerie"
      },
      
      // Legal info
      legalAtout: "N° ATOUT FRANCE : IM073250002",
      legalGuarantee: "Garantie financière : APST",
      legalInsurance: "Assurance RCP : Hiscox",
      
      // Common
      discoverMore: "Découvrir plus",
      bookNow: "Réserver maintenant",
      learnMore: "En savoir plus",
      requestQuote: "Demander un devis",
      available24h: "Disponible 24h/24",

      formPhone: 'Téléphone',
      formPhonePlaceholder: '+33 6 XX XX XX XX'
    },
    en: {

      hebergementsTitle: 'Exceptional Mountain Stays',
      hebergementsText1: 'We are specialized in curating and promoting luxury chalets and high-end hotels in the most prestigious Alpine resorts.',
      hebergementsText2: 'We offer a selection of exclusive accommodations combining comfort, elegance, and authenticity, with a full range of personalized services: private chef, concierge, premium transfers, and tailor-made activities.',
      hebergementsText3: 'Whether you\'re planning a family vacation, a romantic getaway, or a corporate retreat, we design unique, unforgettable mountain experiences, crafted down to the last detail.',
      hebergementsText4: 'Your alpine escape starts here.',

      // Summer content
      summerDestinationsTitle: 'Summer Destinations',
      summerDestinationsSubtitle: 'Explore our carefully selected summer destinations',
      summerAccommodationsTitle: 'Exceptional Accommodations',
      summerAccommodationsSubtitle: 'Unique places for memorable stays',
      summerActivitiesTitle: 'Summer Activities',
      summerActivitiesSubtitle: 'Unique experiences for all tastes',

      // Additional messages and texts
      excellenceBanner: 'Your journey, our signature',
      submittingText: 'Sending...',
      successMessage: 'Your message has been successfully sent to MC Travel!',
      errorMessage: 'An error occurred. Please use the email button below.',
      emailClientMessage: 'Your email client opens with the pre-filled message.',
      validationMessage: 'Please fill in all required fields.',
      footerCTATitle: 'Ready for a unique experience?',
      footerCTASubtitle: 'Contact our experts to create your tailor-made stay in the French Alps.',

      // Summer navigation
      summerNavDestinations: 'Destinations',
      summerNavAccommodations: 'Accommodations',
      summerNavActivities: 'Activities',

      // Destinations page
      destinationsIntro: "Discover our exceptional destinations in the heart of the French Alps. Each resort offers a unique experience between Alpine tradition and modern luxury.",
      altitudeLabel: 'Altitude',
      skiAreaLabel: 'Ski Area',
      // Page Hébergements - NOUVEAU
      accommodationsPageTitle: 'Exceptional Accommodations',
      accommodationsPageSubtitle: 'Private chalets and luxury hotels in the heart of the Alps',
      accommodationsIntro: 'Discover our exclusive selection of high-end accommodations, combining luxury, comfort and Alpine authenticity. Each property is carefully chosen to offer a unique experience to our most discerning clients.',
      accommodationsTypes: 'Our Accommodation Types',

      // Types d'hébergements
      chalets: {
        title: 'Luxury Private Chalets',
        subtitle: 'Alpine authenticity reimagined',
        description: 'Our private chalets embody the art of mountain living. Combining traditional charm with modern amenities, they offer privacy and hotel services in an exceptional setting.',
        features: [
          'Authentic architecture and noble materials',
          '24/7 private concierge service',
          'Private chef and housekeeping staff available',
          'Private spa with sauna and jacuzzi',
          'Wine cellar and reception areas',
          'Ski-in/ski-out access for selected properties'
        ]
      },

      hotels: {
        title: '5-Star Hotels & Palaces',
        subtitle: 'Refinement at its peak',
        description: 'Partners of the most prestigious Alpine establishments, we open the doors to legendary palaces where service excellence and refinement combine to create unforgettable stays.',
        features: [
          'Suites and rooms with panoramic views',
          'World-renowned spas',
          'Michelin-starred restaurants',
          'Valet service and concierge',
          'Indoor and outdoor heated pools',
          'Private lounges and VIP areas'
        ]
      },

      apartments: {
        title: 'Luxury Residences',
        subtitle: 'Independence with services',
        description: 'For those who prefer independence without giving up comfort, our luxury residences offer spacious apartments with à la carte hotel services.',
        features: [
          'Spacious and bright apartments',
          'High-end equipped kitchens',
          'Optional hotel services',
          'Wellness and fitness facilities',
          'Reception and concierge',
          'Terraces with mountain views'
        ]
      },

      // Services hébergements
      accommodationServices: {
        title: 'Included Services',
        subtitle: 'For a stay without constraints',
        list: [
          {
            name: 'Premium Transfers',
            description: 'Private shuttles, luxury vehicles or helicopter according to your preferences'
          },
          {
            name: 'Dedicated Concierge',
            description: 'A team at your service to organize every detail of your stay'
          },
          {
            name: 'Custom Catering',
            description: 'Private chef, gourmet deliveries or reservations at the best restaurants'
          },
          {
            name: 'Exclusive Activities',
            description: 'Private skiing, wellness, excursions and unique experiences'
          },
          {
            name: 'Daily Services',
            description: 'Housekeeping, linen, maintenance and technical assistance'
          },
          {
            name: 'Ski Equipment',
            description: 'Rental and delivery of high-end equipment directly on site'
          }
        ]
      },

      // CTA hébergements
      accommodationsCTA: {
        title: 'Find Your Ideal Accommodation',
        subtitle: 'Our experts will guide you in choosing the perfect accommodation for your exceptional stay.',
        button: 'Check availability'
      },

      // Stats/caractéristiques
      accommodationsStats: {
        capacity: 'Capacity',
        surface: 'Surface area',
        rooms: 'Bedrooms',
        bathrooms: 'Bathrooms',
        terrace: 'Terrace',
        parking: 'Private parking',
        wifi: 'High-speed WiFi',
        kitchen: 'Equipped kitchen'
      },
      // Navigation menu
      menuHome: 'Home',
      menuDestinations: 'Destinations',
      menuServices: 'Services',
      menuAccommodations: 'Chalets & Hotels',
      menuAbout: 'About',
      menuContact: 'Contact',
      menuConciergerie: 'Concierge',
      menuProperties: 'Properties',
      
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
      
      // Footer specific - NEW
      footerTitle: "Ready for a unique experience?",
      footerSubtitle: "Contact our experts to create your tailor-made stay in the French Alps.",
      footerButtonText: "Contact us",
      footerContact: "Contact",
      footerLinks: "Quick Links",
      footerFollow: "Follow us",
      footerRights: "All rights reserved.",
      footerPhone: "+33 (0)6 12 34 56 78",
      footerEmail: "contact@tsr-experience.com",
      footerAddress: "73120 Courchevel, France",
      footerCompany: "MC Travel Experiences",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms & Conditions",
      footerLegal: "Legal Notice",
      
      // Conciergerie Page
      conciergerieTitle: "Concierge Service",
      conciergerieSubtitle: "Your personal assistant for exceptional experiences",
      conciergerieIntro: "Our concierge service transforms your dreams into reality. Available 24/7, our team of experts organizes every detail of your stay to create unforgettable moments.",
      conciergeriePromise: "Because every moment counts, we put our expertise and network of excellence at your service.",
      
      // Conciergerie Services
      conciergerieServicesTitle: "Our Exclusive Services",
      conciergerieServicesSubtitle: "A palette of tailor-made experiences",
      
      conciergerieHelico: {
        title: "Helicopter Transfers",
        subtitle: "Travel in style",
        description: "Discover the Alps from the air with our helicopter transfers. A spectacular approach that transforms the journey into a memorable experience.",
        features: [
          "Airport-to-resort transfers",
          "Panoramic Alpine tours",
          "Glacier heliskiing",
          "Mountain dining accessible only by helicopter"
        ]
      },
      
      conciergerieChef: {
        title: "Private Chef at Home",
        subtitle: "Exceptional gastronomy in your chalet",
        description: "Savor refined cuisine in the privacy of your chalet. Our Michelin-starred chefs create personalized menus with exceptional local ingredients.",
        features: [
          "Custom menus according to your tastes",
          "Premium local ingredients",
          "Discreet and professional service",
          "Savoyard specialties revisited"
        ]
      },
      
      conciergerieMoniteur: {
        title: "Private Ski Instructor",
        subtitle: "Technical excellence and safety",
        description: "Perfect your technique or discover secret slopes with our elite instructors. Personalized training for all levels.",
        features: [
          "Tailor-made private lessons",
          "Secure off-piste guiding",
          "Competition technique initiation",
          "Discovery of secret spots"
        ]
      },
      
      conciergerieMontgolfiere: {
        title: "Hot Air Balloon Flight",
        subtitle: "Wonder guaranteed",
        description: "Fly over snow-capped peaks in the majestic silence of a hot air balloon. A poetic and unforgettable experience at sunrise.",
        features: [
          "Sunrise or sunset flights",
          "Champagne served in flight",
          "Unique panoramic views",
          "Personalized flight certificate"
        ]
      },
      
      conciergerieRaquette: {
        title: "Snowshoe Hiking",
        subtitle: "Serenity in the mountains",
        description: "Explore the mountains in silence on preserved trails. Our naturalist guides reveal the secrets of alpine wildlife.",
        features: [
          "Experienced naturalist guides",
          "Secret off-the-beaten-path routes",
          "Wild wildlife observation",
          "Gourmet break in mountain refuge"
        ]
      },
      
      conciergerieYoga: {
        title: "Yoga & Wellness",
        subtitle: "Harmony of body and mind",
        description: "Reconnect with yourself in the exceptional setting of the Alps. Private sessions with views of the peaks.",
        features: [
          "Certified and experienced instructors",
          "Outdoor sessions facing the summits",
          "Yoga, meditation and relaxation",
          "Professional equipment provided"
        ]
      },
      
      conciergerieS3V: {
        title: "S3V Ski Passes",
        subtitle: "3 Valleys at preferential rates",
        description: "Enjoy exclusive rates on passes for the world's largest ski area. Direct sales with concierge benefits.",
        features: [
          "Preferential negotiated rates",
          "Multi-day passes available",
          "Direct delivery to your accommodation",
          "24/7 concierge support"
        ]
      },
      
      
      // Conciergerie CTA
      conciergerieCTA: {
        title: "Let's Create Your Perfect Experience Together",
        subtitle: "Our concierge team is here to organize every detail of your exceptional stay.",
        button: "Contact our concierge"
      },

      formPhone: 'Phone',
      formPhonePlaceholder: '+33 6 XX XX XX XX',
      
      // Legal info
      legalAtout: "ATOUT FRANCE No.: IM073250002",
      legalGuarantee: "Financial guarantee: APST",
      legalInsurance: "Liability insurance: Hiscox",
      
      // Common
      discoverMore: "Discover more",
      bookNow: "Book now",
      learnMore: "Learn more",
      requestQuote: "Request a quote",
      available24h: "Available 24/7"
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