import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './home/home.component';
import { WaitersComponent } from './waiters/waiters.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorsComponent } from './authors/authors.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsService } from './service/api/products.service';
import { ApiService } from './service/api/api.service';
import { DataServicesService } from './service/api/data-services.service';
import { CardOfProductComponent } from './card-of-product/card-of-product.component';
import { AuthGuard } from './service/api/auth.guard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrdersComponent } from './orders/orders.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'waiters', component: WaitersComponent, canActivate: [AuthGuard]},
  { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'aboutUs', component: AuthorsComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WaitersComponent,
    KitchenComponent,
    AdminComponent,
    AuthorsComponent,
    CardOfProductComponent,
    OrdersComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers:[ApiService, DataServicesService, ProductsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

