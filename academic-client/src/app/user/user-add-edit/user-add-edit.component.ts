import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  areaArray = [
    'Arquitetura',
    'Medicina',
    'TI',
  ];

  minDate = new Date(1990, 1, 1);
  maxDate = new Date(2000, 11, 13);

  hide = true;
  hideConfirm = true;

  isCreating = true;

  userForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      cpf: new FormControl('', {
        validators: [Validators.required]
      }),
      birthDate: new FormControl('', {
        validators: [Validators.required]
      }),
      professionalArea: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      passwordConfirm: new FormControl('', {
        validators: [Validators.required]
      })
    }, {validators: [this.equalsTo], updateOn: 'change'});
  }

  // Photo Upload
  changePhoto() {
    document.querySelector('#imgupload').addEventListener('change', function() {
      const filesSelected = (<HTMLInputElement>(
        document.getElementById('imgupload')
      )).files;
      if (filesSelected.length > 0) {
        const fileToLoad = filesSelected[0];
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadEvent) {
          const base64value = <FileReader>event.target;
          (<HTMLInputElement>document.getElementById('imgupload')).setAttribute(
            'base64-value', base64value.result.toString()
          );
        };
        fileReader.readAsDataURL(fileToLoad);
      }
    });
  }

  // Password Matchs
  equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const password = group.get('password');
    const passwordConfirm = group.get('passwordConfirm');

    if (!password || !passwordConfirm) {
      return undefined;
    }

    if (password.value !== passwordConfirm.value) {
      return { passwordNotMatch: true };
    } else {
      return undefined;
    }
  }

  createOrUpdate() {
    if (this.isCreating) {
      this.createUser(this.user);
    } else {
      this.updateUser(this.user);
    }
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

}
