import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductI } from 'src/app/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {



  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/";
  getItems(){
    return this.http.get(this.url + "products");
  }


  getProduct(id: number){
    return this.http.get(this.url + `products/${id}` );
  }
}
