import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './home.component';
import { Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'

describe('test de HomeComponent', () => {

  const responseGetUser = {
    "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "waiter"
  }

  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let component: LoginComponent;
  let httpSpy: { post: jasmine.Spy };
  let apiService : ApiService
  const apiMock = {
    loginByEmail: () => of(responseGetUser)
  }
  let switchData: any;
  let clearStorage: any;
  
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
         ApiService
      ]
    })
      .compileComponents();
    httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    switchData = spyOn(component, "switchData")
    clearStorage = spyOn(localStorage, 'clear').and.callFake(() => { });
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

  });
  it('debe retornar form valido', () => {
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']

    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')
    expect(component.loginForm.valid).toBeTrue();
  })
  it('should call ApiService.loginByEmail and function switchData when de http response is correct', function (done) {
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
//   it('switchData works', function () {
//     spyOn(router, 'navigate').and.callThrough().and.resolveTo(true)

//   const dataResponseMock = responseGetUser
// component.switchData(dataResponseMock, router)
//   expect(router.navigate).toHaveBeenCalled()

//   });
  



});

