import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServicesService } from './data-services.service';
import { ProductI } from 'src/app/models/product.interface';
import { OrderI } from 'src/app/models/order.interface';

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  

  constructor(private dataServices: DataServicesService, private http: HttpClient) { }

  obtainProducts() {
    return this.dataServices.getItems();
  }

  postOrder(valor: OrderI[]){
    let urlDos: string = "http://localhost:3000/orders";
    
  return this.http.post(urlDos, valor)
  }





}
