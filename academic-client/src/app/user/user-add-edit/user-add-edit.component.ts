import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  user: User = {
    name: '',
    cpf: '',
    email: '',
    photo: '',
    gender: '',
    phone: '',
    birthDate: '',
    password: '',
    area: '',
  };

  areaArray = [
    'Arquitetura',
    'Medicina',
    'TI',
  ];

  genderArray = [
    'Masculino',
    'Feminino'
  ];

  minDate = new Date(1990, 1, 1);
  maxDate = new Date(2000, 11, 13);

  hide = true;
  hideConfirm = true;

  isCreating = true;

  numberPattern = /^[0-9]*$/;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getUser(params.id);
        this.isCreating = false;
      }
    });

    this.userForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      cpf: new FormControl('', {
        validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.numberPattern)]
      }),
      birthDate: new FormControl('', {
        validators: [Validators.required]
      }),
      phone: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(11), Validators.pattern(this.numberPattern)]
      }),
      gender: new FormControl('', {
        validators: [Validators.required]
      }),
      area: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      passwordConfirm: new FormControl('', {
        validators: [Validators.required]
      })
    }, {validators: [this.equalsTo], updateOn: 'change'});

    this.changePhoto();

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
          console.log(base64value);
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

  setPhoto(url, callback): any {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  async createOrUpdate() {
    const fotobase64 = (<HTMLInputElement>document.getElementById('imgupload')).getAttribute('base64-value');
    console.log(fotobase64);

    if (!fotobase64) {
      if (this.user.gender = 'Masculino') {
        this.user.photo = await this.setPhoto('../../assets/images/user-m-photo.png', (dataUrl) => dataUrl.toString);
      } else {
        this.user.photo = await this.setPhoto('../../assets/images/user-f-photo.png', (dataUrl) => dataUrl.toString);
      }
    } else {
      this.user.photo = fotobase64;
    }

    if (this.isCreating) {
      this.createUser(this.user);
    } else {
      this.updateUser(this.user);
    }
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe(response => {
      this.router.navigateByUrl('/login');
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

  getUser(userId) {
    this.userService.getUser(userId).subscribe(response => this.user = response);
  }

}
