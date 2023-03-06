import { Component, ViewChild, AfterContentChecked, OnInit } from '@angular/core';
import { ProductsService } from '../service/api/products.service';
import { OrderI } from '../models/order.interface';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  @ViewChild(OrdersComponent) cards: OrdersComponent;

  constructor(private productS: ProductsService) {
  }
  ordersSendToKitchen: any
  allOrders: any
  ngOnInit(): void {
    this.obtainTheOrdersFromApi()
  }

  obtainTheOrdersFromApi() {
    this.productS.getOrders().subscribe({
      next: (response) => {
        console.log("holis aqui", response)
        this.allOrders = response

this.ordersSendToKitchen = this.filterOrdersPerDay(this.allOrders)
console.log("no functiona", this.ordersSendToKitchen)
      }
    })
  }

filterOrdersPerDay(ordersArr: Object[]){
  const dateOrder = Intl.DateTimeFormat('en', {month: "short", day:"numeric"}).format(new Date())
  console.log(dateOrder)
  const filterok = this.allOrders.filter((order: any) => order.date.includes(dateOrder))
  return filterok
}

}