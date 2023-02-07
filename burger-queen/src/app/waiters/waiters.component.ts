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
 this.productService.obtainProducts().subscribe(myProducts =>{
console.log(myProducts)
this.products = Object.values(myProducts);
this.mostrarCartas()

 })

 
  
}

mostrarCartas(){
return this.products.forEach(element => {
console.log(element.id)

});
}



}
