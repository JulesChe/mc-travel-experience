// pages/conciergerie/conciergerie.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceCardComponent, Activity } from '../../components/service-card/service-card.component';

@Component({
  selector: 'app-conciergerie',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceCardComponent],
  templateUrl: './conciergerie.component.html',
  styleUrls: ['./conciergerie.component.scss']
})
export class ConciergerieComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  cardsPerView = 3;
  slideWidth = 350; // Width including gap
  private resizeListener?: () => void;
  
  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.updateCardsPerView();
    
    // Add resize listener with proper cleanup
    this.resizeListener = () => this.updateCardsPerView();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Update cards per view based on screen size
   */
  private updateCardsPerView(): void {
    const width = window.innerWidth;
    
    if (width < 640) {
      this.cardsPerView = 1;
      this.slideWidth = Math.min(width - 64, 280) + 24;
    } else if (width < 1024) {
      this.cardsPerView = 2;
      this.slideWidth = 304; // 280px + 24px gap
    } else if (width < 1400) {
      this.cardsPerView = 3;
      this.slideWidth = 326; // 320px + 6px gap
    } else {
      this.cardsPerView = 3;
      this.slideWidth = 326;
    }
    
    // Adjust current slide if necessary
    if (this.currentSlide > this.maxSlides) {
      this.currentSlide = Math.max(0, this.maxSlides);
    }
  }

  /**
   * Get activities data from translations
   */
  get activities(): Activity[] {
    const translations = this.languageService.currentTranslations;
    
    return [
      {
        id: 'helico',
        title: translations.conciergerieHelico?.title || 'Hélicoptère',
        subtitle: translations.conciergerieHelico?.subtitle || 'Transport premium',
        description: translations.conciergerieHelico?.description || 'Service de transport en hélicoptère',
        image: 'assets/images/pas libre de droit/tsr-cmbh.jpg'
      },
      {
        id: 'chef',
        title: translations.conciergerieChef?.title || 'Chef privé',
        subtitle: translations.conciergerieChef?.subtitle || 'Cuisine gastronomique',
        description: translations.conciergerieChef?.description || 'Service de chef privé à domicile',
        image: 'assets/images/montagne_cover.jpg'
      },
      {
        id: 'moniteur',
        title: translations.conciergerieMoniteur?.title || 'Moniteur de ski',
        subtitle: translations.conciergerieMoniteur?.subtitle || 'Cours personnalisés',
        description: translations.conciergerieMoniteur?.description || 'Cours de ski avec moniteur privé',
        image: 'assets/images/pas libre de droit/espace_killy_2.jpg'
      },
      {
        id: 'montgolfiere',
        title: translations.conciergerieMontgolfiere?.title || 'Montgolfière',
        subtitle: translations.conciergerieMontgolfiere?.subtitle || 'Vol panoramique',
        description: translations.conciergerieMontgolfiere?.description || 'Vol en montgolfière au-dessus des Alpes',
        image: 'assets/images/montagne_cover.jpg'
      },
      {
        id: 'raquette',
        title: translations.conciergerieRaquette?.title || 'Raquettes',
        subtitle: translations.conciergerieRaquette?.subtitle || 'Randonnée hivernale',
        description: translations.conciergerieRaquette?.description || 'Randonnée en raquettes dans la nature',
        image: 'assets/images/montagne_cover.jpg'
      },
      {
        id: 'yoga',
        title: translations.conciergerieYoga?.title || 'Yoga',
        subtitle: translations.conciergerieYoga?.subtitle || 'Bien-être et relaxation',
        description: translations.conciergerieYoga?.description || 'Séances de yoga en montagne',
        image: 'assets/images/pas libre de droit/espace_killy_2.jpg'
      },
      {
        id: 'husky',
        title: translations.conciergerieHusky?.title || 'Chiens de traîneau',
        subtitle: translations.conciergerieHusky?.subtitle || 'Aventure nordique',
        description: translations.conciergerieHusky?.description || 'Balade en traîneau à chiens',
        image: 'assets/images/montagne_cover.jpg'
      }
    ].filter(activity => activity.title && activity.subtitle); // Filter out activities without proper translations
  }

  /**
   * Get maximum number of slides
   */
  get maxSlides(): number {
    return Math.max(0, this.activities.length - this.cardsPerView);
  }

  /**
   * Navigate to next slide
   */
  nextSlide(): void {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    }
  }

  /**
   * Navigate to previous slide
   */
  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number): void {
    this.currentSlide = Math.min(Math.max(0, index), this.maxSlides);
  }

  /**
   * Check if current slide is the last one
   */
  isLastSlide(): boolean {
    return this.currentSlide >= this.maxSlides;
  }

  /**
   * Get array for dots navigation
   */
  getDots(): number[] {
    const dotsCount = Math.max(1, this.maxSlides + 1);
    return Array(dotsCount).fill(0).map((_, i) => i);
  }

  /**
   * Navigate to contact section
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

  /**
   * Handle quote request from activity card
   */
  onActivityQuoteRequest(activity: Activity): void {
    console.log('Demande de devis pour l\'activité:', activity.title);
    this.goToContact();
  }
}