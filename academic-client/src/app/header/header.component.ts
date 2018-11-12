import { Component, OnInit } from '@angular/core';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search = '';
  hide = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.hide = localStorage.getItem('token') ? true : false;
  }

  onSearch() {
    console.log(this.search);
  }

  logout() {
    this.loginService.logout();
  }
}
