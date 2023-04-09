import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'burger-queen';

ngOnInit() {
  firebase.initializeApp({
    apiKey: "AIzaSyAv0IluU3VDe0Y0MqztSmXa6ZH2pWLdYLM",
    authDomain: "burgerqueen-dev001.firebaseapp.com",
  })
}

  
}


export const environment = {
  production: false,
  // Your Mockoon's API URL
  apiURL: 'https://mock-api-liart.vercel.app/'
};

