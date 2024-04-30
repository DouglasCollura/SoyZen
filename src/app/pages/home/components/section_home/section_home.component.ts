import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  CUSTOM_ELEMENTS_SCHEMA, inject, Input, signal  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Post, SectionPost } from '@interfaces/section_post';
import { AuthService, Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { environment } from '../../../../../environments/environment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReelComponent } from '@shared/components/reel/reel.component';
import { ReelService } from '@services/reel.service';

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    CardComponent,
    RouterModule,
    CardArticleComponent,
    ReelComponent
  ],
  templateUrl: './section_home.component.html',
  styleUrls: ['./section_home.component.scss','./section_home-mobile.component.scss'],
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

  private dialog = inject(MatDialog);
  private reelService = inject(ReelService);
  private authService = inject(AuthService);
  private role = localStorage.getItem('role');
  public section = signal<SectionPost | null>(null);
  private urlMedia = environment.urlMedia;
  public screenWidth: any;

  constructor(){
    this.screenWidth = window.innerWidth;
  }

  isUnLock(item:Post){
    return this.authService.isUnLock(item);
  }

  getImg(){
    return this.section()?.background != '' ?  `${this.urlMedia}${this.section()?.background}` : '/assets/images/bg_yoga.webp'
  }

  getImg2(url:string){
    return `${this.urlMedia}${url}`;
  }

  openReel(index:number, item:Post){
    if(this.screenWidth < 500){
      if(!this.isUnLock(item)) return;

      if(this.section()?.name == 'Mood Zen del día'){
        this.reelService.setSectionPost(this.section()!, index);
        this.dialog.open(ReelComponent, {
          width: '100%',
          height:'100%',
          maxWidth:'100%',
          panelClass: 'full-screen-modal'
        });
      }
    }
  }
}
