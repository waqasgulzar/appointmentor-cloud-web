import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'user.registration.html'
})
export class UserComponent implements OnInit {
  users: User[];
  userForm: FormGroup;
  emailAddress: FormControl;
  organizationId: number;
  submitted = false;
  emailAlreadyExist = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      organizationId: [''],
      firstName: [''],
      lastName: [''],
      companyName: [''],
      phoneNumber: [''],
      emailAddress: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email
        ])
      ],
      password: [''],
      timeZoneId: [''],
      currencyId: [''],
      isDeleted: ['']
    });
  }
  onSubmit(formData: any) {
    this.submitted = true;
    this.emailAlreadyExist = false;
    if (formData.valid) {
      this.userService
        .get(formData.value['emailAddress'])
        .subscribe((data: any) => {
          if (data['results'][0]) {
            this.emailAlreadyExist = true;
          } else {
            this.emailAlreadyExist = false;
            this.userService.post(formData.value).subscribe((data: any) => {
              sessionStorage.setItem(
                'organizationId',
                JSON.stringify(data['results'][0])
              );
              sessionStorage.setItem('isMenuhidden', 'true');
              this.router.navigate(['/accountsetup']);
            });
          }
        });
    }
  }
}
