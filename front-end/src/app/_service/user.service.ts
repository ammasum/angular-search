import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:4500/';

  constructor(private http: HttpClient) { }

  get(search, page) {
    if(search === '') {
      return new Observable(subscriber => {
        subscriber.next([]);
      });
    }
    return this.http.get(`${this.baseUrl}user/search?name=${search}&page=${page}`);
  }
}
