import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductsComponent } from './Feature/products/products.component';

import { LoginComponent } from './Auth/login/login.component';
import { NotfoundComponent } from './Shared/components/notfound/notfound.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Feature/products/product-details/product-details.component';
import { CheckoutComponent } from './Feature/checkout/checkout.component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as appState from '../app/Store/app.state'
import { AuthGuard } from './Core/guards/auth.guard';
import { LoadingInterceptor } from './Core/interceptors/loading.interceptor';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', redirectTo: '' },
  {
    path: 'checkout', component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['user'] }
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['user', 'admin'] }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['user', 'admin'] }
  },
  { path: '**', component: NotfoundComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimationsAsync(),
    TranslateService,
  {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  },
  importProvidersFrom(HttpClientModule, TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })), provideStore(appState.appState), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],


};
