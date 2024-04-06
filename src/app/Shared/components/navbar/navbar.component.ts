import { AfterContentInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../Core/services/auth.service';
import { userData } from '../../../Core/interfaces/userData';
import { AppState } from '../../../Store/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  , OnDestroy {


  isMobileView = false;
  checkMobileView() {
    this.isMobileView = window.innerWidth < 768; // Adjust the breakpoint as per your needs
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    console.log(window.innerWidth < 768)
    this.checkMobileView();
  }


  siteLang: string = 'en';
  user: userData = {
    name: '',
    password: '',
    role: ''
  }
  userType:string=''
  pickedProducts:number=0
  cartStoreSubcription: Subscription | null = null;
  authStoreSubcription: Subscription | null = null;
  constructor(private translateService: TranslateService, 
    private authService: AuthService,
    private store: Store<AppState>,) {

  }
  ngOnInit(): void {
    this.checkMobileView() 
    this.getUserData()
    let lang = localStorage.getItem('siteLang');
    if(lang){
      this.siteLang = lang
    }

    this.authStoreSubcription = this.store.select('auth').subscribe((authData) => {
      this.userType = authData.user?.role!;

      if ( this.userType = 'user') {
        
        this.store.select('cart').subscribe((products)=>{
          let productsList = products['cart']
          if(productsList){
            this.pickedProducts =0
            productsList.forEach(obj=>{
              this.pickedProducts += obj.count
            })
          }
        })
      } 

    });



  }
  
  changeLanguage(language: string) {

    localStorage.setItem('siteLang', language);
    this.translateService.use(language);
    this.siteLang = language;

  }
  getUserData() {
    this.user = this.authService.getUserData()
  }
  logOut(){
    this.authService.logOut()
  }


  ngOnDestroy(): void {
    this.cartStoreSubcription?.unsubscribe();
    this.authStoreSubcription?.unsubscribe();
  }
}
