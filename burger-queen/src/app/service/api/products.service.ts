import { Injectable } from '@angular/core';
import { DataServicesService } from './data-services.service';
import { ProductI } from 'src/app/models/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private dataServices: DataServicesService) { }

obtainProducts(){
  return this.dataServices.getItems();
}

}
