import { Injectable } from '@angular/core';
import { DataServicesService } from './data-services.service';
import { HttpClient } from '@angular/common/http';
import {OrderI} from 'src/app/models/order.interface'

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  

  constructor(private dataServices: DataServicesService, private http: HttpClient) { }

  obtainProducts() {
    return this.dataServices.getItems();
  }

  sendInfo(dataToSend: OrderI){
    let url = "http://localhost:3000/productsKitchen"
    return this.http.post<OrderI>(url, dataToSend)
    
  }



}
