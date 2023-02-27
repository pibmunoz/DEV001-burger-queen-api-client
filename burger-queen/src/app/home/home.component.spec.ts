import { ComponentFixture, fakeAsync, TestBed, waitForAsync,  } from '@angular/core/testing';
import { HttpClientTestingModule, } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './home.component';
import {  Router, Routes } from '@angular/router';
import { ApiService } from '../service/api/api.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {  of, throwError } from 'rxjs'
import Swal from 'sweetalert2';
import { WaitersComponent } from '../waiters/waiters.component';

describe('test de HomeComponent', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const responseGetUser = {
    "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "waiter"
  }
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let httpSpy: { post: jasmine.Spy };
  let apiService : ApiService
  let switchData: any;

  
  beforeEach(async () => {
   
    await TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
  
      ],
      declarations: [
        LoginComponent,
        WaitersComponent
      ],
      providers: [
         ApiService,
         { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
    httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
    fixture = TestBed.createComponent(LoginComponent);
    
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService)
    fixture.detectChanges()
    

    
  });

  it('debe de existir LoginComponent', () => {
    expect(component).toBeTruthy();
  });
  it('debe retornar form inválido', () => {

    const email = component.loginForm.controls['email']
    email.setValue('waiter@burgerqueen.com')
    expect(component.loginForm.invalid).toBeTrue();
    expect()

  });
  it('debe retornar form valido', () => {
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']

    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')
    expect(component.loginForm.valid).toBeTrue();
  })
  it('should call ApiService.loginByEmail and function switchData when de http response is correct', function (done) {
    switchData = spyOn(component, "switchData")
    spyOn(apiService, 'loginByEmail').and.callThrough().and.returnValue(of(responseGetUser));
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')
    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };
    component.onLogin(mockUser);

    expect(apiService.loginByEmail).toHaveBeenCalled();
    expect(switchData).toHaveBeenCalled()
    done();

  });

  it('when the HTTPResponse fails it calls', function (done) {
    spyOn(apiService, 'loginByEmail').and.callThrough().and.returnValue(throwError(() => new HttpErrorResponse({ error: "HttpErrorResponse", status:0 })));
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('waiter@burgerqueen.com')
    password.setValue('12345668667')
    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };
    const swal = spyOn(Swal, "fire")
    component.onLogin(mockUser)

    expect(swal).toHaveBeenCalledTimes(1)

    done();
  });

  it('should call router.navigate waiters', fakeAsync(() => {
    spyOn(apiService, 'loginByEmail').and.callThrough().and.returnValue(of(responseGetUser));
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')
    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };
    component.onLogin(mockUser);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['waiters'])

  }));

  it('should call router.navigate kitchen', fakeAsync(() => {
    const responseGetKitchen = {
      "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "kitchen"
    }
    spyOn(apiService, 'loginByEmail').and.callThrough().and.returnValue(of(responseGetKitchen));
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('kitchen@burgerqueen.com')
    password.setValue('123456')
    const mockUser = { email: "kitchen@burgerqueen.com", password: "123456" };
    component.onLogin(mockUser);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['kitchen'])
  }));

  it('should call router.navigate admin', fakeAsync(() => {
    const responseGetAdmin = {
      "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "admin"
    }
    spyOn(apiService, 'loginByEmail').and.callThrough().and.returnValue(of(responseGetAdmin));
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('admin@burgerqueen.com')
    password.setValue('123456')
    const mockUser = { email: "admin@burgerqueen.com", password: "123456" };
    component.onLogin(mockUser);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin'])
  }));

  it('should thow advice of unknow path', fakeAsync(() => {
    const responseGetUnknow = {
      "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "nada"
    }
    spyOn(apiService, 'loginByEmail').and.callThrough().and.returnValue(of(responseGetUnknow));
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('unknow@burgerqueen.com')
    password.setValue('123456')
    const mockUser = { email: "admin@burgerqueen.com", password: "123456" };
    const swal = spyOn(Swal, "fire")
    component.onLogin(mockUser);

    expect(swal).toHaveBeenCalled()
  }));





});

