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
    const smileVideoIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/smile_video.svg');
    const switchVideoIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/switch_video.svg');
    const bellNotification = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/bell_notification.svg');
    const bellEmpty = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/bell_empty.svg');
    const settings = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icons/settings.svg');
    this.matIconRegistry.addSvgIcon('my-cancel', safeIconUrl);
    this.matIconRegistry.addSvgIcon('my-lock', lockIconUrl);
    this.matIconRegistry.addSvgIcon('my-facebook-white', facebookIconUrl);
    this.matIconRegistry.addSvgIcon('my-instagram-white', instagramIconUrl);
    this.matIconRegistry.addSvgIcon('my-tiktok-white', tiktokIconUrl);
    this.matIconRegistry.addSvgIcon('my-smile-video', smileVideoIconUrl);
    this.matIconRegistry.addSvgIcon('my-switch-video', switchVideoIconUrl);
    this.matIconRegistry.addSvgIcon('my-bell-notification', bellNotification);
    this.matIconRegistry.addSvgIcon('my-bell-empty', bellEmpty);
    this.matIconRegistry.addSvgIcon('my-settings', settings);
    this.width = window.screen.width;

    const role = localStorage.getItem('role');
    if(!role){
      localStorage.setItem('role', 'guest');
    }
  }

  public width:number = 0;
}
