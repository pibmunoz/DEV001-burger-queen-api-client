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


  // @Input() ordersFromApi: any;

  // @Output() 
  // eventoEnviarOrdenes = new EventEmitter<OrderI>();
  ngOnInit(): void {
this.obtainOrdersFromResApi()
  }
obtainOrders: OrderI[] = []

obtainOrdersFromResApi(){
  this.products.obtainTheOrdersFromApi().subscribe({
    next: (response) =>{
this.obtainOrders = response

console.log("la respuesta", this.obtainOrders)
    }
  })
}



  orderReady(id: any) {
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
        
        this.deleteOrderFromApi(id)

        // aqui se envia 

      } else if (result.isDenied) {
        Swal.fire('Not sent', '', 'info')
      }
    })



  }

  deleteOrderFromApi(id: any) {
    this.products.deleteOrder(id).subscribe({
      next: (data: any) => {
        Swal.fire(
          'Deleted!',
          `Your order has been deleted. ${id}`,
          'success'
        );

      }
    })

  }


}
