import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../service/api/products.service';
import { OrderI } from '../models/order.interface';
import { OrdersComponent } from '../orders/orders.component';

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
  ngOnInit(): void {
    this.obtainTheOrdersFromApi()
  }

  obtainTheOrdersFromApi() {
    this.productS.getOrders().subscribe({
      next: (response) => {
        console.log(response)
        this.ordersSendToKitchen = response
      }
    })
  }

}
