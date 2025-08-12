import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-16 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- En-tête épuré -->
        <div class="text-center mb-5 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-light mb-6">
            {{ languageService.currentTranslations.contactTitle }}
          </h2>
          <div class="decorative-line bg-white"></div>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prêt à vivre une expérience alpine d'exception ? Contactez-nous pour créer votre séjour sur mesure.
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          <!-- Informations de contact épurées -->
          <div class="animate-fade-in-left delay-200">
            
            <!-- Carte principale simple -->
            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 mb-8 border border-white/10">
              <h3 class="text-2xl font-semibold mb-6 text-white">MC Travel Experiences</h3>
              
              <div class="space-y-4 text-gray-300">
                <div>
                  <p class="font-medium text-white mb-1">Adresse</p>
                  <p>125 Route du Fay</p>
                  <p>73120 Courchevel, France</p>
                </div>
                
                <div>
                  <p class="font-medium text-white mb-1">Téléphone</p>
                  <a href="tel:+33620524796" class="text-white hover:text-gray-300 transition-colors">
                    +33(0) 620 524 796
                  </a>
                </div>
                
                <div>
                  <p class="font-medium text-white mb-1">Email</p>
                  <a href="mailto:mc.travel73@gmail.com" class="text-white hover:text-gray-300 transition-colors">
                    mc.travel73&#64;gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Informations légales simples -->
            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 class="text-lg font-medium mb-4 text-white">Informations légales</h4>
              <div class="text-sm text-gray-400 space-y-1">
                <p>N° ATOUT FRANCE : IM073250002</p>
                <p>Garantie financière : APST</p>
                <p>Assurance RCP : Hiscox</p>
              </div>
            </div>
          </div>
          
          <!-- Formulaire épuré -->
          <div class="animate-fade-in-right delay-400">
            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 class="text-2xl font-semibold mb-6 text-white">Demande de devis</h3>
              
              <form class="clean-form space-y-6" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                
                <!-- Nom -->
                <div class="animate-fade-in-up delay-500">
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    {{ languageService.currentTranslations.formName }} *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    [(ngModel)]="formData.name"
                    class="w-full px-4 py-3"
                    placeholder="Votre nom complet"
                    required>
                </div>
                
                <!-- Email -->
                <div class="animate-fade-in-up delay-500">
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    {{ languageService.currentTranslations.formEmail }} *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    [(ngModel)]="formData.email"
                    class="w-full px-4 py-3"
                    placeholder="votre@email.com"
                    required>
                </div>
                
                <!-- Message -->
                <div class="animate-fade-in-up delay-500">
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    {{ languageService.currentTranslations.formMessage }} *
                  </label>
                  <textarea 
                    rows="4" 
                    name="message"
                    [(ngModel)]="formData.message"
                    class="w-full px-4 py-3 resize-none"
                    placeholder="Décrivez-nous votre projet de séjour..."
                    required></textarea>
                </div>
                
                <!-- Bouton d'envoi -->
                <div class="animate-fade-in-up delay-500">
                  <button 
                    type="submit"
                    [disabled]="!contactForm.form.valid"
                    class="btn-primary w-full">
                    {{ languageService.currentTranslations.formSubmit }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactSectionComponent {
  formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor(public languageService: LanguageService) {}

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      console.log('Formulaire soumis:', this.formData);
      alert('Votre demande a été envoyée avec succès !');
      this.resetForm();
    }
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }
}