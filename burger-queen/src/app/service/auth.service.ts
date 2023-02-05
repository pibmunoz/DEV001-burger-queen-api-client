import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = true;
  constructor() { }
  IsAuthenticated():boolean{
    return this.isLoggedIn;
  }
}
