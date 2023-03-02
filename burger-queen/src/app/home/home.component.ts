import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
// import { HomeLogin} from './home';
import { ApiService } from '../service/api/api.service';
import { LoginI } from '../models/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../models/response.interface';
import Swal from 'sweetalert2';
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
    // console.log("entro holi")
      if (this.loginForm.valid) {
        console.log("aqui entro")
        const userAuth = form
        this.api.loginByEmail(userAuth).subscribe({
          next: (data:ResponseI) =>{
            let dataResponse: ResponseI = data
            this.token = dataResponse.id
            console.log("este es el token" , this.token)
            localStorage.setItem('token', this.token);
            this.switchData(dataResponse, this.router)
          },
          error: (error) =>{
            if(error.name == 'HttpErrorResponse'){
              console.log("aqui esta el error", error)
              Swal.fire({
                title: 'Error!',
                text: 'Enter the correct email or password',
                icon: 'error',
              })
              localStorage.clear()
            }
          }
        })
      }
  
  }
  public get f(): any {
    return this.loginForm.controls;
  }

  getIdToken(){
    return this.token
  }

  switchData(dataResponse: ResponseI, router: Router) {
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
        Swal.fire({
          title: 'Error!',
          text: 'Unknow path',
          icon: 'error',
        })
        break;
    }
  }

}

