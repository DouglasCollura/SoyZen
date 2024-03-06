import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss', './collaborators-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CollaboratorsComponent {
  constructor(){
    console.log(window.innerWidth)
  }
  public width:number = window.innerWidth;
 }
