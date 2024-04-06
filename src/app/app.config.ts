import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductsComponent } from './Features/products/products.component';

import { LoginComponent } from './Auth/login/login.component';
import { NotfoundComponent } from './Shared/components/notfound/notfound.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Features/products/product-details/product-details.component';
import { CheckoutComponent } from './Features/checkout/checkout.component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as appState from '../app/Store/app.state'


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', redirectTo: '' },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: '**', component: NotfoundComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimationsAsync(),
    TranslateService,
    importProvidersFrom(HttpClientModule, TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })), provideStore(appState.appState), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],


};
