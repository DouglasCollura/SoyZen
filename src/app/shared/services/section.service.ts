import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Post, SectionPost } from '@interfaces/section_post';


export interface SectionServiceData {
  loading: boolean;
  loadingSearch: boolean;
  categorias: any[];
  sections: SectionPost[];
  // Add the missing property
  add: (section: SectionPost) => void; // Function to add a section
}


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private urlApi = environment.apiUrl;

  #sectionData = signal<SectionServiceData>({
    loading: false,
    loadingSearch: false,
    categorias: [],
    sections: [],
    // Initialize the add property
    add: (section: SectionPost) => {
      // Implement logic to add a section to the sections array
      this.#sectionData.update(data => ({ ...data, sections: [...data.sections, section] }));
    }
  });

  public sectionData = computed(() => this.#sectionData());

  constructor() {
    this.getSections()
    // this.filterSections(2)
  }

  searchPosts(search:string){

    this.#sectionData.update(
      value=> ({...value, loadingSearch:true})
    );

    const response = this.http.get<any>(`${this.urlApi}/posts/all/search?search=${search}&page=1&perPage=10`).pipe(
      tap(()=>{
        this.#sectionData.update(
          value=> ({...value, loadingSearch:false})
        );
      })
    );

    return response;
  }

  getSections(){
    this.http.get<any>(`${this.urlApi}/sections`).pipe(
      tap(
        value => this.#sectionData.update(data=> ({...data, sections:value.sections, categorias:value.categories}))
      )
    ).subscribe();
  }

  filterSections(id:any){

    this.http.get<any>(`${this.urlApi}/sections/filter-by-category?category=${id}`).pipe(
      tap(
        value => this.#sectionData.update(data=> ({...data, sections:value.sections}))
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
