import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }
  canActivate(): boolean {
    const token = localStorage.getItem("token");
    console.log(token ? true : false);
    if(!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
