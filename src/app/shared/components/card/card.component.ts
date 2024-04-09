import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef, ViewChild, booleanAttribute, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  private dialog = inject(MatDialog);
  private router = inject(Router);


  @Input({transform: booleanAttribute}) isNew:boolean = false;
  @Input({transform: booleanAttribute}) isLock:boolean = false;
  @Input({required: true}) title!:string;
  @Input() time!:string | null;
  @Input() category!:string | null;
  @Input({required: true}) url_img!:string;
  @Input() user:any = null;
  @ViewChild('modalEvent') modalEvent!: TemplateRef<any>;
  private urlMedia = environment.urlMedia;

  openDialog(): void {
    console.log('lock',this.isLock)
    if(!this.isLock){
      this.router.navigateByUrl('home/post');
    }else{
      this.dialog.open(this.modalEvent, {
        width: '400px',
        panelClass: 'full-screen-modal'
      });
    }

  }

  getImg(url:string){
    return `${this.urlMedia}${url}`;
  }

 }
