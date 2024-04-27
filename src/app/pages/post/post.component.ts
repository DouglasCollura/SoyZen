import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, TemplateRef, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Roles } from '@services/auth.service';
import { CardArticleComponent } from '@shared/components/card_article/card_article.component';
import { SectionService, SectionServiceData } from '@services/section.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Post } from '@interfaces/section_post';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    CardArticleComponent,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export default class PostComponent  implements OnInit{


  $audio!: HTMLAudioElement;

  private vgPlayer:VgApiService | undefined;
  public isPlaying = signal(false);

  post = signal<any>(null);
  section = signal<any>([])
  idpost:any
  idsection:any
  potsitos = signal<any>([])
  private role = localStorage.getItem('role');
  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;
  private urlMedia = environment.urlMedia;

  private router = inject(Router);
  private sectionService = inject(SectionService)
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.idpost=param['idPost']
      this.idsection=param['idSection']
      this.loadPost(param['idPost'])
      this.loadSection(param['idSection']);
    })
  }

  onPlayerReady(api: VgApiService) {
    this.vgPlayer = api;
  }

  loadPost(id:any){
    this.sectionService.getPost(id).subscribe((data)=>{

      this.post.set(data);
      console.log(this.post())
    })
  }
  loadSection(id:any){
    this.sectionService.getSection(id).subscribe((data)=>{
       this.potsitos.set(data.posts);


      this.section.set(data.posts.filter(post => post.id != this.idpost))


    })
  }
  goToPreviousPost() {
    const previousIndex = this.potsitos().findIndex((post:any) => post.id == this.idpost) - 1;
    if (previousIndex >= 0) {
      this.idpost = this.potsitos()[previousIndex].id;
      this.router.navigate([`home/post/${this.idpost}/${this.idsection}`]);

    }
  }

  goToNextPost() {
    const nextIndex = this.potsitos().findIndex((post:any) => post.id == this.idpost) + 1;

    if (nextIndex < this.potsitos().length) {
      this.idpost = this.potsitos()[nextIndex].id;
      this.router.navigate([`home/post/${this.idpost}/${this.idsection}`]);

    }
  }

  playPause(){
    this.isPlaying() ?
      this.vgPlayer?.pause() :
      this.vgPlayer?.play();
    this.isPlaying.update(e=> !e);
  }

  getImg2(url:string){
    return `${this.urlMedia}${url}`;
  }
  isUnLock(item:Post){

    return item.tier?.name == Roles.GUEST ||
          (item.tier?.name == Roles.REGISTER && this.role != Roles.GUEST) ||
            (item.tier?.name == Roles.SUBSCRIBE && this.role == Roles.SUBSCRIBE);
  }


}
