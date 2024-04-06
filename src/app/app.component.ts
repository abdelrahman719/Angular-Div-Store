import {HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './Shared/components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { AppState } from './Store/app.state';
import { Login } from './Store/actions/auth.actions';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,NavbarComponent,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ecommerceTask';
  constructor( private translateService: TranslateService  ,private store:Store<AppState>) {
    // translateService.setDefaultLang('en');
    // translateService.use('en');
  }
  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    let lang = localStorage.getItem('siteLang');
    let userAuth = localStorage.getItem('userAuth');
    if(lang){
      this.translateService.use(lang);
    }
    if(userAuth){
      this.store.dispatch(new Login(JSON.parse(userAuth)))
    }
  }

}
