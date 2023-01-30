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

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'waiters', component: WaitersComponent },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'aboutUs', component: AuthorsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WaitersComponent,
    KitchenComponent,
    AdminComponent,
    AuthorsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

