import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Roles } from '@services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { NofityItemComponent } from '@shared/components/nofity-item/nofity-item.component';
import { notifyItem, typeNotify } from '@interfaces/notify-item';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    RouterModule,
    NofityItemComponent,
    FooterComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','./header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  public roles = Roles;
  public role = localStorage.getItem('role');
  public router = inject(Router);
  public listNotify: notifyItem[] = [
    {
      type: typeNotify.zen,
      title: 'Te quedan 8 días de Programa Gratis',
      time: '1 hr'
    },
    {
      type: typeNotify.yoga,
      title: '¡Es hora de tu clase de Yoga!',
      time: '1 min'
    },
    {
      type: typeNotify.meditation,
      title: 'Meditación para dormir',
      time: '3 hrs'
    },
    {
      type: typeNotify.taroscope,
      title: 'Taróscopo por Fabiola Bejarano - 26 Oct.',
      time: '2 días'
    },
    {
      type: typeNotify.peace_mind,
      title: 'Sin salud mental no hay nada',
      time: '1 sem'
    },
  ];

  public notifications = signal<notifyItem[]>([]);

  constructor(){
    this.notifications.set(this.listNotify)
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

  clearNotify(){
    this.notifications.set([])
  }

}
