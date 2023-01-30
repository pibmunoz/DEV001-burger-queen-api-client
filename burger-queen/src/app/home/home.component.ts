import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
// import { HomeLogin} from './home';
import { ApiService } from '../service/api/api.service';
import { LoginI } from '../models/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../models/response.interface'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form: LoginI){
    this.api.loginByEmail(form).subscribe(data => {
     
      let dataResponse:ResponseI = data

      if(dataResponse.status === 200){
        localStorage.setItem('id', dataResponse.id)
        switch (dataResponse.role) {
          case 'admin':
            this.router.navigate(['admin'])
            break;
          case 'kitchen':
            this.router.navigate(['kitchen'])
            break;
          case 'waiter':
            this.router.navigate(['waiters'])
            break;
          default:
            break;
        }
      }
  else{

 }

    })
  }
}


