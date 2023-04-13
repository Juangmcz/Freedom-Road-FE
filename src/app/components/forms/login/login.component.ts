import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService) {
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
}
