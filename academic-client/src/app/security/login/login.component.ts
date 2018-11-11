import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => {
        this.router.navigate(['/home']);
      }, error => {
        // SNACKBAR
      });
    }

}
