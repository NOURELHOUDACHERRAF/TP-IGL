import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaborantinService {

 // URL de votre API Django qui gère les bilans médicaux
 private apiUrl = 'http://127.0.0.1:8000/api/medical-records/';  // Remplacez cette URL par celle de votre API si nécessaire

 // Injectez HttpClient pour envoyer des requêtes HTTP
 constructor(private http: HttpClient) {}

 // Méthode pour ajouter un bilan médical
 addMedicalRecord(data: any): Observable<any> {
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',  // Déclare le type de contenu JSON pour l'envoi des données
   });

   // Retourne une observable qui représente la réponse de l'API après l'envoi des données
   return this.http.post(this.apiUrl, data, { headers });
 }}
