import { Component,  OnInit } from '@angular/core';
import { ProductI } from '../models/product.interface';
import { ProductsService } from '../service/api/products.service';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.css']
})

export class WaitersComponent implements OnInit {

  titulo = "lista de productos"

  constructor(private productService: ProductsService, ){}

  products:ProductI[] = []

ngOnInit(): void {
  console.log(this.arrayOfTheProducts())
}

arrayOfTheProducts(){
  return this.productService.obtainProducts().subscribe({
    next: myProducts =>{
this.products = Object.values(myProducts).flat();
      
    },
    error: error =>{
      console.log(error)
    }
   })
}


}
