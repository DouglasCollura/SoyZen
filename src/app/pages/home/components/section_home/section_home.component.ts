import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  CUSTOM_ELEMENTS_SCHEMA, inject, Input, signal  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Post, SectionPost } from '@interfaces/section_post';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent,
    RouterModule,
    CardArticleComponent
  ],
  templateUrl: './section_home.component.html',
  styleUrl: './section_home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SectionHomeComponent {

  @Input({required: true}) set setSection(section:SectionPost){
    this.section.set(section);
    // (this.section()!.type == this.type_test.multiple || this.section()?.type == this.type_test.select_icon) && (this.multiList = this.test()!.answers);
    // this.section()!.type == this.type_test.range && this.setRangeValues();
    // this.section()!.type == this.type_test.select_single && (this.select.set(this.test()!.answers[0].id));
  };

  private role = localStorage.getItem('role');
  public section = signal<SectionPost | null>(null);
  private urlMedia = environment.urlMedia;

  isUnLock(item:Post){

    return item.tier?.name == Roles.GUEST ||
          (item.tier?.name == Roles.REGISTER && this.role != Roles.GUEST) ||
            (item.tier?.name == Roles.SUBSCRIBE && this.role == Roles.SUBSCRIBE);
  }

  getImg(){
    return this.section()?.background != '' ?  `${this.urlMedia}${this.section()?.background}` : '/assets/images/bg_yoga.webp'
  }

  getImg2(url:string){
    return `${this.urlMedia}${url}`;
  }
}
