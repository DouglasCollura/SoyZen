import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  CUSTOM_ELEMENTS_SCHEMA, Input, signal  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SectionPost } from '@interfaces/section_post';
import { Roles } from '@services/auth.service';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CardComponent,
    RouterModule
  ],
  templateUrl: './section_home.component.html',
  styleUrl: './section_home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SectionHomeComponent {
  role = localStorage.getItem('role');

  @Input({required: true}) set setSection(section:SectionPost){
    this.section.set(section);
    // (this.section()!.type == this.type_test.multiple || this.section()?.type == this.type_test.select_icon) && (this.multiList = this.test()!.answers);
    // this.section()!.type == this.type_test.range && this.setRangeValues();
    // this.section()!.type == this.type_test.select_single && (this.select.set(this.test()!.answers[0].id));
  };

  public section = signal<SectionPost | null>(null);

  public subscribe = localStorage.getItem('role') == Roles.SUBSCRIBE;
}
