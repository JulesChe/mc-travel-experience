// conciergerie.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceCardComponent, Activity } from '../../components/service-card/service-card.component';
import { FooterComponent, FooterConfig } from '../../components/footer/footer.component';

@Component({
  selector: 'app-conciergerie',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceCardComponent,FooterComponent],
  templateUrl: './conciergerie.component.html',
  styleUrls: ['./conciergerie.component.scss']
})
export class ConciergerieComponent implements OnInit, OnDestroy {
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>;
  
  // État du carrousel moderne
  currentSlideIndex = 0;
  totalSlides = 0;
  canScrollLeft = false;
  canScrollRight = true;
  private intersectionObserver?: IntersectionObserver;
  private hasUserScrolled = false;

  footerConfig: FooterConfig = {
    title: undefined,
    subtitle: undefined,
    buttonText: undefined
  };

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.totalSlides = this.activities.length;
    
    // Initialiser l'état de navigation
    this.canScrollLeft = false;
    this.canScrollRight = this.totalSlides > 1;
    
    // Setup après que la vue soit initialisée
    setTimeout(() => {
      this.setupSlideObserver();
    }, 100);
  }



  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  /**
   * Configure l'observer pour détecter le slide visible
   */
  private setupSlideObserver(): void {
    if (!this.carouselTrack) return;
    
    const options = {
      root: this.carouselTrack.nativeElement,
      rootMargin: '0px',
      threshold: 0.8 // Plus strict pour éviter les changements trop rapides
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      // Trouver le slide le plus visible
      let mostVisibleSlide: HTMLElement | null = null;
      let maxIntersectionRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostVisibleSlide = entry.target as HTMLElement;
        }
      });

      if (mostVisibleSlide) {
        const slideIndex = Array.from(this.carouselTrack.nativeElement.children).indexOf(mostVisibleSlide);
        if (slideIndex !== -1 && slideIndex !== this.currentSlideIndex) {
          this.currentSlideIndex = slideIndex;
        }
      }
    }, options);

    // Observer tous les slides
    setTimeout(() => {
      const slides = this.carouselTrack.nativeElement.querySelectorAll('.carousel-slide');
      slides.forEach(slide => {
        this.intersectionObserver!.observe(slide);
      });
    }, 100);
    
    // Écouter les événements de scroll
    this.carouselTrack.nativeElement.addEventListener('scroll', () => {
      this.updateNavigationState();
      this.hideScrollHintOnFirstScroll();
    }, { passive: true });
    
    this.updateNavigationState();
  }

  /**
   * Met à jour l'état des boutons de navigation et le slide actuel
   */
  private updateNavigationState(): void {
    if (!this.carouselTrack) return;
    
    // Calculer le slide actuel basé sur la position de scroll
    this.updateCurrentSlideFromScroll();
    
    // Mettre à jour les boutons en fonction du slide actuel avec une tolérance
    const container = this.carouselTrack.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    // Tolérance de 5px pour éviter les problèmes de précision
    this.canScrollLeft = scrollLeft > 5;
    this.canScrollRight = scrollLeft < maxScrollLeft - 5;
  }

  /**
   * Met à jour le slide actuel basé sur la position de scroll
   */
  private updateCurrentSlideFromScroll(): void {
    if (!this.carouselTrack) return;
    
    const container = this.carouselTrack.nativeElement;
    const slides = container.querySelectorAll('.carousel-slide');
    
    if (slides.length === 0) return;
    
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    
    let closestSlideIndex = 0;
    let minDistance = Infinity;
    
    slides.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;
      const slideOffsetLeft = slideElement.offsetLeft;
      const slideWidth = slideElement.offsetWidth;
      
      // Position idéale de scroll pour centrer ce slide
      const idealScrollPosition = slideOffsetLeft - (containerWidth - slideWidth) / 2;
      const distance = Math.abs(scrollLeft - idealScrollPosition);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestSlideIndex = index;
      }
    });
    
    if (closestSlideIndex !== this.currentSlideIndex) {
      this.currentSlideIndex = closestSlideIndex;
    }
  }

  /**
   * Navigation vers le slide précédent
   */
  scrollToPrevious(): void {
    if (!this.carouselTrack) return;
    
    const newIndex = Math.max(0, this.currentSlideIndex - 1);
    if (newIndex !== this.currentSlideIndex) {
      this.scrollToSlideIndex(newIndex);
    }
  }

  /**
   * Navigation vers le slide suivant
   */
  scrollToNext(): void {
    if (!this.carouselTrack) return;
    
    const newIndex = Math.min(this.totalSlides - 1, this.currentSlideIndex + 1);
    if (newIndex !== this.currentSlideIndex) {
      this.scrollToSlideIndex(newIndex);
    }
  }

  /**
   * Scroll vers un slide spécifique avec alignement parfait
   */
  private scrollToSlideIndex(index: number): void {
    if (!this.carouselTrack) return;
    
    const container = this.carouselTrack.nativeElement;
    const slides = container.querySelectorAll('.carousel-slide');
    
    if (slides.length === 0 || !slides[index]) return;
    
    const targetSlide = slides[index] as HTMLElement;
    
    // Calculer la position exacte pour centrer le slide
    const containerWidth = container.clientWidth;
    const slideWidth = targetSlide.offsetWidth;
    const slideOffsetLeft = targetSlide.offsetLeft;
    
    // Position pour centrer parfaitement le slide
    const targetScrollLeft = slideOffsetLeft - (containerWidth - slideWidth) / 2;
    
    // Assurer que la position est dans les limites
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
    
    container.scrollTo({
      left: finalScrollLeft,
      behavior: 'smooth'
    });
    
    // Mettre à jour l'index immédiatement pour éviter les décalages
    this.currentSlideIndex = index;
  }

  /**
   * Navigation vers un slide spécifique (pour les dots)
   */
  scrollToItem(index: number): void {
    if (!this.carouselTrack || index < 0 || index >= this.totalSlides) return;
    
    this.scrollToSlideIndex(index);
  }

  /**
   * Obtient le nombre de slides visible (pour les dots)
   */
  getVisibleSlidesCount(): number {
    const width = window.innerWidth;
    
    if (width >= 1400) return 3;
    if (width >= 1200) return 2;
    if (width >= 768) return 2;
    return 1;
  }

  /**
   * TrackBy function pour optimiser le rendu
   */
  trackByActivity(index: number, activity: Activity): string {
    return activity.id;
  }

  /**
   * Données des activités avec fallback values
   */
  get activities(): Activity[] {
    const translations = this.languageService.currentTranslations;

    // Fallback pour les textes principaux si non définis
    if (!translations.conciergerieTitle) {
      console.warn('conciergerieTitle non défini dans les traductions');
    }
    if (!translations.conciergerieSubtitle) {
      console.warn('conciergerieSubtitle non défini dans les traductions');
    }
    if (!translations.conciergerieServicesTitle) {
      console.warn('conciergerieServicesTitle non défini dans les traductions');
    }

    return [
      {
        id: 'helico',
        title: translations.conciergerieHelico?.title || 'Hélicoptère',
        subtitle: translations.conciergerieHelico?.subtitle || 'Transport premium',
        description: translations.conciergerieHelico?.description || 'Service de transport en hélicoptère',
        image: 'assets/images/helico.jpg'
      },
            {
        id: 's3v',
        title: translations.conciergerieS3V?.title || 'Forfaits Ski S3V',
        subtitle: translations.conciergerieS3V?.subtitle || 'Les 3 Vallées à prix préférentiel',
        description: translations.conciergerieS3V?.description || 'Profitez de tarifs exclusifs sur les forfaits du plus grand domaine skiable du monde',
        image: 'assets/images/photo_off/s3v.jpg'
      },
      {
        id: 'chef',
        title: translations.conciergerieChef?.title || 'Chef privé',
        subtitle: translations.conciergerieChef?.subtitle || 'Cuisine gastronomique',
        description: translations.conciergerieChef?.description || 'Service de chef privé à domicile',
        image: 'assets/images/photo_off/chef_prive.jpg'
      },
      {
        id: 'moniteur',
        title: translations.conciergerieMoniteur?.title || 'Moniteur de ski',
        subtitle: translations.conciergerieMoniteur?.subtitle || 'Cours personnalisés',
        description: translations.conciergerieMoniteur?.description || 'Cours de ski avec moniteur privé',
        image: 'assets/images/photo_off/moniteur.jpg'
      },
      {
        id: 'montgolfiere',
        title: translations.conciergerieMontgolfiere?.title || 'Montgolfière',
        subtitle: translations.conciergerieMontgolfiere?.subtitle || 'Vol panoramique',
        description: translations.conciergerieMontgolfiere?.description || 'Vol en montgolfière au-dessus des Alpes',
        image: 'assets/images/photo_off/montgolfiere.jpg'
      },
      {
        id: 'raquette',
        title: translations.conciergerieRaquette?.title || 'Raquettes',
        subtitle: translations.conciergerieRaquette?.subtitle || 'Randonnée hivernale',
        description: translations.conciergerieRaquette?.description || 'Randonnée en raquettes dans la nature',
        image: 'assets/images/photo_off/raquette.jpg'
      },
      {
        id: 'yoga',
        title: translations.conciergerieYoga?.title || 'Yoga',
        subtitle: translations.conciergerieYoga?.subtitle || 'Bien-être et relaxation',
        description: translations.conciergerieYoga?.description || 'Séances de yoga en montagne',
        image: 'assets/images/photo_off/yoga.jpg'
      },

    ].filter(activity => activity.title && activity.subtitle);
  }

  /**
   * Masque l'indicateur de défilement après le premier scroll utilisateur
   */
  private hideScrollHintOnFirstScroll(): void {
    if (!this.hasUserScrolled) {
      this.hasUserScrolled = true;
      const hint = document.querySelector('.mobile-scroll-hint');
      if (hint) {
        hint.classList.add('hidden');
      }
    }
  }

  /**
   * Navigation vers la section contact
   */
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
