import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './Shared/components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { AppState } from './Store/app.state';
import { Login, Logout } from './Store/actions/auth.actions';
import { addToCart, getCartProducts } from './Store/actions/cart.actions';
import { Subscription } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit ,OnDestroy {
  title = 'ecommerceTask';
  authStoreSubcription: Subscription | null = null;
  userLoggedIn:boolean=false
  constructor(private translateService: TranslateService, private store: Store<AppState>) {
    // translateService.setDefaultLang('en');
    // translateService.use('en');
  }
  ngOnInit(): void {
  this.setLang()
  this.setUser()
  this.setCart()
   

  
  
  }

  setLang(){
    this.translateService.setDefaultLang('en');
    let lang = localStorage.getItem('siteLang');
    
    if (lang) {
      this.translateService.use(lang);
    }
  }
  setUser(){


    // this.authStoreSubcription = this.store.select('auth').subscribe((authData) => {
    //   this.userType = authData.user?.role!;

    //   if (this.userType = 'user') {
     

    //   }

    // });

    let userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      this.store.dispatch(new Login(JSON.parse(userAuth)))
    }else{
      this.store.dispatch(new Logout())
    }
  }
  setCart(){
    let cart = localStorage.getItem('cart')
    if (cart) {
      let parse = JSON.parse(cart)
      console.log('parse: ', parse);
      this.store.dispatch(new getCartProducts (parse))
    }
  }

  ngOnDestroy(): void {
    this.authStoreSubcription?.unsubscribe();
  }


}
