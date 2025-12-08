import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { EmailService, EmailData } from '../../services/email.service';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="pt-32 pb-24 bg-[#1c1c1c] text-stone-200 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <div class="text-center mb-24 animate-fade-in-up">
          <h2 class="text-4xl md:text-6xl font-serif text-white mb-6 italic">
            {{ languageService.currentTranslations.contactTitle }}
          </h2>
          <p class="text-xl text-stone-400 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            {{ languageService.currentTranslations.contactSubtitle }}
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto">

          <div class="animate-fade-in-left delay-200 space-y-12">

            <div class="space-y-8">
              <h3 class="text-2xl font-serif text-white">MC Travel Experiences</h3>

              <div class="space-y-6 text-stone-400 font-light tracking-wide">
                <div>
                  <p class="text-white uppercase text-xs tracking-[0.2em] mb-2">{{ languageService.currentTranslations.contactAddress }}</p>
                  <p>125 Route du Fay, 73120 Courchevel, France</p>
                </div>

                <div class="grid grid-cols-2 gap-8">
                   <div>
                     <p class="text-white uppercase text-xs tracking-[0.2em] mb-2">Charlotte</p>
                     <a href="tel:+33603316762" class="hover:text-white transition-colors">+33 6 03 31 67 62</a>
                   </div>
                   <div>
                     <p class="text-white uppercase text-xs tracking-[0.2em] mb-2">Morgan</p>
                     <a href="tel:+33620524796" class="hover:text-white transition-colors">+33 6 20 52 47 96</a>
                   </div>
                </div>

                <div>
                  <p class="text-white uppercase text-xs tracking-[0.2em] mb-2">{{ languageService.currentTranslations.contactEmail }}</p>
                  <a href="mailto:mc.travel73@gmail.com" class="hover:text-white transition-colors">mc.travel73&#64;gmail.com</a>
                </div>
              </div>
            </div>

            <div class="pt-8 border-t border-white/10">
              <h4 class="text-sm uppercase tracking-widest text-white mb-4">{{ languageService.currentTranslations.contactLegalTitle }}</h4>
              <div class="text-xs text-stone-500 space-y-2 font-light">
                <p>{{ languageService.currentTranslations.legalAtout }}</p>
                <p>{{ languageService.currentTranslations.legalGuarantee }}</p>
                <p>{{ languageService.currentTranslations.legalInsurance }}</p>
              </div>
            </div>
          </div>

          <div class="animate-fade-in-right delay-400">
            <div class="bg-white/5 p-10 border border-white/10">
              <h3 class="text-2xl font-serif text-white mb-8">{{ languageService.currentTranslations.contactQuoteTitle }}</h3>

              <form class="space-y-8" (ngSubmit)="onSubmit()" #contactForm="ngForm">

                <div class="grid md:grid-cols-2 gap-8">
                   <div class="space-y-2">
                     <label class="text-xs uppercase tracking-widest text-stone-500">
                       {{ languageService.currentTranslations.formName }} *
                     </label>
                     <input type="text" name="name" [(ngModel)]="formData.name"
                       class="w-full bg-transparent border-b border-stone-600 py-2 text-white placeholder-stone-700 focus:outline-none focus:border-white transition-colors rounded-none"
                       [placeholder]="languageService.currentTranslations.formNamePlaceholder"
                       [disabled]="isSubmitting" required>
                   </div>

                   <div class="space-y-2">
                     <label class="text-xs uppercase tracking-widest text-stone-500">
                       {{ languageService.currentTranslations.formEmail }} *
                     </label>
                     <input type="email" name="email" [(ngModel)]="formData.email"
                       class="w-full bg-transparent border-b border-stone-600 py-2 text-white placeholder-stone-700 focus:outline-none focus:border-white transition-colors rounded-none"
                       [placeholder]="languageService.currentTranslations.formEmailPlaceholder"
                       [disabled]="isSubmitting" required>
                   </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-stone-500">
                    {{ languageService.currentTranslations.formPhone || 'Téléphone' }}
                  </label>
                  <input type="tel" name="phone" [(ngModel)]="formData.phone"
                    class="w-full bg-transparent border-b border-stone-600 py-2 text-white placeholder-stone-700 focus:outline-none focus:border-white transition-colors rounded-none"
                    [placeholder]="languageService.currentTranslations.formPhonePlaceholder || '+33 6 XX XX XX XX'"
                    [disabled]="isSubmitting">
                </div>

                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-stone-500">
                    {{ languageService.currentTranslations.formMessage }} *
                  </label>
                  <textarea rows="4" name="message" [(ngModel)]="formData.message"
                    class="w-full bg-transparent border-b border-stone-600 py-2 text-white placeholder-stone-700 focus:outline-none focus:border-white transition-colors rounded-none resize-none"
                    [placeholder]="languageService.currentTranslations.formMessagePlaceholder"
                    [disabled]="isSubmitting" required></textarea>
                </div>

                <button type="submit" [disabled]="!contactForm.form.valid || isSubmitting"
                  class="w-full bg-white text-black py-4 uppercase tracking-widest text-sm hover:bg-stone-200 transition-colors duration-300 disabled:opacity-50">
                  <span *ngIf="!isSubmitting">{{ languageService.currentTranslations.formSubmit }}</span>
                  <span *ngIf="isSubmitting">{{ getSubmittingText() }}...</span>
                </button>

                <div *ngIf="statusMessage" class="text-sm mt-4 text-center"
                   [ngClass]="{
                     'text-green-400': statusMessage.type === 'success',
                     'text-red-400': statusMessage.type === 'error',
                     'text-blue-400': statusMessage.type === 'info'
                   }">
                  {{ statusMessage.text }}
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
  formData: ContactForm = { name: '', email: '', phone: '', message: '' };
  isSubmitting = false;
  statusMessage: { text: string; type: 'success' | 'error' | 'info' } | null = null;
  private readonly USE_WEB3FORMS = true;
  private readonly WEB3FORMS_ACCESS_KEY = '4ae47fae-7b2c-4d46-b98f-9fc3ca9887b0';

  constructor(public languageService: LanguageService, private emailService: EmailService) {}

  async onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      this.clearStatus();
      const emailData: EmailData = {
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        message: this.formData.message,
        subject: this.getEmailSubject()
      };
      try {
        const result = await this.emailService.sendEmailWithFallback(emailData, this.USE_WEB3FORMS, this.WEB3FORMS_ACCESS_KEY);
        this.handleEmailResult(result);
      } catch (error) {
        this.showStatus('error', this.getErrorMessage());
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  private handleEmailResult(result: {success: boolean, method: string, message: string}) {
    if (result.success) {
      this.showStatus(result.method === 'mailto' ? 'info' : 'success',
        result.method === 'mailto' ? this.getEmailClientOpenedMessage() : this.getSuccessMessage());
      if (result.method !== 'mailto') this.resetForm();
    } else {
      this.showStatus('error', this.getErrorMessage());
    }
  }

  private showStatus(type: 'success' | 'error' | 'info', text: string) {
    this.statusMessage = { type, text };
    setTimeout(() => { this.clearStatus(); }, 5000);
  }

  private clearStatus() { this.statusMessage = null; }
  private resetForm() { this.formData = { name: '', email: '', phone: '', message: '' }; }
  private getEmailSubject(): string {
    return this.languageService.currentLanguage === 'fr' ? `Nouvelle demande de ${this.formData.name}` : `New inquiry from ${this.formData.name}`;
  }
  getSubmittingText(): string { return this.languageService.currentTranslations.submittingText; }
  private getSuccessMessage(): string { return this.languageService.currentTranslations.successMessage; }
  private getErrorMessage(): string { return this.languageService.currentTranslations.errorMessage; }
  private getEmailClientOpenedMessage(): string { return this.languageService.currentTranslations.emailClientMessage; }
}
