import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { HomeLogin} from './home';
import { ApiService } from '../service/api/api.service';
import { LoginI } from '../models/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../models/response.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

@Injectable()
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private api: ApiService, private router: Router) {  }
  ngOnInit(): void {
  }

  token: string ="";
  onLogin(form: LoginI) {
    return this.api.loginByEmail(form).subscribe(data => {
      let dataResponse: ResponseI = data

      if (this.loginForm.valid) {
        
        this.token = dataResponse.id
        console.log("este es el token" , this.token)
        localStorage.setItem('token', this.token);
        switchData(dataResponse, this.router)
      }
       else if (this.loginForm.invalid) {
        alert("User email or Password are invalid")
      }

    })
  }
  public get f(): any {
    return this.loginForm.controls;
  }

  getIdToken(){
    return this.token
  }

}

function switchData(dataResponse: ResponseI, router: Router) {
  switch (dataResponse.role) {
    case 'admin':
      router.navigate(['admin'])
      break;
    case 'kitchen':
      router.navigate(['kitchen'])
      break;
    case 'waiter':
      router.navigate(['waiters'])
      break;
    default:
      break;
  }
}