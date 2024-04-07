import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { SectionPost } from '@interfaces/section_post';


export interface SectionServiceData{
  loading:boolean,
  sections:SectionPost[],
}


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private urlApi = environment.apiUrl;

  #sectionData = signal<SectionServiceData>({
    loading:false,
    sections:[],
  })

  public sectionData = computed(() => this.#sectionData());

  constructor() {
    this.getSections()
  }

  getSections(){
    this.http.get<SectionPost[]>(`${this.urlApi}/sections`).pipe(
      tap(
        value => this.#sectionData.update(data=> ({...data, sections:value}))
      )
    ).subscribe();
  }

}
