import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { pluck } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    token: string;
    constructor(private injector: Injector, private store: Store<AuthState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('token');
        if (this.token) {
            const authRequest = request.clone({ setHeaders: { 'Authorization': `${this.token}` } });
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }

}
