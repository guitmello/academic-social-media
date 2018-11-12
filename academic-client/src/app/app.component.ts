import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './security/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedUser$: Observable<any>;

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit()  {
    this.loggedUser$ = this.store.select('auth').pipe(
      pluck('user')
    );
    const token = localStorage.getItem('token');
    if (token) {
      this.loginService.authCheck(token).subscribe(response => {
        this.store.dispatch({
          type: 'SET_USER',
          payload: {
            user: {
              userId: response.id,
              token: token,
            }
          }
        });
      }, error => {
        localStorage.removeItem('token');
      });
    }
  }

}

