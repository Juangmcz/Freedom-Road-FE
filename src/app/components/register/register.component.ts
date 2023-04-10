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
  formReg: FormGroup;
  formRegPersonalInfo: FormGroup;
  customer: Customer | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
      ]),
    });

    this.formRegPersonalInfo = new FormGroup({
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
      .register(this.formReg.value)
      .then((response) => {
        this.customerPost(response);
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  isFormsInvalid() {
    return this.formReg.invalid || this.formRegPersonalInfo.invalid;
  }

  userInitialization(): Customer {
    var userLoginInfo = this.formReg.value;
    var userPersonalInfo = this.formRegPersonalInfo.value;

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
        position: 'top-end',
        icon: 'success',
        title: `Customer with ID:${answer.id} and email:${response.user.email} has been created successfully`,
        showConfirmButton: true,
      });
    });
  }
}
