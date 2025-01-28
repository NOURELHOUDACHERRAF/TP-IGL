import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoinService {
  private apiUrl = 'http://127.0.0.1:8000/api/soins/ajouter/'; // Remplacez par l'URL réelle

  constructor(private http: HttpClient) {}

  // Fonction pour ajouter un soin
  ajouterSoin(data: any): Observable<any> {
    

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    alert('done.');

    return this.http.post(this.apiUrl, data, { headers });
  }
}