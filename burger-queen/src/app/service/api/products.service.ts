import { Injectable } from '@angular/core';
import { DataServicesService } from './data-services.service';

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  

  constructor(private dataServices: DataServicesService) { }

  obtainProducts() {
    return this.dataServices.getItems();
  }

  deleteProduct(){

  }





}
