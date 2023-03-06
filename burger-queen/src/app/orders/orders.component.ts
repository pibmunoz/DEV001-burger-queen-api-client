import { Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderI } from '../models/order.interface';
import { ProductsService } from '../service/api/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

@Injectable()
export class OrdersComponent {
  orderForm = new FormGroup({
    checkBox: new FormControl([false, Validators.requiredTrue]),
  })

  constructor(private products: ProductsService) { }

  ngOnInit(): void {
  }

  @Input() ordersFromApi: any;

  ngAfterViewInit() {

  }
  // @Output() 
  // eventoEnviarOrdenes = new EventEmitter<OrderI>();



  
  hello(){
    alert("hola")
  }
  

  }
