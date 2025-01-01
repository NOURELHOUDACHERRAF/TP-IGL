import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



// Define the data structure of your API responses
interface ConsultationData {
  date: string;
  medecin: string;
  description: string;
  diagnostique: string;
  bilanRadiologiqueData: string;
  bilanBiologiqueData: string;
  antecedentData: string;
  ordonnanceData: any[];
}

@Injectable({
  providedIn: 'root'
})

export class ConsultationService {

  private apiUrl = 'http://127.0.0.1:8000/consultations/';

  constructor(private http: HttpClient) {}

  // POST request to create a new consultation
  /*createConsultation(data: ConsultationData): Observable<any> {
  
    return this.http.post('http://127.0.0.1:8000/consultations/', data);
  }*/
    createConsultation(data: ConsultationData): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/consultations/', data, {
        headers: { 'Content-Type': 'application/json' }
      });
    }

  // GET request to fetch all consultations (optional)
  getConsultations(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}


