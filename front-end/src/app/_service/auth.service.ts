import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:4500/';
  
  constructor(private http: HttpClient) { }

  login(data) {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    return this.http.post(`${this.baseUrl}auth/login`, data);
  }
}