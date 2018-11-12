import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private store: Store<AuthState>,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot): any {
        return this.store.select('auth').pipe(map(response => {
            if ((response && response.user && response.user.token == null) || !localStorage.getItem('token')) {
                this.router.navigateByUrl('/login');
                return false;
            }
            return true;
        }));
    }

}
