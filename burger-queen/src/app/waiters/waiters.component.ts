
import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ProductI } from '../models/product.interface';
import { ProductsService } from '../service/api/products.service';
import { CardOfProductComponent } from '../card-of-product/card-of-product.component'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderI } from '../models/order.interface';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.css']
})

export class WaitersComponent implements OnInit {

  myForm: FormGroup;

  constructor(private products: ProductsService, public fb: FormBuilder,) {
    this.myForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      waiterName: ['', [Validators.required, Validators.minLength(3)]],
      tableNumber: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get m() {
    return this.myForm.controls;
  }

  public productos: ProductI[] = []
  public breakfast: ProductI[] = []
  public meal: ProductI[] = []
  arrProductsSelected: ProductI[] = []
  public ordersToKitchen: Object[] = [];
  pedidos: OrderI

  ngOnInit(): void {
    this.arrayOfTheProducts()
  }

  // guardar info del mesero, mesa, etc 
  public dataForTheOrder: Object = {}

  saveData() {
    if (this.myForm.valid) {

      let objetoForm = {
        customer: this.myForm.value.customerName,
        waiter: this.myForm.value.waiterName,
        table: this.myForm.value.tableNumber

      }
      this.dataForTheOrder = objetoForm
      Swal.fire(
        'Good job!',
        'Customer Data send',
        'success'
      )
    }
    else if (this.myForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please complete the info before taking the order',
        icon: 'error',
      })
    }


  }




  @ViewChild(CardOfProductComponent) cards: CardOfProductComponent;

  ngAfterViewInit() {

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
    const arr = this.arrProductsSelected.map((prod) => {
      return prod
    })
    if (!arr.includes(item)) {
      item.subprice = item.price
      this.arrProductsSelected.push(item)
    }
    else {
      item.quantity++
      item.subprice = item.price * item.quantity;
    }

    this.totalTot = this.sumaTotal(this.arrProductsSelected)
  }



  sumaTotal(arr: ProductI[]) {
    const total = arr.reduce((total, item) => total + item.subprice, 0);
    return total

  }

  clickDelete(id: number) {
    this.arrProductsSelected.forEach((el) => {
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
    this.arrProductsSelected.forEach((el) => {
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



  submitOrder() {
    const dateOrder = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(new Date())
    const arrProductsToKitchen = this.arrProductsSelected.map((products) => {
      return {
        producto: products.name,
        cantidad: products.quantity
      }
    })
    const objOrder: any = {
      data: this.dataForTheOrder,
      order: arrProductsToKitchen,
      date: dateOrder
    }
    if (Object.entries(objOrder.data).length === 0 || objOrder.order.length < 1) {
      Swal.fire({
        title: 'Error!',
        text: 'you need to fill all the fields, please',
        icon: 'error',
      })
    }
    else {
      this.pedidos = objOrder
      this.sendOrderToKitchen(this.pedidos)
    }
  }

  sendOrderToKitchen(pedidos: OrderI) {
    localStorage.setItem('orderToKitchen', JSON.stringify(pedidos));
    this.totalTot = 0
    this.products.postOrder(pedidos).subscribe({
      next: (response) =>{
        console.log(response)
      Swal.fire({
        title: 'Good job!',
        text: 'Customer Data send',
        icon: 'success'
      })
      },
      error: (error) =>{
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Try again',
          icon: 'error',
        })
      }
    })

    this.myForm.reset();
  }




}
