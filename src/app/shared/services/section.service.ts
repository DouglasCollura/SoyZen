import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import {  SectionPost } from '@interfaces/section_post';
import { Post } from '@interfaces/post';
import { SectionDetail } from '@interfaces/section_detail';


export interface SectionServiceData {
  loading: boolean;
  loadingSearch: boolean;
  loadingLike:boolean;
  subcategories: any[];
  categoriasDetail: any[];
  subcategoriesDetail: any[];
  categorias: any[];
  sections: SectionPost[];
  sectionDetail:SectionDetail | null;
  posts: Post[];
  page:number | null;
  postsDetail: Post[];
  pageDetail:number | null;
  nameSection: string | null;
  iconSection: string | null;
  colorSection: string | null;
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
    loadingLike:false,
    subcategories:[],
    categorias: [],
    subcategoriesDetail:[],
    categoriasDetail: [],
    sections: [],
    sectionDetail:null,
    postsDetail: [],
    pageDetail: null,
    posts: [],
    page: null,
    nameSection:'',
    iconSection:'',
    colorSection:''
  });

  public sectionData = computed(() => this.#sectionData());

  constructor() {
    this.getSections()
    // this.filterSections(2)
  }

  searchPosts(search:string, category:string | null = null){

    this.#sectionData.update(
      value=> ({...value, loadingSearch:true})
    );

    const response = this.http.get<any>(`${this.urlApi}/posts/all/search?search=${search}&page=1&perPage=10${category ? '&category='+category : ''}`).pipe(
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

  getSubCategories(id:string, isDetail:boolean = false){
    isDetail && this.#sectionData.update(data=> ({...data, subcategoriesDetail:[]}))
    this.http.get<any>(`${this.urlApi}/subcategories/category/${id}`).pipe(
      tap(
        value => isDetail ? this.#sectionData.update(data=> ({...data, subcategoriesDetail:value})) : this.#sectionData.update(data=> ({...data, subcategories:value}))
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

            this.#sectionData.update(
              data=> ({
                ...data,
                sections: [],
                posts: this.#sectionData().page &&  this.#sectionData().page != 1 ?
                [...this.#sectionData().posts, ...filter] : filter,
                page:this.#sectionData().page ?? 1}
              ))

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

  setLikePost(idPost:number){

    const userId = localStorage.getItem('userId');
    if(!userId) return;

    this.#sectionData.update(value=> ({...value, loadingLike:true}))
    return this.http.post<any>(`${this.urlApi}/likes`, {
      "postId": idPost,
      "userId": userId
    })
    .pipe(
      tap(()=>{
        this.#sectionData.update(value=> ({...value, loadingLike:false}))
      })
    )
  }

  deleteLikePost(idPost:number){

    const userId = localStorage.getItem('userId');
    if(!userId) return;

    this.#sectionData.update(value=> ({...value, loadingLike:true}))
    return this.http.delete<any>(`${this.urlApi}/likes`, {
      body:{
        "postId": idPost,
        "userId": userId
      }
    })
    .pipe(
      tap(()=>{
        this.#sectionData.update(value=> ({...value, loadingLike:false}))
      })
    )
  }

  setViewPost(idPost:number){
    const userId = localStorage.getItem('userId');
    if(!userId) return;

    this.#sectionData.update(value=> ({...value, loadingLike:true}))
    return this.http.post<any>(`${this.urlApi}/views`, {
      "postId": idPost,
      "userId": userId
    })
    .pipe(
      tap(()=>{
        this.#sectionData.update(value=> ({...value, loadingLike:false}))
      })
    )
  }

  getFeedback(idPost:any){
    const userId = localStorage.getItem('userId');
    if(!userId) return;
    const response = this.http.get<any>(`${this.urlApi}/feedback/user/${userId}/post/${idPost}`).pipe(
    );
    return response;
  }


  setFeelPost(data:any){

    const userId = localStorage.getItem('userId');
    if(!userId) return;

    this.http.post<any>(`${this.urlApi}/feedback-user-posts`,{
      "post": {id:data.idPost},
      "feedback":{id:data.feedback},
      "user": {id:parseInt(userId)}
    }).subscribe();
  }

  getSectionDetail(id:any){
    this.#sectionData.update(value=> ({...value, sectionDetail:null, nameSection:null, colorSection: null, iconSection:null}))

    this.http.get<SectionDetail>(`${this.urlApi}/page-category/category/${id}`).subscribe(
      (data)=>{
        console.log('section ', data);
        this.#sectionData.update(value=> ({...value, sectionDetail:data, nameSection:data.name, colorSection: data.color, iconSection:data.icon}))
      }
    );
  }

  getPostDetail(id:any){
    this.http.get<any>(`${this.urlApi}/posts/subcategory/${id}?page=${this.#sectionData().pageDetail ?? 1}&perPage=10`).pipe(
      tap((value)=>{
        console.log('section ', value);

        !this.#sectionData().pageDetail && this.#sectionData.update(data=> ({...data,pageDetail: 1}))
            let filter = value.content;
            // filter = filter.flat()
            this.#sectionData.update(
              data=> ({
                ...data,
                sectionDetail: null,
                postsDetail: this.#sectionData().pageDetail &&  this.#sectionData().pageDetail != 1 ?
                [...this.#sectionData().postsDetail, ...filter] : filter,
                pageDetail:this.#sectionData().pageDetail ?? 1}
              ))

            if(value.total > (this.#sectionData().pageDetail! * 10)){
              this.#sectionData.update(data=> ({...data,pageDetail: this.#sectionData().pageDetail! + 1}))
            }else{
              this.#sectionData.update(data=> ({...data,pageDetail: null}))
            }
      })
    ).subscribe();
  }

  clearSubCategory(){
    this.#sectionData.update(value=> ({...value, subcategories:[]}))
  }

  clearPosts(){
    this.#sectionData.update(value=> ({...value, posts:[], page:null}))
  }

  clearPostDetail(){
    this.#sectionData.update(value=> ({...value, postsDetail:[], pageDetail:null}))
  }
}
