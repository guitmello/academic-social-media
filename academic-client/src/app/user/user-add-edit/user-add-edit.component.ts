import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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

}
