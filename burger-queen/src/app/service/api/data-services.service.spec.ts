import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {of, throwError} from 'rxjs'
import { DataServicesService } from './data-services.service';

describe('DataService', () => {
  let service: DataServicesService;
  let httpSpy : {get: jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataServicesService]
    });
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DataServicesService(httpSpy as any);
    // service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
it('should return a product list ', (done: DoneFn) =>{
 
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
httpSpy.get.and.returnValue(of(responseGetProduct));
service.getItems()
.subscribe({
  next: (res) => {
    expect(res).toEqual(responseGetProduct);
    done();
  }
});

})

});
