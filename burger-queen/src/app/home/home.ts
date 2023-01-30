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
        const enterEmail : string = email;
        this.http.post(`${environment.apiURL}/auth`, {
            email: email,
            password: password
        }).subscribe((data: any) => {
            this.token = data.id;
            let emailOk = data.email;
            
            if(enterEmail === emailOk){
                this.router.navigate(['/waiters'])
                localStorage.setItem('token', this.token);
            }
            else{
                console.log("Error in login")
            }

        })
    }


}

