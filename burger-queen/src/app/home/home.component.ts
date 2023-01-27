import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomeLogin} from './home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeLogin]
})
export class HomeComponent implements OnInit {
  constructor(private homeLogin:HomeLogin) {}

  
  ngOnInit(): void {
  }
  home(form:NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log("aaaaaa", email)

    this.homeLogin.login(email, password)

  }
}



