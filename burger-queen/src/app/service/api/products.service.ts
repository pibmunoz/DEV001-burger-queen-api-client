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

  private ordersActual: Observable<OrderI[]>;
  private orderReady: Observable<OrderI[]>;

  constructor(private dataServices: DataServicesService, private http: HttpClient) {
    this.ordersActual = timer(1, 5000).pipe(
      switchMap(() => this.http.get<OrderI[]>("https://mock-api-liart.vercel.app/orders")),
      retry(), share());
  }

  obtainProducts() {
    return this.dataServices.getItems();
  }

  postOrder(valor: OrderI) {
    let urlDos: string = "https://mock-api-liart.vercel.app/orders";
    return this.http.post(urlDos, valor)
  }


  obtainTheOrdersFromApi(): Observable<OrderI[]> {
    return this.ordersActual
  }




  deleteOrder(id: any) {
    return this.http.delete(`https://mock-api-liart.vercel.app/${id}`)
  }

  updateStatusOrder(id: any, valor: OrderI) {
    return this.http.put(`https://mock-api-liart.vercel.app/${id}`, valor)
  }

  getOrdersThatWereMade(): any {
    return this.orderReady = timer(1, 5000).pipe(
      switchMap(() => this.http.get<OrderI[]>("https://mock-api-liart.vercel.app/orders")),
      retry(), share());
  }


}
