import { Component, EventEmitter, Injectable, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderI } from '../models/order.interface';
import { ProductsService } from '../service/api/products.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

@Injectable()
export class OrdersComponent implements OnInit {
  orderForm = new FormGroup({
    product: new FormControl(false, [Validators.requiredTrue]),
  })

  constructor(private products: ProductsService) { }

  @Output()
  eventoEnviarOrdenes = new EventEmitter<OrderI>();


  ngOnInit(): void {
    this.obtainOrdersFromResApi()
  }
  obtainOrders: OrderI[] = []
  filterOrders: OrderI[] = []

  obtainOrdersFromResApi() {
    this.products.obtainTheOrdersFromApi().subscribe({
      next: (response) => {
        this.obtainOrders = response
        this.filterOrders = this.filterOrdersPerDay(this.obtainOrders)
        console.log("la respuesta", this.obtainOrders)
      }
    })
  }

  filterOrdersPerDay(ordersArr: Object[]){
    const dateOrder = Intl.DateTimeFormat('en', {month: "short", day:"numeric"}).format(new Date())
    console.log(dateOrder)
    const filterok = this.obtainOrders.filter((order: any) => order.date.includes(dateOrder))
    return filterok
  }



  orderReady(valueItem: any) {
    Swal.fire({
      title: 'Do you want to send the order?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire('Sent!', '', 'success')
        
        this.deleteOrderFromApi(valueItem)

        // aqui se envia 

      } else if (result.isDenied) {
        Swal.fire('Not sent', '', 'info')
      }
    })



  }

  deleteOrderFromApi(item: any) {
    this.eventoEnviarOrdenes.emit(item.data);
    this.products.deleteOrder(item.id).subscribe({
      next: (data: any) => {
        Swal.fire(
          'Deleted!',
          `Your order has been deleted. ${item.id}`,
          'success'
        );
        

      }
    })

  }





}
