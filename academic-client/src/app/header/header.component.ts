import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search = '';
  hide = false;
  showHeader: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.showHeader.subscribe(
      mostrar => this.showHeader = mostrar,
    );
    this.hide = localStorage.getItem('token') ? true : false;
  }

  // ngOnChanges() {
  //   this.hide = localStorage.getItem('token') ? true : false;
  // }

  onSearch() {
    console.log(this.search);
  }

  logout() {
    this.loginService.logout();
    this.hide = localStorage.getItem('token') ? true : false;
  }
}
