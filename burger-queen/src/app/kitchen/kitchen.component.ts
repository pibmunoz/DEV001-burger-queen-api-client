import { Component, ViewChild, AfterContentChecked, OnInit } from '@angular/core';
import { ProductsService } from '../service/api/products.service';
import { OrderI } from '../models/order.interface';
import { OrdersComponent } from '../orders/orders.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent {

  
  @ViewChild(OrdersComponent) cards: OrdersComponent;

  constructor(private productS: ProductsService) {
  }
  ordersSendToKitchen: any
  allOrders: any
//   ngOnInit(): void {
//     this.obtainTheOrdersFromApi().subscribe({
//       next: (response) =>{
// console.log("esta es nuestra respuesta actual", response)
//       }
//     })
//   }



//   obtainTheOrdersFromApi(): Observable<OrderI[]>{
//     console.log("estas son las actuales", this.ordersActual)
//    return this.ordersActual
//   }

}