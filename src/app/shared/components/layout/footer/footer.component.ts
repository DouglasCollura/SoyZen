import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', 'footer-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  irweb(link:any){
    if(link=='facebook'){
      window.open("https://m.facebook.com/100092244648405/", "_blank");
    }else if(link=='instagram'){
      window.open("https://www.instagram.com/_soyzen?igsh=aTFjbmQ0OWM0MXZu", "_blank");
    }else{
      window.open("https://www.tiktok.com/@_soyzen?_t=8esHCIZpyDO&_r=1", "_blank");
    }
  }
 }

