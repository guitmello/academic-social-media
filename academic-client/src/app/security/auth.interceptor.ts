import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    token: string;
    constructor(private injector: Injector, private store: Store<AuthState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);
        this.store.select('user').subscribe(response => {
            if (response) {
                this.token = response.token;
            } else {
            }
        });

        if (this.token) {
            const authRequest = request.clone({setHeaders: {'Authorization': `${this.token}`}});
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }

}
