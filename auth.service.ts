interface AuthResponse {
  refresh: string;
  access: string;
  
 
}
interface UserProfile {
  user_id: number;
  username: string;
  role: string;
}

import { inject ,Injectable , signal} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {User}  from '../../models/user.model';
import { tap } from 'rxjs/operators';  // Ajoutez cette ligne d'importation


@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private Http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/token/';
  private profileUrl = 'http://127.0.0.1:8000/api/profile/';

  // user = signal<User| null | undefined>(undefined);
  

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    const body = { username, password };
    return this.http.post<AuthResponse>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Store token in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Retrieve token from localStorage
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post('http://127.0.0.1:8000/api/logout/', {}, { headers })
      .pipe(
        tap(() => {
          localStorage.removeItem('authToken');  // Supprime le token localement
          console.log('Token removed from localStorage');

        })
      );
}


  getUserProfile(): Observable<UserProfile> {
   const token = this.getToken();
    if (!token) {
      throw new Error('No access token found.');
    }

    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get<UserProfile>(this.profileUrl, { headers });
  }

}
