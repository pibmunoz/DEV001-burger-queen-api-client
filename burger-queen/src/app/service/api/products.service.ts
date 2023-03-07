import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServicesService } from './data-services.service';
import { ProductI } from 'src/app/models/product.interface';
import { OrderI } from 'src/app/models/order.interface';
import { Observable, retry, share, switchMap, timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  private ordersActual : Observable<OrderI[]>;

  constructor(private dataServices: DataServicesService, private http: HttpClient) { 
    this.ordersActual =  timer(1, 5000) .pipe( 
      switchMap (() => this.http.get<OrderI[]>("http://localhost:3000/orders")) ,
      retry(), share());
  }

  obtainProducts() {
    return this.dataServices.getItems();
  }

  postOrder(valor: OrderI) {
    let urlDos: string = "http://localhost:3000/orders";
    return this.http.post(urlDos, valor)
  }


  obtainTheOrdersFromApi(): Observable<OrderI[]>{
   return this.ordersActual
  }

 


  deleteOrder(id:any){
    
    return this.http.delete(`http://localhost:3000/orders/${id}`)
  }





}
