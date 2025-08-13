import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { EmailService, EmailData } from '../../services/email.service';

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
    <section id="contact" class="pt-12 pb-16 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- En-tête épuré -->
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-light mb-6">
            {{ languageService.currentTranslations.contactTitle }}
          </h2>
          <div class="decorative-line bg-white"></div>
          <p class="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
            {{ languageService.currentTranslations.contactSubtitle }}
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
                  <p class="font-medium text-white mb-1">{{ languageService.currentTranslations.contactAddress }}</p>
                  <p>125 Route du Fay</p>
                  <p>73120 Courchevel, France</p>
                </div>
                
                <div>
                  <p class="font-medium text-white mb-1">{{ languageService.currentTranslations.contactPhone }}</p>
                  <a href="tel:+33620524796" class="text-white hover:text-gray-300 transition-colors">
                    +33(0) 620 524 796
                  </a>
                </div>
                
                <div>
                  <p class="font-medium text-white mb-1">{{ languageService.currentTranslations.contactEmail }}</p>
                  <a href="mailto:mc.travel73@gmail.com" class="text-white hover:text-gray-300 transition-colors">
                    mc.travel73&#64;gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Informations légales simples -->
            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 class="text-lg font-medium mb-4 text-white">{{ languageService.currentTranslations.contactLegalTitle }}</h4>
              <div class="text-sm text-gray-400 space-y-1">
                <p>{{ languageService.currentTranslations.legalAtout }}</p>
                <p>{{ languageService.currentTranslations.legalGuarantee }}</p>
                <p>{{ languageService.currentTranslations.legalInsurance }}</p>
              </div>
            </div>
          </div>
          
          <!-- Formulaire épuré -->
          <div class="animate-fade-in-right delay-400">
            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 class="text-2xl font-semibold mb-6 text-white">{{ languageService.currentTranslations.contactQuoteTitle }}</h3>
              
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
                    [placeholder]="languageService.currentTranslations.formNamePlaceholder"
                    [disabled]="isSubmitting"
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
                    [placeholder]="languageService.currentTranslations.formEmailPlaceholder"
                    [disabled]="isSubmitting"
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
                    [placeholder]="languageService.currentTranslations.formMessagePlaceholder"
                    [disabled]="isSubmitting"
                    required></textarea>
                </div>
                
                <!-- Bouton d'envoi -->
                <div class="animate-fade-in-up delay-500">
                  <button 
                    type="submit"
                    [disabled]="!contactForm.form.valid || isSubmitting"
                    class="btn-primary w-full relative">
                    <span *ngIf="!isSubmitting">{{ languageService.currentTranslations.formSubmit }}</span>
                    <span *ngIf="isSubmitting" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ getSubmittingText() }}
                    </span>
                  </button>
                </div>
                

                
                <!-- Message de statut -->
                <div *ngIf="statusMessage" class="animate-fade-in-up delay-700">
                  <div 
                    class="p-4 rounded-lg text-sm"
                    [ngClass]="{
                      'bg-green-600/20 text-green-300': statusMessage.type === 'success',
                      'bg-orange-600/20 text-orange-300': statusMessage.type === 'info',
                      'bg-red-600/20 text-red-300': statusMessage.type === 'error'
                    }">
                    {{ statusMessage.text }}
                  </div>
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

  isSubmitting = false;
  statusMessage: { text: string; type: 'success' | 'error' | 'info' } | null = null;

  // Configuration - Web3Forms configuré
  private readonly USE_WEB3FORMS = true;
  private readonly WEB3FORMS_ACCESS_KEY = '4ae47fae-7b2c-4d46-b98f-9fc3ca9887b0';

  constructor(
    public languageService: LanguageService,
    private emailService: EmailService
  ) {}

  async onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      this.clearStatus();

      const emailData: EmailData = {
        name: this.formData.name,
        email: this.formData.email,
        message: this.formData.message,
        subject: this.getEmailSubject()
      };

      try {
        const result = await this.emailService.sendEmailWithFallback(
          emailData, 
          this.USE_WEB3FORMS, 
          this.WEB3FORMS_ACCESS_KEY
        );

        this.handleEmailResult(result);
        
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        this.showStatus('error', this.getErrorMessage());
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  openEmailClient() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      const emailData: EmailData = {
        name: this.formData.name,
        email: this.formData.email,
        message: this.formData.message,
        subject: this.getEmailSubject()
      };

      this.emailService.openEmailClient(emailData);
      this.showStatus('info', this.getEmailClientOpenedMessage());
      this.resetForm();
    } else {
      this.showStatus('error', this.getFillFieldsMessage());
    }
  }

  private handleEmailResult(result: {success: boolean, method: string, message: string}) {
    if (result.success) {
      switch (result.method) {
        case 'web3forms':
        case 'api':
          this.showStatus('success', this.getSuccessMessage());
          this.resetForm();
          break;
        case 'mailto':
          this.showStatus('info', this.getEmailClientOpenedMessage());
          this.resetForm();
          break;
      }
    } else {
      this.showStatus('error', this.getErrorMessage());
    }
  }

  private showStatus(type: 'success' | 'error' | 'info', text: string) {
    this.statusMessage = { type, text };
    // Auto-hide après 5 secondes
    setTimeout(() => {
      this.clearStatus();
    }, 5000);
  }

  private clearStatus() {
    this.statusMessage = null;
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }

  // Méthodes pour les textes traduits
  private getEmailSubject(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? `Nouvelle demande de ${this.formData.name} - MC Travel`
      : `New inquiry from ${this.formData.name} - MC Travel`;
  }

  getSubmittingText(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? 'Envoi en cours...'
      : 'Sending...';
  }

  getEmailClientText(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? '📧 Ouvrir mon client email'
      : '📧 Open my email client';
  }

  private getSuccessMessage(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? 'Votre message a été envoyé avec succès à MC Travel !'
      : 'Your message has been successfully sent to MC Travel!';
  }

  private getErrorMessage(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? 'Une erreur est survenue. Utilisez le bouton email ci-dessous.'
      : 'An error occurred. Please use the email button below.';
  }

  private getEmailClientOpenedMessage(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? 'Votre client email s\'ouvre avec le message pré-rempli.'
      : 'Your email client opens with the pre-filled message.';
  }

  private getFillFieldsMessage(): string {
    return this.languageService.currentLanguage === 'fr' 
      ? 'Veuillez remplir tous les champs obligatoires.'
      : 'Please fill in all required fields.';
  }
}