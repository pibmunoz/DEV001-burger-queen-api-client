import { Component, OnInit } from '@angular/core';
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

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: LoginI) {
    this.api.loginByEmail(form).subscribe(data => {
      let dataResponse: ResponseI = data
      console.log("esta es la data", dataResponse)

      if (dataResponse.status === 200) {
        
        localStorage.setItem('id', dataResponse.id)
        switchData(dataResponse, this.router)
      }
      if (dataResponse.statusText == "Bad Request") {
        console.log("estooooo", dataResponse)
        alert("data invalida")
      } else if (this.loginForm.invalid) {
        alert("User email or Password are invalid")
      }

    })
  }
  public get f(): any {
    return this.loginForm.controls;
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