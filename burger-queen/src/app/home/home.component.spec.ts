import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './home.component';
import { Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs'

describe('test de HomeComponent', () => {

  const responseGetUser = {
    "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "waiter"
  }

  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let component: LoginComponent;
  let httpSpy: { post: jasmine.Spy };
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
        LoginComponent, { provide: ApiService, useValue: apiMock }
      ]
    })
      .compileComponents();
    httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    switchData = spyOn(component, "switchData")
    clearStorage = spyOn(localStorage, 'clear').and.callFake(() => { });
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
  it('should call function switchData', function (done) {
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')

    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };
    component.onLogin(mockUser);

    // expect(component.loginForm.valid).toBeTrue();
    expect(switchData).toHaveBeenCalled();


    done();

  });

  // it('should caldfdnfodfata', function (done) {
  //   TestBed.overrideComponent(
  //    LoginComponent,{
  //     set: {
  //       providers: [{
  //         provide: ApiService,
  //         useValue: mockFail
  //       }]
  //     }
  //    }
  //   }
  //   );
  //   TestBed.configureTestingModule({
  //     declarations: [ MyComponent ]
  //   }).compileComponents();

  // );



  //   const email = component.loginForm.controls['email']
  //   const password = component.loginForm.controls['password']
  //   email.setValue('waiter@burgerqueen.com')
  //   password.setValue('123fdfsdfsd456')
  //   const mockUser = { email: "waiter@burgerking.com", password: "1234" };
  //   component.onLogin(mockUser)

  //    expect(component.loginForm.invalid).toEqual(true);
  //    expect(clearStorage).toBeUndefined(); 
  //   done();

  // });




});

