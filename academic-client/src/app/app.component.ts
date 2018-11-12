import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedUser$: Observable<any>;

  constructor(
    private store: Store<AuthState>,
    private router: Router
  ) {
    this.loggedUser$ = this.store.select('auth').pipe(
      pluck('user')
    );

    const token = localStorage.getItem('token');

  }
}
