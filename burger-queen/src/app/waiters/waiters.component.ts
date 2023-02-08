import { Component, OnInit } from '@angular/core';
import { ProductI } from '../models/product.interface';
import { ProductsService } from '../service/api/products.service';
import { CardOfProductComponent } from '../card-of-product/card-of-product.component'


@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.css']
})

export class WaitersComponent implements OnInit {

  titulo = "lista de productos"
  // public products = []
  // constructor(private productService: ProductsService) {

  // }
  constructor(private products: ProductsService) { }

  public productos: ProductI[] = []
  public breakfast: ProductI[] = []
  public meal: ProductI[] = []

  ngOnInit(): void {
    this.arrayOfTheProducts()

  }

  arrayOfTheProducts() {
    return this.products.obtainProducts().subscribe({
      next: myProducts => {
        this.productos = Object.values(myProducts).flat();

      this.productos.forEach(prod => {
        if(prod.type === "breakFast"){
          this.breakfast.push(prod)
          
        }
        if(prod.type === "meal"){
          this.meal.push(prod)
          
        }
        
      });
      console.log("este es desayuno" , this.breakfast)
      console.log("este es comida" , this.meal)
      },
      error: error => {
        console.log(error)
      }
    })
  }


}
