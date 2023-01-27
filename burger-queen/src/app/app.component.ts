import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'burger-queen';
}


export const environment = {
  production: false,
  // Your Mockoon's API URL
  apiURL: 'http://localhost:3000/'
};