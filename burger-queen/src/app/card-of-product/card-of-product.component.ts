import { Component, Injectable, Input} from '@angular/core';
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

  constructor(private products: ProductsService, private dataS: DataServicesService){}

  @Input() breakfastForChild: ProductI[];
  @Input() mealForChild: ProductI[];


ngOnInit(){
  console.log("prueba de que hay algo" , this.breakfastForChild)

}

  

}




