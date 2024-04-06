import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../Core/services/auth.service';
import { userData } from '../../../Core/interfaces/userData';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  {


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

  constructor(private translateService: TranslateService, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.checkMobileView() 
    this.getUserData()
    let lang = localStorage.getItem('siteLang');
    if(lang){
      this.siteLang = lang
    }
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

}
