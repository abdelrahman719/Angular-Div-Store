import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/app.state';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { removeCartProducts, updateCardCounter } from '../../Store/actions/cart.actions';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { product } from '../../Core/interfaces/product';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [TranslateModule ,MatInputModule ,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnDestroy , OnInit {

  cartStoreSubcription: Subscription | null = null;
  authStoreSubcription: Subscription | null = null;
  userType:string=''
  cartProducts:any[]=[]
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.authStoreSubcription = this.store.select('auth').subscribe((authData) => {
      this.userType = authData.user?.role!;

      if ( this.userType = 'user') {
        
        this.store.select('cart').subscribe((products)=>{
          this.cartProducts = products['cart']
          if(this.cartProducts){
           
            this.cartProducts.forEach(obj=>{
             
            })
          }
        })
      } 

    });

  }
  removeItem(index:any){
    const updatedCartProducts = [
      ...this.cartProducts.slice(0, index),
      ...this.cartProducts.slice(index + 1)
    ];

    this.store.dispatch(new removeCartProducts(updatedCartProducts));

  }
  updateItemCount(product:product ,e:any){
    console.log('e: ', e);
    console.log('e: ', e.target.value);
    console.log('index: ', product);
  
     this.store.dispatch(new updateCardCounter({product:product , count:e.target.value}));

  }
  
  ngOnDestroy(): void {
    this.cartStoreSubcription?.unsubscribe();
    this.authStoreSubcription?.unsubscribe();
 
  }
}
