import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {of, throwError} from 'rxjs'
import { DataServicesService } from './data-services.service';
import { ProductsService } from './products.service';

describe('DataService', () => {

  const responseGetProduct = {
    "products": [
      {
        "id": "1",
        "name": "Americano",
        "price": 5,
        "type": "breakFast",
        "subtype": "hot beverage",
        "dataEntry": "02/02/202",
        "quantity": 1
      },
    ]
  }
 
  let httpSpy : {get: jasmine.Spy};
  let service: ProductsService
  const dataSpy = jasmine.createSpyObj('DataServicesService', ['getItems']);
  dataSpy.getItems.and.returnValue(of(responseGetProduct))


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductsService,{ provide: DataServicesService, useValue:dataSpy}]
    });
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

     service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
it('should return a product list ', (done: DoneFn) =>{

service.obtainProducts().subscribe({
    next: (res) => {
      expect(res).toEqual(responseGetProduct);
      done();
    }


// httpSpy.get.and.returnValue(of(responseGetProduct));
// service.getItems()
// .subscribe({
//   next: (res) => {
//     expect(res).toEqual(responseGetProduct);
//     done();
//   }
});

})

});
