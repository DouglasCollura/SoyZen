import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'soyZen';
  constructor(private matIconRegistry: MatIconRegistry,private sanitizer: DomSanitizer) {
    const safeIconUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/cancel.svg');
    this.matIconRegistry.addSvgIcon('my-cancel', safeIconUrl);
  }
}
