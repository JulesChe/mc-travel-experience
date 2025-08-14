import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Configuration - À adapter selon votre solution choisie
  private readonly API_ENDPOINT = '/api/send-email'; // Pour Cloudflare Workers
  private readonly BACKUP_EMAIL = 'mc.travel73@gmail.com';

  constructor(private http: HttpClient) {}

  /**
   * Envoie un email via l'API (Cloudflare Worker)
   */
  sendEmail(emailData: EmailData): Observable<EmailResponse> {
    const payload = {
      from: emailData.email,
      fromName: emailData.name,
      to: this.BACKUP_EMAIL,
      subject: emailData.subject || `Nouvelle demande de ${emailData.name} - MC Travel`,
      message: emailData.message,
      replyTo: emailData.email
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<EmailResponse>(this.API_ENDPOINT, payload, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur envoi email:', error);
          return throwError(error);
        })
      );
  }

  /**
   * Alternative avec Web3Forms (sans Cloudflare Worker)
   */
  sendEmailWithWeb3Forms(emailData: EmailData, accessKey: string): Observable<any> {
    const payload = {
      access_key: accessKey,
      name: emailData.name,
      email: emailData.email,
      message: emailData.message,
      subject: emailData.subject || `Nouvelle demande de ${emailData.name}`,
      // Optionnel: personnalisation
      from_name: 'MC Travel Website',
      to: this.BACKUP_EMAIL
    };

    return this.http.post('https://api.web3forms.com/submit', payload)
      .pipe(
        catchError(error => {
          console.error('Erreur Web3Forms:', error);
          return throwError(error);
        })
      );
  }

  /**
   * Fallback : ouvre le client email de l'utilisateur
   */
  openEmailClient(emailData: EmailData): void {
    const subject = encodeURIComponent(
      emailData.subject || `Demande de contact - ${emailData.name}`
    );
    
    const body = encodeURIComponent(`
Bonjour MC Travel,

${emailData.message}

Cordialement,
${emailData.name}
Email: ${emailData.email}
    `.trim());
    
    const mailtoLink = `mailto:${this.BACKUP_EMAIL}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  }

  /**
   * Méthode principale avec fallback automatique
   */
  async sendEmailWithFallback(emailData: EmailData, useWeb3Forms: boolean = false, web3FormsKey?: string): Promise<{success: boolean, method: string, message: string}> {
    try {
      if (useWeb3Forms && web3FormsKey) {
        // Utilise Web3Forms
        await this.sendEmailWithWeb3Forms(emailData, web3FormsKey).toPromise();
        return {
          success: true,
          method: 'web3forms',
          message: 'Email envoyé via Web3Forms'
        };
      } else {
        // Utilise l'API Cloudflare Worker
        await this.sendEmail(emailData).toPromise();
        return {
          success: true,
          method: 'api',
          message: 'Email envoyé via API'
        };
      }
    } catch (error) {
      console.warn('Échec de l\'envoi automatique, utilisation du fallback mailto');
      
      // Fallback vers mailto
      this.openEmailClient(emailData);
      return {
        success: true,
        method: 'mailto',
        message: 'Client email ouvert'
      };
    }
  }
}