import { Component, OnInit } from '@angular/core';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSearch() {
    console.log(this.search);
  }

  logout() {
    this.loginService.logout();
  }
}
