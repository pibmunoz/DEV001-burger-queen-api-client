import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { HomeLogin} from './home';
import { ApiService } from '../service/api/api.service';
import { LoginI } from '../models/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../models/response.interface';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
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

  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(): void {
  }

  token: string;
  onLogin(email: any, password:any) {
    // console.log("entro holi")
    if (this.loginForm.valid) {
    
      const userEmail:string = email!;
      const userPassword: string = password!;
      this.api.loginByEmail(userEmail, userPassword).then((data) =>{
        firebase.auth().currentUser?.getIdToken().then( 
          token => {
            this.token = token;
            console.log("este es el token", this.token)
            localStorage.setItem('token', this.token);
            this.api.getUser(email).then( data =>{
              console.log("veamos", data)
            })

            console.log("wata es la data", data)
           //this.switchData(data, this.router)



          }
        )
      })
      
      
      // .subscribe({
      //   next: (data: ResponseI) => {
      //     console.log(data)
      //     let dataResponse: ResponseI = data
      //     this.token = dataResponse.accessToken
      //     console.log("este es el token", this.token)
      //     console.log("this is the response", data)
      //     localStorage.setItem('token', this.token);
      //     this.switchData(dataResponse, this.router)
      //   },
      //   error: (error) => {
      //     if (error.name == 'HttpErrorResponse') {
      //       console.log("aqui esta el error", error)
      //       Swal.fire({
      //         title: 'Error!',
      //         text: 'Enter the correct email or password',
      //         icon: 'error',
      //       })
      //       localStorage.clear()
      //     }
      //   }
      // })
    }
    


  }
  public get f(): any {
    return this.loginForm.controls;
  }

  getIdToken() {
    return this.token
  }

  switchData(dataResponse: ResponseI, router: Router) {
    switch (dataResponse.user.role) {
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

