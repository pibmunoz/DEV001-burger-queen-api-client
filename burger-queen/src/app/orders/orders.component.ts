import { Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import { OrderI } from '../models/order.interface';
import { ProductsService } from '../service/api/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

@Injectable()
export class OrdersComponent {

  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    console.log("vistas desde hijo", this.ordersFromApi)
  }

  @Input() ordersFromApi: any;

  ngAfterViewInit() {

  }
  // @Output() 
  // eventoEnviarOrdenes = new EventEmitter<OrderI>();
}
