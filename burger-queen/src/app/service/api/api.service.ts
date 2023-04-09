import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  doc, getDoc, addDoc, getFirestore
} from 'firebase/firestore';
 import { initializeApp } from 'firebase/app';
 import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiService {



  url: string = "http://localhost:3000/";
  constructor(private http: HttpClient, private db:AngularFirestore) { }

  loginByEmail(userEmail: string, userPassword: string) {

    return firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)

    // let urlApi = this.url + 'login';
    // return this.http.post<ResponseI>(urlApi, form)
  }
  
  

  getUser(email: string): Promise<object> {
    return getDoc(doc(this.db, 'employee', email));

  }


}

