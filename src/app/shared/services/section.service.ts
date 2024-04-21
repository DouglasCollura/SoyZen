import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Post, SectionPost } from '@interfaces/section_post';


export interface SectionServiceData{
  loading:boolean,
  sections:SectionPost[],
  loadingSearch:boolean
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
    loadingSearch:false,
    sections:[],
  })

  public sectionData = computed(() => this.#sectionData());

  constructor() {
    this.getSections()
  }

  searchPosts(search:string){

    this.#sectionData.update(
      value=> ({...value, loadingSearch:true})
    );

    const response = this.http.get<any>(`https://api-dev.soyzen.com/api/v1/posts/all/search?search=${search}&page=1&perPage=10`).pipe(
      tap(()=>{
        this.#sectionData.update(
          value=> ({...value, loadingSearch:false})
        );
      })
    );

    return response;
  }

  getSections(){
    this.http.get<SectionPost[]>(`${this.urlApi}/sections`).pipe(
      tap(
        value => this.#sectionData.update(data=> ({...data, sections:value}))
      )
    ).subscribe();
  }

  getPost(id:any){


    const response = this.http.get<Post>(`${this.urlApi}/posts/${id}`).pipe(
 
    );

    return response;
  }

  getSection(id:any){


    const response = this.http.get<SectionPost>(`${this.urlApi}/sections/${id}`).pipe(
 
    );

    return response;
  }


}
