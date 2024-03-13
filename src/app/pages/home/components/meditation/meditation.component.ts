import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-meditation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent
  ],
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.scss', 'meditation-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export default class MeditationComponent {

  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;

}
