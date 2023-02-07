import { Component, Injectable} from '@angular/core';
import { ProductI } from '../models/product.interface';
import { ProductsService } from '../service/api/products.service';

@Component({
  selector: 'app-card-of-product',
  templateUrl: './card-of-product.component.html',
  styleUrls: ['./card-of-product.component.css']
})

@Injectable()
export class CardOfProductComponent {

  constructor(private products: ProductsService){}

  public productos: ProductI[] =  []



ngOnInit(){
  this.arrayOfTheProducts();
}

  arrayOfTheProducts(){
    return this.products.obtainProducts().subscribe({
      next: myProducts =>{
        console.log(myProducts)
    this.productos = Object.values(myProducts).flat();

      },
      error: error =>{
        console.log(error)
      }
     })
  }



}
