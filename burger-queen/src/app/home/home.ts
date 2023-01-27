import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {environment} from "../app.component"
@Injectable()
export class HomeLogin  {
    constructor(private router:Router,
        private http: HttpClient){}
    token!: string;
    login(email: string, password: string){
        this.http.post(`${environment.apiURL}/auth`, {
            email: email,
            password: password
        }).subscribe((data: any) => {
            this.token = data.id;
            localStorage.setItem('token', this.token);
            this.router.navigate(['/waiters']);
            console.log( "este es un token", this.token)
        })
    }


}

