import { Injectable, computed, signal } from '@angular/core';
import { SectionPost } from '@interfaces/section_post';



export interface SectionReelService {
  sectionPost: SectionPost | null,
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


  setSectionPost(sectionPost:SectionPost, indexSection:number){
    this.#reelDataService.set({sectionPost, indexSection});
    console.log(sectionPost, indexSection);
  }

}
