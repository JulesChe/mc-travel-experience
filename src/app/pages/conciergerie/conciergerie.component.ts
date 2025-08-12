// conciergerie.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
  // État du carrousel
  currentIndex = 0;
  translateX = 0;
  isTransitioning = false;
  noTransition = false;
  
  // Configuration
  cardWidth = 320;
  cardGap = 24;
  cardsToShow = 3;
  
  // Données
  extendedActivities: Activity[] = [];
  
  // Listeners
  private resizeListener?: () => void;
  private transitionEndListener?: () => void;
  
  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.updateCarouselSettings();
    this.setupInfiniteLoop();
    this.setInitialPosition();
    
    // Resize listener
    this.resizeListener = () => {
      this.updateCarouselSettings();
      this.setupInfiniteLoop();
      this.setInitialPosition();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Met à jour les paramètres du carrousel selon la taille d'écran
   */
  private updateCarouselSettings(): void {
    const width = window.innerWidth;
    
    if (width >= 1600) {
      this.cardsToShow = 3;
      this.cardWidth = 340;
      this.cardGap = 24;
    } else if (width >= 1400) {
      this.cardsToShow = 3;
      this.cardWidth = 320;
      this.cardGap = 24;
    } else if (width >= 1200) {
      this.cardsToShow = 3;
      this.cardWidth = 300;
      this.cardGap = 24;
    } else if (width >= 1024) {
      this.cardsToShow = 3;
      this.cardWidth = 280;
      this.cardGap = 20;
    } else if (width >= 768) {
      this.cardsToShow = 2;
      this.cardWidth = 260;
      this.cardGap = 16;
    } else if (width >= 640) {
      this.cardsToShow = 1;
      this.cardWidth = Math.min(width - 128, 320);
      this.cardGap = 12;
    } else {
      this.cardsToShow = 1;
      this.cardWidth = Math.min(width - 112, 300);
      this.cardGap = 12;
    }
  }

  /**
   * Prépare les données pour la boucle infinie
   */
  private setupInfiniteLoop(): void {
    const original = this.activities;
    
    if (original.length === 0) {
      this.extendedActivities = [];
      return;
    }

    // Cloner les éléments pour créer une boucle
    const clonesNeeded = Math.max(this.cardsToShow, 3);
    
    // Créer des clones avant et après
    const clonesBefore = original.slice(-clonesNeeded).map(item => ({
      ...item,
      id: `${item.id}_before`
    }));
    
    const clonesAfter = original.slice(0, clonesNeeded).map(item => ({
      ...item,
      id: `${item.id}_after`
    }));
    
    // Assemblage: [clones avant] + [originaux] + [clones après]
    this.extendedActivities = [...clonesBefore, ...original, ...clonesAfter];
  }

  /**
   * Définit la position initiale centrée
   */
  private setInitialPosition(): void {
    if (this.activities.length === 0) return;
    
    // Nombre de clones avant
    const clonesBeforeCount = Math.max(this.cardsToShow, 3);
    
    // Calculer le décalage pour centrer les cartes visibles
    const viewportWidth = this.getViewportWidth();
    const totalCardsWidth = this.cardsToShow * this.cardWidth + (this.cardsToShow - 1) * this.cardGap;
    const centerOffset = (viewportWidth - totalCardsWidth) / 2;
    
    // Position de départ (premier élément original)
    this.currentIndex = clonesBeforeCount;
    this.translateX = -(this.currentIndex * (this.cardWidth + this.cardGap)) + centerOffset;
  }

  /**
   * Obtient la largeur du viewport
   */
  private getViewportWidth(): number {
    const containerWidth = window.innerWidth;
    const margins = 96; // 6rem de marges (3rem de chaque côté)
    const maxWidth = 1200; // max-width du viewport
    
    return Math.min(containerWidth - margins, maxWidth);
  }

  /**
   * Calcule la position de translation pour un index donné
   */
  private calculateTranslateX(index: number): number {
    const viewportWidth = this.getViewportWidth();
    const totalCardsWidth = this.cardsToShow * this.cardWidth + (this.cardsToShow - 1) * this.cardGap;
    const centerOffset = (viewportWidth - totalCardsWidth) / 2;
    
    return -(index * (this.cardWidth + this.cardGap)) + centerOffset;
  }

  /**
   * Navigation vers la carte suivante
   */
  nextSlide(): void {
    if (this.isTransitioning || this.activities.length === 0) return;
    
    this.isTransitioning = true;
    this.currentIndex++;
    this.translateX = this.calculateTranslateX(this.currentIndex);
    
    // Vérifier si on a atteint la fin (clones)
    setTimeout(() => {
      const clonesBeforeCount = Math.max(this.cardsToShow, 3);
      const lastOriginalIndex = clonesBeforeCount + this.activities.length - 1;
      
      if (this.currentIndex > lastOriginalIndex) {
        // Sauter au début sans animation
        this.noTransition = true;
        this.currentIndex = clonesBeforeCount;
        this.translateX = this.calculateTranslateX(this.currentIndex);
        
        setTimeout(() => {
          this.noTransition = false;
        }, 10);
      }
      
      this.isTransitioning = false;
    }, 250);
  }

  /**
   * Navigation vers la carte précédente
   */
  previousSlide(): void {
    if (this.isTransitioning || this.activities.length === 0) return;
    
    this.isTransitioning = true;
    this.currentIndex--;
    this.translateX = this.calculateTranslateX(this.currentIndex);
    
    // Vérifier si on a atteint le début (clones)
    setTimeout(() => {
      const clonesBeforeCount = Math.max(this.cardsToShow, 3);
      
      if (this.currentIndex < clonesBeforeCount) {
        // Sauter à la fin sans animation
        this.noTransition = true;
        this.currentIndex = clonesBeforeCount + this.activities.length - 1;
        this.translateX = this.calculateTranslateX(this.currentIndex);
        
        setTimeout(() => {
          this.noTransition = false;
        }, 50);
      }
      
      this.isTransitioning = false;
    }, 500);
  }

  /**
   * Navigation vers une carte spécifique (pour les dots)
   */
  goToSlide(index: number): void {
    if (this.isTransitioning || this.activities.length === 0) return;
    
    const clonesBeforeCount = Math.max(this.cardsToShow, 3);
    
    this.isTransitioning = true;
    this.currentIndex = clonesBeforeCount + index;
    this.translateX = this.calculateTranslateX(this.currentIndex);
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  /**
   * Obtient l'index réel (sans les clones)
   */
  private getRealIndex(): number {
    const clonesBeforeCount = Math.max(this.cardsToShow, 3);
    return (this.currentIndex - clonesBeforeCount + this.activities.length) % this.activities.length;
  }

  /**
   * Vérifie si un dot est actif
   */
  isDotActive(index: number): boolean {
    return this.getRealIndex() === index;
  }

  /**
   * Génère le tableau pour les dots
   */
  getDots(): number[] {
    return Array(this.activities.length).fill(0).map((_, i) => i);
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
    ].filter(activity => activity.title && activity.subtitle);
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