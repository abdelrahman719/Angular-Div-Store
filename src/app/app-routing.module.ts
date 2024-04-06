import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Features/products/products.component';
import { CartComponent } from './Features/cart/cart.component';
import { LoginComponent } from './Auth/login/login.component';
import { NotfoundComponent } from './Shared/components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {path:'products',  redirectTo:''},
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
