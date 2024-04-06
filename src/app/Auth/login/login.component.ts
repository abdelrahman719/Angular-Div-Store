import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppState } from '../../Store/app.state';
import { Store } from '@ngrx/store';
import { Login, Logout } from '../../Store/actions/auth.actions';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('')
  })
wrongUser:boolean=false;
  matcher = new MyErrorStateMatcher()

  constructor(private router: Router, private AuthService: AuthService, private store: Store<AppState>) {

  }

  logIn() {
    if (this.AuthService.logIn(this.loginFormGroup)) {
      debugger

      if ((this.loginFormGroup.value.name == 'test' && this.loginFormGroup.value.password == 'testUser')
        ||
        (this.loginFormGroup.value.name == 'admin' && this.loginFormGroup.value.password == 'adminUser')
      ) {
        let userAuth = localStorage.getItem('userAuth');
        if (userAuth) {
          this.store.dispatch(new Login(JSON.parse(userAuth)))
          this.router.navigate(['/', 'products'])
        } else {
          this.store.dispatch(new Logout())
        }

      }
      else {
        this.wrongUser=true
        this.store.dispatch(new Logout())
        return
      }



    }



  }

  ngOnInit() {
    this.loginFormGroup.reset()
    localStorage.clear()
  }

}
