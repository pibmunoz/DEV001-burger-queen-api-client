import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ProductI } from '../models/product.interface';
import { ProductsService } from '../service/api/products.service';
import { CardOfProductComponent } from '../card-of-product/card-of-product.component'
import { FormGroup, FormControl } from '@angular/forms';
import { OrderI } from '../models/order.interface';


@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.css']
})

export class WaitersComponent implements OnInit {

  // waitersForm = new FormGroup({
  //   customerName: new FormControl(''),
  //   waiterName: new FormControl(''),
  //   tableNumber: new FormControl(''),
  // })

  constructor(private products: ProductsService, private renderer: Renderer2) { }

  public productos: ProductI[] = []
  public breakfast: ProductI[] = []
  public meal: ProductI[] = []

  arrProductsSelected: ProductI[] = []

  ngOnInit(): void {
    this.arrayOfTheProducts()

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

  public ordersToKitchen: Object[] = [];

  @ViewChild("customerName")customerName: ElementRef
  submitOrder(customer: string, waiter: string, table: string) {
    const arrProductsToKitchen = this.arrProductsSelected.map((products) => {
      return {
        producto: products.name,
        cantidad: products.quantity
      }
    })

    const objOrder: OrderI = {
      customerName: customer,
      waiterName: waiter,
      tableNumber: table,
      order: arrProductsToKitchen,

    }
    console.log(objOrder);
    localStorage.setItem('orderToKitchen', JSON.stringify(objOrder));
    // this.arrProductsSelected.splice(0,-1)
    this.arrProductsSelected = [];
    this.totalTot = 0
    
    // this.renderer.setProperty(this.customerName.nativeElement, 'innerHTML', "38495793487");

  }


// @ViewChild("dataName")
//   InputVar: ElementRef;
 
//   reset()
//   {
   
//     // We will clear the value of the input
//     // field using the reference variable.
 
//     this.InputVar.nativeElement.value = "";
//   }

  // @ViewChildren('clickedProducts') divClicked: ElementRef
  // ngAfterViewInit() {
  //   delete(this.divClicked){
  //     this.renderer.setProperty(this.divClicked.nativeElement, 'innerHTML', "38495793487");

  //   }

  // }




}
