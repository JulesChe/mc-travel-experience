// pages/home-page/home-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Composants existants (hiver)
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ExcellenceSectionComponent } from '../../components/excellence-section/excellence-section.component';
import { DestinationsSectionComponent } from '../../components/destinations-section/destinations-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { AccommodationsSectionComponent } from '../../components/accommodations-section/accommodations-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

// Services
import { SeasonService, Season } from '../../services/season.service';
import { LanguageService } from '../../services/language.service';

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
    <!-- Contenu Hiver (existant) -->
    <div *ngIf="currentSeason === 'winter'">
      <app-hero-section></app-hero-section>
      <app-excellence-section></app-excellence-section>
      <app-destinations-section></app-destinations-section>
      <app-services-section></app-services-section>
      <app-accommodations-section></app-accommodations-section>
      <app-contact-section></app-contact-section>
    </div>

    <!-- Contenu Été (nouveau) -->
    <div *ngIf="currentSeason === 'summer'">
      
      <!-- Hero Section Été (même style que l'hiver) -->
      <section class="relative h-screen overflow-hidden flex items-center justify-center">
        <video 
          #heroVideo
          class="absolute inset-0 w-full h-full object-cover"
          autoplay 
          muted 
          loop
          playsinline
          [poster]="seasonContent.heroPoster">
          <source [src]="seasonContent.heroVideo" type="video/mp4">
        </video>
        
        <div class="absolute inset-0 bg-black/40"></div>
        
        <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div class="animate-fade-in-up">
            <h1 class="text-5xl md:text-7xl font-light mb-8 tracking-wide leading-tight">
              <span class="block font-serif italic">{{ seasonContent.heroTitle }}</span>
            </h1>
          </div>
          
          <div class="decorative-line animate-fade-in-up delay-200"></div>
          
          <div class="animate-fade-in-up delay-300">
            <p class="text-xl md:text-2xl font-light mb-12 leading-relaxed opacity-90">
              {{ seasonContent.heroSubtitle }}
            </p>
          </div>
        </div>
        
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div class="flex flex-col items-center space-y-2">
            <span class="text-xs uppercase tracking-wide opacity-80">{{ languageService.currentTranslations.discoverScroll }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <!-- Menu Navigation Été -->
      <nav class="bg-white sticky top-0 z-30 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-center space-x-8 py-6">
            <button 
              (click)="scrollToSection('destinations')"
              class="text-lg font-light text-gray-700 hover:text-[#151c32] transition-colors uppercase tracking-wide">
              Destinations
            </button>
            <span class="text-gray-300">|</span>
            <button 
              (click)="scrollToSection('hebergements')"
              class="text-lg font-light text-gray-700 hover:text-[#151c32] transition-colors uppercase tracking-wide">
              Hébergements
            </button>
            <span class="text-gray-300">|</span>
            <button 
              (click)="scrollToSection('activites')"
              class="text-lg font-light text-gray-700 hover:text-[#151c32] transition-colors uppercase tracking-wide">
              Activités
            </button>
          </div>
        </div>
      </nav>

      <!-- Section Destinations Été -->
      <section id="destinations" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-16 animate-fade-in-up">
            <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {{ languageService.currentLanguage === 'fr' ? 'Destinations d\'Été' : 'Summer Destinations' }}
            </h2>
            <div class="decorative-line"></div>
            <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
              {{ languageService.currentLanguage === 'fr' 
                ? 'Explorez nos destinations estivales soigneusement sélectionnées'
                : 'Explore our carefully selected summer destinations' }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12">
            <div *ngFor="let destination of seasonContent.destinations; let i = index" 
                 class="group cursor-pointer animate-fade-in-up"
                 [style.animation-delay]="(i * 100) + 'ms'">
              
              <div class="relative overflow-hidden rounded-lg shadow-xl">
                <img 
                  [src]="destination.image"
                  [alt]="destination.name"
                  class="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110">
                
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 class="text-3xl font-light mb-2">{{ destination.name }}</h3>
                  <p class="text-lg font-light opacity-90">{{ destination.subtitle }}</p>
                </div>
              </div>
              
              <div class="mt-6 px-4">
                <p class="text-gray-600 leading-relaxed mb-4">{{ destination.description }}</p>
                
                <div *ngIf="destination.highlights" class="flex flex-wrap gap-2 mt-4">
                  <span *ngFor="let highlight of destination.highlights" 
                        class="px-3 py-1 bg-[#fff0cf] text-[#151c32] text-sm rounded-full">
                    {{ highlight }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Hébergements Été -->
      <section id="hebergements" class="py-24 bg-[#fff0cf]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-16 animate-fade-in-up">
            <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {{ languageService.currentLanguage === 'fr' ? 'Hébergements d\'Exception' : 'Exceptional Accommodations' }}
            </h2>
            <div class="decorative-line"></div>
            <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
              {{ languageService.currentLanguage === 'fr' 
                ? 'Des lieux uniques pour des séjours mémorables'
                : 'Unique places for memorable stays' }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div *ngFor="let accommodation of seasonContent.accommodations; let i = index"
                 class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                 [style.animation-delay]="(i * 100) + 'ms'">
              
              <div class="relative h-48 overflow-hidden">
                <img 
                  [src]="accommodation.image"
                  [alt]="accommodation.name"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span class="text-xs font-medium text-gray-700">{{ accommodation.type }}</span>
                </div>
              </div>
              
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ accommodation.name }}</h3>
                <p class="text-sm text-gray-500 mb-3">
                  <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ accommodation.location }}
                </p>
                <p class="text-gray-600 text-sm leading-relaxed">{{ accommodation.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Activités Été -->
      <section id="activites" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-16 animate-fade-in-up">
            <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {{ languageService.currentLanguage === 'fr' ? 'Activités Estivales' : 'Summer Activities' }}
            </h2>
            <div class="decorative-line"></div>
            <p class="text-lg text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
              {{ languageService.currentLanguage === 'fr' 
                ? 'Des expériences uniques pour tous les goûts'
                : 'Unique experiences for all tastes' }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let activity of seasonContent.activities; let i = index"
                 class="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up cursor-pointer"
                 [style.animation-delay]="(i * 100) + 'ms'">
              
              <div class="relative h-80">
                <img 
                  [src]="activity.image"
                  [alt]="activity.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                
                <!-- Overlay avec dégradé -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <!-- Contenu au survol -->
                <div class="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 class="text-2xl font-semibold mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
                    {{ activity.name }}
                  </h3>
                  <p class="text-lg font-light mb-3 opacity-90">{{ activity.subtitle }}</p>
                  
                  <!-- Description cachée qui apparaît au hover -->
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p class="text-sm leading-relaxed">{{ activity.description }}</p>
                    
                    <button class="mt-4 inline-flex items-center text-white hover:text-[#fff0cf] transition-colors">
                      <span class="mr-2">{{ languageService.currentLanguage === 'fr' ? 'En savoir plus' : 'Learn more' }}</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">