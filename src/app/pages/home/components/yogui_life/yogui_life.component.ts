import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-yogui-life',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent,
    RouterModule
  ],
  templateUrl: './yogui_life.component.html',
  styleUrls: ['./yogui_life.component.scss','./yogui_life-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class YoguiLifeComponent {

  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;

}
