import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {of, throwError} from 'rxjs'

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpSpy : {post: jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ApiService(httpSpy as any);
    // service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
it('should return user ', (done: DoneFn) =>{
  const mockUserLog = {
    email: 'waiter@burgerqueen.com',
    password: '123456',
  };
  const responseLog = {
      "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab",
      "status": 200,
      "email": "waiter@burgerqueen.com",
      "password": "123456",
      "role": "waiter",
  };
httpSpy.post.and.returnValue(of(responseLog));
const user = mockUserLog;
service.loginByEmail(user)
.subscribe({
  next: (res) => {
    expect(res).toEqual(responseLog);
    done();
  }
});

})

});
