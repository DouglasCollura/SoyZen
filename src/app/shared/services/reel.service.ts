import { Injectable, computed, signal } from '@angular/core';
import { Post, PostMediaType } from '@interfaces/post';
import { SectionPost } from '@interfaces/section_post';



export interface SectionReelService {
  sectionPost: Post[] | null,
  indexSection:number | null
}


@Injectable({
  providedIn: 'root'
})
export class ReelService {

  #reelDataService = signal<SectionReelService>({
    sectionPost:null,
    indexSection:null
  });

  public reelDataService = computed(() => this.#reelDataService());


  setSectionPost(sectionPosts:Post[], indexSection:number){
    this.#reelDataService.set({
      sectionPost:null,
      indexSection:null
    });
    const sectionPost:Post[] = sectionPosts.filter(data => data.postType.name != 'blog' && data.postType.name != 'ads' )
    this.#reelDataService.set({sectionPost, indexSection});
    console.log(sectionPost, indexSection);
  }

}
