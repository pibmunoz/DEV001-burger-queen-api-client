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


  // public products = []
  // constructor(private productService: ProductsService) {

  // }
  constructor(private products: ProductsService) { }

  public productos: ProductI[] = []
  public breakfast: ProductI[] = []
  public meal: ProductI[] = []

  arrProductsSelected: ProductI[] = []

  ngOnInit(): void {
    this.arrayOfTheProducts()


    //  const total = this.arrProductsSelected.reduce((actual, acum) =>{
    //   actual + (acum.price * acum.subprice)
    //  })
  }


  arrayOfTheProducts() {
    return this.products.obtainProducts().subscribe({
      next: myProducts => {
        this.productos = Object.values(myProducts).flat();

        this.productos.forEach(prod => {
          if (prod.type === "breakFast") {
            this.breakfast.push(prod)

          }
          if (prod.type === "meal") {
            this.meal.push(prod)

          }

        });

      },
      error: error => {
        console.log(error)
      }
    })
  }

  totalTot: number = 0
  getProductsClick(item: any) {
    let repetido = false;

    for (let i = 0; i < this.arrProductsSelected.length; i++) {
      if (this.arrProductsSelected[i].id == item.id) {
        this.arrProductsSelected[i].quantity++;
        repetido = true;
        item.subprice = this.arrProductsSelected[i].price * item.quantity;
      }
    }
    if (repetido == false) {
      this.arrProductsSelected.push(item);
    }

    this.totalTot = this.sumaTotal(this.arrProductsSelected)

  }



  sumaTotal(arr: ProductI[]) {
    const subtotal = this.arrProductsSelected.map((prod) => prod.price * prod.quantity)
    return subtotal.reduce((act, acum) => act + acum, 0)

  }

  clickDelete(id: number) {
    this.arrProductsSelected.forEach((el, index) => {
      if (el.id === id) {
        if (el.quantity === 1) {
          for (let i = 0; i < this.arrProductsSelected.length; i++) {

            if (this.arrProductsSelected[i] === el) {
              this.arrProductsSelected.splice(i, 1);
              i--;
              this.totalTot = this.sumaTotal(this.arrProductsSelected);
            }
          }
        }
        if (el.quantity > 1) {
          el.quantity--
          el.subprice = el.price * el.quantity;
          this.totalTot = this.sumaTotal(this.arrProductsSelected)
        }

      }

    })
  }

  clickAdding(id: number) {
    this.arrProductsSelected.forEach((el, index) => {
      if (el.id === id) {
        if (el.quantity >= 0) {
          el.quantity++
          el.subprice = el.price * el.quantity;
          this.totalTot = this.sumaTotal(this.arrProductsSelected)
        }

      }

    })
  }




  deleteForever(id: number) {
    this.arrProductsSelected.forEach((el, index) => {
      if (el.id === id) {
        if (el.quantity >= 1) {
          for (let i = 0; i < this.arrProductsSelected.length; i++) {

            if (this.arrProductsSelected[i] === el) {
              this.arrProductsSelected.splice(i, 1);
              i--;
              this.totalTot = this.sumaTotal(this.arrProductsSelected);
            }
          }
        }
      }
    })
  }



}
