import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { ProductI } from '../models/product.interface';
import { DataServicesService } from '../service/api/data-services.service';
import { ProductsService } from '../service/api/products.service';

@Component({
  selector: 'app-card-of-product',
  templateUrl: './card-of-product.component.html',
  styleUrls: ['./card-of-product.component.css']
})

@Injectable()
export class CardOfProductComponent {

  constructor(private products: ProductsService) { }


  @Input() menuItems: ProductI[];

  arrOfProductsClicked: object[] = []



  @Output() 
  eventoEnviarData = new EventEmitter<ProductI>();
  // ngOnInit() {

  // }


  // addNewItem(id: number) {
  //   this.idProduct.emit(id);
  // }

addItemsToWaiterOrder(value:ProductI){
  this.eventoEnviarData.emit(value)


}

  // addClickedItem(id:number) {
  //   this.breakfastForChild.forEach((item) => {
  //     if (id === item.id) {
  //       this.arrOfProductsClicked.push(item)
  //     }

  //   })
  //   return this.arrOfProductsClicked
  // }

}

