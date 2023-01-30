import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WaitersComponent } from './waiters/waiters.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorsComponent } from './authors/authors.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'waiters', component: WaitersComponent },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'aboutUs', component: AuthorsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WaitersComponent,
    KitchenComponent,
    AdminComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

