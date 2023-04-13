import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  faGoogle = faGoogle;

  constructor(
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
      ]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.userService
      .login(this.loginForm.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClick() {
    this.userService
      .loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log(error));
  }

  fetchUserData(): void {
    this.customerService
      .getByEmail(this.loginForm.value.email)
      .subscribe((user) => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('items', JSON.stringify([]));
      });
  }
}
