import { Store } from '@ngrx/store';
import { AppState } from '../../Store/app.state';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  allowRouteAccess = false;
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {


    this.store.select('auth').subscribe((authData) => {
      const allowedRoles = route.data['allowedRoles'];
     
      if(allowedRoles)
        {
          

          console.log(authData.user?.role)
          this.allowRouteAccess = allowedRoles.includes(authData.user?.role);
        }
      });
      
      if (!this.allowRouteAccess) {
        this.router.navigate(['/','404']);
      }
   

    return this.allowRouteAccess;
  }
}
