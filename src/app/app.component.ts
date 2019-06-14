import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
 } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  defaultForm = new FormGroup({
    projectName: new FormControl(null,

    // Here is normal validators
    [
      Validators.required,
      // Custom validator which does not allow test as proejctName field's value.
      (control: AbstractControl) => {
        if (control.value === "Test") {
          return {"testAsName" : true};
        } else {
          return null;
        }
      }
    ],

    // Here is async validators
    [
      (control: AbstractControl) => new Promise((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'berk') {
            resolve({"berkAsName" : true});
          } else {
            resolve(null);
          }
        }, 2000)
      })
    ]
    ),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    projectStatus: new FormControl('Critical')
  })

  onSubmit() {
    console.log(this.defaultForm.value)
  }

}
