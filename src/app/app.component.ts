import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'soyZen';
  constructor(private matIconRegistry: MatIconRegistry,private sanitizer: DomSanitizer) {
    const safeIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/cancel.svg');
    const lockIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/lock.svg');
    const facebookIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/facebook_white.svg');
    const instagramIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/instagram_white.svg');
    const tiktokIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/tiktok_white.svg');
    this.matIconRegistry.addSvgIcon('my-cancel', safeIconUrl);
    this.matIconRegistry.addSvgIcon('my-lock', lockIconUrl);
    this.matIconRegistry.addSvgIcon('my-facebook-white', facebookIconUrl);
    this.matIconRegistry.addSvgIcon('my-instagram-white', instagramIconUrl);
    this.matIconRegistry.addSvgIcon('my-tiktok-white', tiktokIconUrl);
    this.width = window.screen.width;
  }

  public width:number = 0;
}
