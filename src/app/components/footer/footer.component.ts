import { Component } from '@angular/core';
import {
  faLinkedin,
  faYoutube,
  faInstagram,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { faBus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faBus = faBus;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
}
