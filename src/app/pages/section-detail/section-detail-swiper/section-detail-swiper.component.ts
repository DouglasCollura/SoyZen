import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { ReelComponent } from '@shared/components/reel/reel.component';
import { environment } from '../../../../environments/environment';
import { Section } from '@interfaces/section_detail';
import { ReelService } from '@services/reel.service';
import { Post } from '@interfaces/post';
import { SectionService, SectionServiceData } from '@services/section.service';

@Component({
  selector: 'app-section-detail-swiper',
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
  templateUrl: './section-detail-swiper.component.html',
  styleUrls:[ './section-detail-swiper.component.scss', './section-detail-swiper-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class SectionDetailSwiperComponent {


  @Input({required: true}) set setSection(section:Section){
    this.section.set(section);
  };

  // @Input({required: true}) set setTitleSection(titleSection:String){
  //   this.titleSection.set(titleSection);
  // };

  public activeSlideIndex = 0;
  private dialog = inject(MatDialog);
  private reelService = inject(ReelService);
  private authService = inject(AuthService);
  private role = localStorage.getItem('role');
  public section = signal<Section | null>(null);
  public titleSection = signal<String | null>(null);
  private urlMedia = environment.urlMedia;
  public screenWidth: any;
  private sectionService = inject(SectionService);
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());

  constructor(){
    this.screenWidth = window.innerWidth;
  }

  isUnLock(item:Post){
    return this.authService.isUnLock(item);
  }

  getImg(){
    return this.section()?.background ?  `${this.urlMedia}${this.section()?.background}` : ''
  }

  getImg2(url:string){
    return `${this.urlMedia}${url}`;
  }

  openReel(index:number, item:Post){
      if(!this.isUnLock(item)) return;

      this.reelService.setSectionPost(this.section()!.posts, index);
      this.dialog.open(ReelComponent, {
        width: '100%',
        height:'100%',
        maxWidth:'100%',
        panelClass: 'full-screen-modal'
      });
  }

  selectSubCategory(id:number | null){
    this.sectionService.clearPostDetail()
    id ?  this.sectionService.getPostDetail(id) : this.sectionService.getSectionDetail(id);
  }

 }
