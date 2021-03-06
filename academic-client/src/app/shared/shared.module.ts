import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule,
  MatTabsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';

import { RouterModule } from '@angular/router';
import { AuthInterceptor } from '../security/auth.interceptor';
import { AuthGuard } from '../security/auth.guard';
import { LoginService } from '../security/login/login.service';
import { UserService } from '../user/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatOptionModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatOptionModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        LoginService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ]
    };
  }
}
