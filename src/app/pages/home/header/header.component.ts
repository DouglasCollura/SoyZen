import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Roles } from '@services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { NofityItemComponent } from '@shared/components/nofity-item/nofity-item.component';
import { notifyItem, typeNotify } from '@interfaces/notify-item';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';
import { Subject, debounceTime } from 'rxjs';
import { SectionService, SectionServiceData } from '@services/section.service';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
    NofityItemComponent,
    FooterComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','./header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class HeaderComponent implements AfterViewInit {

  private urlMedia = environment.urlMedia;
  public router = inject(Router);
  private sectionService = inject(SectionService);

  public roles = Roles;
  public role = localStorage.getItem('role');
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
  private inputSubject = new Subject<string>();
  public sectionData = computed<SectionServiceData>(()=> this.sectionService.sectionData());

  public searchText:string = '';
  public listSearch = signal<null | [] | any>(null);
  public showSearch = signal<boolean>(false);

  constructor(){
    this.notifications.set(this.listNotify)
  }

  ngAfterViewInit(): void {

    this.inputSubject.pipe(debounceTime(500)).subscribe((e:any) => {
      this.searchInvestigator(e)
    });
  }


  searchInvestigator(data:any) {
    if(data == ''){
      this.listSearch.set(null);
      this.showSearch.set(false);
      return;
    }

    this.sectionService.searchPosts(data).subscribe((data)=>{
      this.listSearch.set(data);
      this.showSearch.set(true);
      console.log(data)
    })
    // this.loading = true;
    // this.investigatorService.search(data)
    //   .subscribe(e => {
    //     console.log(e)
    //     this.loading = false;
    //     this.investigators = e
    //   })
  }

  onInputChange(value: any) {
    this.inputSubject.next(value.target.value);
  }

  getImage(img:string){
    return `${this.urlMedia}${img}`
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

  clearNotify(){
    this.notifications.set([])
  }

  blur(){
    console.log('asd')
  }
}
