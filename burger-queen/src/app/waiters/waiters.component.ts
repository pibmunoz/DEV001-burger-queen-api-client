
import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ProductI } from '../models/product.interface';
import { ProductsService } from '../service/api/products.service';
import { CardOfProductComponent } from '../card-of-product/card-of-product.component'
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OrderI } from '../models/order.interface';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.css']
})

export class WaitersComponent implements OnInit {
  // myForm = new FormGroup({
  //   customerName: new FormControl('', [Validators.required]),
  //   waiterName: new FormControl('', [Validators.required]),
  //   tableNumber: new FormControl('', [Validators.required]),
  //   // password: new FormControl('', [Validators.required, Validators.minLength(6)])
  // })

  myForm: FormGroup;

  constructor(private products: ProductsService, public fb: FormBuilder, private toast: HotToastService) { 
    this.myForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      waiterName: ['', [Validators.required,  Validators.minLength(3)]],
      tableNumber: ['', [Validators.required,  Validators.minLength(1)]],
    });
  }

  get m(){
    return this.myForm.controls;
  }

  public productos: ProductI[] = []
  public breakfast: ProductI[] = []
  public meal: ProductI[] = []

  arrProductsSelected: ProductI[] = []

  ngOnInit(): void {
    this.arrayOfTheProducts()
   


  }

  // guardar info del mesero, mesa, etc 
  public dataForTheOrder :Object = {}

  saveData(){
    if(this.myForm.valid){

      let objetoForm = {
        customer : this.myForm.value.customerName,
        waiter : this.myForm.value.waiterName,
        table: this.myForm.value.tableNumber
      }
          this.dataForTheOrder = objetoForm
    }
    else if(this.myForm.invalid){
      // this.toast.warning('Please be cautious!')
      // y presionar botón enviar data
      this.toast.success('Fill all the fields!', {
        duration: 1000,
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
          
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }

    // customToast() {
    //   this.toast.success('Look at my styles, and I also need more time!', {
    //     duration: 5000,
    //     style: {
    //       border: '1px solid #713200',
    //       padding: '16px',
    //       color: '#713200',

    //     },
    //     iconTheme: {
    //       primary: '#713200',
    //       secondary: '#FFFAEE',
    //     },
    //   });
    // }




  }
  



  @ViewChild(CardOfProductComponent) cards: CardOfProductComponent;

  ngAfterViewInit () {
   
  }

  arrayOfProductsSelected : number[]= []

obtainProductClick(id:number){
  this.arrayOfProductsSelected.push(id)
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



  submitOrder() {
    const arrProductsToKitchen = this.arrProductsSelected.map((products) => {
      return {
        producto: products.name,
        cantidad: products.quantity
      }
    })
    const objOrder: any = {
      data: this.dataForTheOrder,
      order: arrProductsToKitchen,

    }
    if(Object.entries(objOrder.data).length === 0){
      alert("you need to fill all the fields, please")
    }
    else{
      console.log("orden", objOrder);
      localStorage.setItem('orderToKitchen', JSON.stringify(objOrder));
      // this.arrProductsSelected.splice(0,-1)
      this.arrProductsSelected = [];
      this.totalTot = 0
      
      this.myForm.reset();
    }
    
    // this.renderer.setProperty(this.customerName.nativeElement, 'innerHTML', "38495793487");

  }


 

}
