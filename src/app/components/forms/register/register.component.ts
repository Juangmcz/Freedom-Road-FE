import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserCredential } from '@angular/fire/auth';
import { Customer } from 'src/app/models/customer.model';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { UserService } from 'src/app/services/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  RegisterPersonalInfoForm: FormGroup;
  customer: Customer | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {
    this.RegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
      ]),
    });

    this.RegisterPersonalInfoForm = new FormGroup({
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      cell: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.userService
      .register(this.RegisterForm.value)
      .then((response) => {
        this.customerPost(response);
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  isFormsInvalid() {
    return this.RegisterForm.invalid || this.RegisterPersonalInfoForm.invalid;
  }

  userInitialization(): Customer {
    var userLoginInfo = this.RegisterForm.value;
    var userPersonalInfo = this.RegisterPersonalInfoForm.value;

    this.customer = {
      dni: userPersonalInfo.dni,
      name: userPersonalInfo.name,
      lastName: userPersonalInfo.lastName,
      email: userLoginInfo.email,
      cell: userPersonalInfo.cell,
    };
    return this.customer;
  }

  customerPost(response: UserCredential) {
    this.customerService.save(this.userInitialization()).subscribe((answer) => {
      console.log(answer);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Customer with ID:${answer.id} and email:${response.user.email} has been created successfully`,
        showConfirmButton: true,
      });
    });
  }
}
