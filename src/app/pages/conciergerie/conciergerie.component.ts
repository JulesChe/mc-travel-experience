import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceCardComponent, Activity } from '../../components/service-card/service-card.component';
import { FooterComponent, FooterConfig } from '../../components/footer/footer.component';

@Component({
  selector: 'app-conciergerie',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceCardComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-[#F5F4F0] text-[#1c1c1c]">

      <section class="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <div class="absolute inset-0">
          <img
            src="assets/images/photo_off/chalet.jpg"
            alt="Conciergerie de luxe"
            class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/30"></div>
        </div>

        <div class="relative z-10 text-center px-4 animate-fade-in-up">
          <span class="block text-white/90 uppercase tracking-[0.3em] text-xs md:text-sm mb-6">
            {{ languageService.currentTranslations.conciergerieSubtitle || 'Services Exclusifs' }}
          </span>
          <h1 class="text-5xl md:text-7xl font-serif text-white italic tracking-wide mb-8">
            {{ languageService.currentTranslations.conciergerieTitle || 'La Conciergerie' }}
          </h1>
          <div class="w-[1px] h-16 bg-white/60 mx-auto"></div>
        </div>
      </section>

      <section class="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
        <p class="text-xl md:text-2xl font-light text-[#57534e] leading-relaxed font-serif italic max-w-4xl mx-auto">
          {{ languageService.currentLanguage === 'fr'
             ? 'Nous orchestrons chaque détail de votre séjour pour créer des moments inoubliables.'
             : 'We orchestrate every detail of your stay to create unforgettable moments.' }}
        </p>
      </section>

      <section class="pb-32 overflow-hidden">
        <div class="max-w-[1800px] mx-auto px-4 md:px-8">

          <div class="flex flex-col md:flex-row justify-between items-end mb-12 px-4 border-b border-[#1c1c1c]/10 pb-6">
            <div>
              <h2 class="text-3xl md:text-5xl font-serif text-[#1c1c1c] mb-2">
                {{ languageService.currentTranslations.conciergerieServicesTitle || 'Expériences sur mesure' }}
              </h2>
            </div>

            <div class="flex gap-4 mt-6 md:mt-0">
              <button
                (click)="scrollToPrevious()"
                [class.opacity-30]="!canScrollLeft"
                class="w-12 h-12 flex items-center justify-center border border-[#1c1c1c]/20 hover:border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white transition-all duration-300 rounded-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                (click)="scrollToNext()"
                [class.opacity-30]="!canScrollRight"
                class="w-12 h-12 flex items-center justify-center border border-[#1c1c1c]/20 hover:border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white transition-all duration-300 rounded-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <div
            #carouselTrack
            class="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory scrollbar-hide"
            style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;">

            <div *ngFor="let activity of activities; let i = index; trackBy: trackByActivity"
                 class="carousel-slide flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center">
              <app-service-card [activity]="activity"></app-service-card>
            </div>

            <div class="w-4 flex-shrink-0"></div>
          </div>

          <div class="w-full bg-[#1c1c1c]/5 h-[1px] mt-8 max-w-7xl mx-auto relative overflow-hidden">
            <div class="absolute top-0 left-0 h-full bg-[#1c1c1c] transition-all duration-500"
                 [style.width.%]="((currentSlideIndex + 1) / totalSlides) * 100">
            </div>
          </div>

        </div>
      </section>

      <app-footer [showAdditionalInfo]="true"></app-footer>
    </div>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; transform: translateY(20px); }
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ConciergerieComponent implements OnInit, OnDestroy {
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>;

  currentSlideIndex = 0;
  totalSlides = 0;
  canScrollLeft = false;
  canScrollRight = true;
  private intersectionObserver?: IntersectionObserver;

  footerConfig: FooterConfig = {
    title: undefined,
    subtitle: undefined,
    buttonText: undefined
  };

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.totalSlides = this.activities.length;
    this.canScrollLeft = false;
    this.canScrollRight = this.totalSlides > 1;
    setTimeout(() => { this.setupSlideObserver(); }, 100);
  }

  ngOnDestroy() {
    if (this.intersectionObserver) { this.intersectionObserver.disconnect(); }
  }

  private setupSlideObserver(): void {
    if (!this.carouselTrack) return;
    const options = { root: this.carouselTrack.nativeElement, rootMargin: '0px', threshold: 0.6 };
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const index = Array.from(this.carouselTrack.nativeElement.children).indexOf(target);
          if (index !== -1) { this.currentSlideIndex = index; }
        }
      });
    }, options);
    const slides = this.carouselTrack.nativeElement.querySelectorAll('.carousel-slide');
    slides.forEach(slide => this.intersectionObserver!.observe(slide));
    this.carouselTrack.nativeElement.addEventListener('scroll', () => { this.updateNavigationState(); }, { passive: true });
    this.updateNavigationState();
  }

  private updateNavigationState(): void {
    if (!this.carouselTrack) return;
    const container = this.carouselTrack.nativeElement;
    this.canScrollLeft = container.scrollLeft > 5;
    this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 5);
  }

  scrollToPrevious(): void {
    if (!this.carouselTrack) return;
    const container = this.carouselTrack.nativeElement;
    const slideWidth = container.firstElementChild?.clientWidth || 0;
    container.scrollBy({ left: -slideWidth - 32, behavior: 'smooth' });
  }

  scrollToNext(): void {
    if (!this.carouselTrack) return;
    const container = this.carouselTrack.nativeElement;
    const slideWidth = container.firstElementChild?.clientWidth || 0;
    container.scrollBy({ left: slideWidth + 32, behavior: 'smooth' });
  }

  trackByActivity(index: number, activity: Activity): string { return activity.id; }

  get activities(): Activity[] {
    const translations = this.languageService.currentTranslations;
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
      }
    ].filter(activity => activity.title && activity.subtitle);
  }

  goToContact(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }, 100);
    });
  }
}
