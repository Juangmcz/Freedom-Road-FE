import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faRoute = faRoute;

  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn(): boolean {
    console.log('the state is:' + this.userService.getState());
    return this.userService.getState();
  }

  logout(): void {
    this.userService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
}
