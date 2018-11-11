import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor
  (
    private loginService: LoginService,
    private router: Router,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => {
        alert(user);
        this.store.dispatch({
          type: 'SET_USER',
          payload: {
            user: {
              name: user.name,
              userId: user._id,
              photo: user.photo,
              token: user.token,
            }
          }
        });
        localStorage.setItem('token', user.token);
        this.router.navigate(['/home']);
      }, error => {
        // SNACKBAR
      });
    }

}
