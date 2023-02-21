import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './home.component';
import { Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';

fdescribe('test de HomeComponent', () => {
  let injector: TestBed;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let httpMock: HttpTestingController;
  let service: ApiService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['loginByEmail']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [{
        provide: ApiService, useValue: spy
      }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService)
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>

  });

  it('debe de existir LoginComponent', () => {
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });
  it('debe retornar form inválido', () => {
    const app = fixture.componentInstance
    fixture.detectChanges()

    const email = app.loginForm.controls['email']
    email.setValue('waiter@burgerqueen.com')
    expect(app.loginForm.invalid).toBeTrue();

  });
  it('debe retornar form valido', () => {
    const app = fixture.componentInstance
    fixture.detectChanges()

    const email = app.loginForm.controls['email']
    const password = app.loginForm.controls['password']

    email.setValue('waiter@burgerqueen.com')
    password.setValue('123456')
    expect(app.loginForm.valid).toBeTrue();
  })

  it('deberia llamar al metodo de cambio de rutas', () => {
    // spyOn(LoginComponent, 'switchData')

    const app = fixture.componentInstance
    fixture.detectChanges()

    const button = fixture.debugElement.query(By.css(".btnLogin"))
    button.nativeElement.click()
    fixture.whenStable().then(() => {
      expect(app.switchData).toHaveBeenCalled()
    })
  });

  fit('deberia llamar al otro metodo (switchData) y llama switchData', (done) => {

    const mockOfLog = {
      "id": "W-f02bc41-3f2f-455c-822b-01d75bf62fab", "status": 200, "email": "waiter@burgerqueen.com", "password": "123456", "role": "waiter"
    }

    const navigateSpy = spyOn(router, 'navigate');
    const app = fixture.componentInstance;

    const mockUser = { email: "waiter@burgerqueen.com", password: "123456" };
    fixture.detectChanges()
    const button = fixture.debugElement.query(By.css(".btnLogin"))
    button.nativeElement.click()


    // const component = fixture.componentInstance;
    // const navigateSpy = spyOn(router, 'navigate');

    // component.goSomewhere();
    app.onLogin(mockUser);
    service.loginByEmail(mockUser).subscribe(() => {
      // next: (dataResponse: any) =>{
      // expect().toEqual(mockOfLog)
      expect(navigateSpy).toHaveBeenCalledWith(['waiter']);
      // expect(navigateSpy).toBe('AAAA');

      // expect(navigateSpy.).toHaveBeenCalled()
      // }
    })
    // expect(navigateSpy).toHaveBeenCalled();
    done();
  })



});

