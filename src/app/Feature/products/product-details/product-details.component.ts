import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../../Core/services/products.service';
import { product } from '../../../Core/interfaces/product';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../Core/services/auth.service';
import { addToCart } from '../../../Store/actions/cart.actions';
import {  Store } from '@ngrx/store';
import { AppState } from '../../../Store/app.state';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule , CommonModule , TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  }
  userType: string = ''
  constructor(private route: ActivatedRoute, private productsService: ProductsService ,
     private AuthService:AuthService ,
    private store:Store<AppState>) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
     
      this.getProductData(param['id'])
    })
    this.uiConfig()
  }
  uiConfig() {
    if (this.AuthService.getUserData().role == 'admin') {
      this.userType = 'admin';
     
    }
     if (this.AuthService.getUserData().role == 'user') {
      this.userType = 'user'
     
    } 
  }

  getProductData(prodId: number) {
    this.productsService.getProductDetailes(prodId).subscribe({
      next: (res) => {
        this.product = res
      }
    })
  }

  addToCart(product:product){
    this.store.dispatch(new addToCart({product:product , count:1}))
  }
}
