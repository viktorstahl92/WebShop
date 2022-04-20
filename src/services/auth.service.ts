import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_KEY = '?key=ThisIsAnAPIKey'
const API_Auth = 'https://localhost:7129/api/Users/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(API_Auth + 'SignIn' + API_KEY, {
      email,
      password
    }, { responseType: 'text' });
  }

  register(firstName: string, lastName: string, email: string, password: string, address: string, city: string, postalCode: string): Observable<any> {
    return this.http.post(API_Auth + 'SignUp' + API_KEY, {
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      postalCode
    }, { responseType: 'text' });
  }
}
