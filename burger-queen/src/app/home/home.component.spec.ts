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
  const apiSpy = jasmine.createSpyObj('ApiService', ['loginByEmail']);
  let httpSpy: { post: jasmine.Spy };

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
        LoginComponent, { provide: ApiService, useValue: apiSpy }
      ]
    })
      .compileComponents();
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
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

  it('deberia llamar al otro metodo (switchData) y llama switchData', (done) => {
    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };
    const button = fixture.debugElement.query(By.css(".btnLogin"))
    spyOn(router, 'navigate')
    button.nativeElement.click()
    component.ngOnInit();
    component.onLogin(mockUser)
    const fn = spyOn(component, "switchData")

    apiSpy.loginByEmail(mockUser).subscribe(() => {
      next: (data: any) => {
        expect(data).toEqual(responseGetUser)
      }
    })

    expect(fn).toHaveBeenCalled()

    done();


  })
  it('should call AAAAAAAAAAAA service ', function fakeAsync () {
    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')
  
    const service = TestBed.inject(ApiService); // get your service
    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };

    if(component.loginForm.valid){

      apiSpy.loginByEmail.and.callFake(() => {
        return of({
          "status": 200,
          "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab",
          "email": "waiter@burgerqueen.com",
          "role": "waiter"
      }); // or return a list of bookings in case you want to test the first part of the if statement 
      });
      component.onLogin(mockUser);
      tick();
      expect(service.loginByEmail).toHaveBeenCalled();
      expect(component.onLogin).toEqual(responseGetUser);
  
      // // additional tests that verify the inside of the subscribe (change below in case the mocked service returned something)
      // expect(component.onLogin).equalTo(mockUser);
      // expect(component.generateCheckDisable).equalTo(false);
      
    }
    
    
  });

  


});

