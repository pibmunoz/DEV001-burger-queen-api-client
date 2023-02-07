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
  public products = []
  constructor(private productService: ProductsService) {

  }


  ngOnInit(): void {

  }




}
