import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Post, SectionPost } from '@interfaces/section_post';


export interface SectionServiceData {
  loading: boolean;
  loadingSearch: boolean;
  subcategories: any[];
  categorias: any[];
  sections: SectionPost[];
  posts: Post[];
  page:number | null;
}


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private urlApi = environment.apiUrl;

  private optAll = {
    name:"Todas",
    id: null,
    description:''
  }

  #sectionData = signal<SectionServiceData>({
    loading: false,
    loadingSearch: false,
    subcategories:[],
    categorias: [],
    sections: [],
    posts: [],
    page: null
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
        value => this.#sectionData.update(data=> ({...data, sections:value.sections, categorias:[this.optAll,...value.categories]}))
      )
    ).subscribe();
  }

  getSubCategories(id:string){
    this.http.get<any>(`${this.urlApi}/subcategories/category/${id}`).pipe(
      tap(
        value => this.#sectionData.update(data=> ({...data, subcategories:value}))
      )
    ).subscribe();
  }

  filterSections(id:any, idSub:any = null){
    this.getSubCategories(id)
    this.http.get<any>(`${this.urlApi}/sections/filter-by-category?category=${id}${idSub ? `&subcategories=${idSub}&page=${this.#sectionData().page ?? 1}&limit=2` : '' }`).pipe(
      tap(
        value => {
          if(idSub){
            !this.#sectionData().page && this.#sectionData.update(data=> ({...data,page: 1}))
            let filter = value.sections.map((e:any)=> e.posts);
            filter = filter.flat()

            this.#sectionData.update(data=> ({...data, sections: [], posts: this.#sectionData().page &&  this.#sectionData().page != 1? [...this.#sectionData().posts, ...filter] : filter, page:this.#sectionData().page ?? 1}))

            if(value.totalRecordsCount > (this.#sectionData().page! * 2)){
              this.#sectionData.update(data=> ({...data,page: this.#sectionData().page! + 1}))
            }else{
              this.#sectionData.update(data=> ({...data,page: null}))
            }

          }else{
            this.#sectionData.update(data=> ({...data, sections: value.sections, posts:[], page: null}))

          }
        }
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

  clearSubCategory(){
    this.#sectionData.update(value=> ({...value, subcategories:[]}))
  }

  clearPosts(){
    this.#sectionData.update(value=> ({...value, posts:[], page:null}))
  }
}
