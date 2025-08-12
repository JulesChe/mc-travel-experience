import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ExcellenceSectionComponent } from '../../components/excellence-section/excellence-section.component';
import { DestinationsSectionComponent } from '../../components/destinations-section/destinations-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { AccommodationsSectionComponent } from '../../components/accommodations-section/accommodations-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    ExcellenceSectionComponent,
    DestinationsSectionComponent,
    ServicesSectionComponent,
    AccommodationsSectionComponent,
    ContactSectionComponent
  ],
  template: `
    <!-- Page d'accueil - toutes les sections -->
    <app-hero-section></app-hero-section>
    <app-excellence-section></app-excellence-section>
    <app-destinations-section></app-destinations-section>
    <app-services-section></app-services-section>
    <app-accommodations-section></app-accommodations-section>
    <app-contact-section></app-contact-section>
  `
})
export class HomeComponent {}