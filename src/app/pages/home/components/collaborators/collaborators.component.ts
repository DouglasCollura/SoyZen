import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  CUSTOM_ELEMENTS_SCHEMA, inject, Input, signal  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Post, SectionPost } from '@interfaces/section_post';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent,
    RouterModule
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss', './collaborators-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CollaboratorsComponent {
  @Input({required: true}) set setSection(section:SectionPost){
    this.section.set(section);
    // (this.section()!.type == this.type_test.multiple || this.section()?.type == this.type_test.select_icon) && (this.multiList = this.test()!.answers);
    // this.section()!.type == this.type_test.range && this.setRangeValues();
    // this.section()!.type == this.type_test.select_single && (this.select.set(this.test()!.answers[0].id));
  };
  private role = localStorage.getItem('role');
  public section = signal<SectionPost | null>(null);
  tamano:any
  private urlMedia = environment.urlMedia;
  constructor(){
   

  
  }
  public width:number = window.innerWidth;
  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }
 }
