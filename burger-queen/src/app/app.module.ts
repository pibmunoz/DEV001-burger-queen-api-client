import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WaitersComponent } from './waiters/waiters.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorsComponent } from './authors/authors.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'waiters', component: WaitersComponent},
  {path: 'kitchen', component: KitchenComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'aboutUs', component: AuthorsComponent},
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
