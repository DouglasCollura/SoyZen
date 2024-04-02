import { Injectable, computed, inject, signal } from '@angular/core';
import { BodyTest, Test, TestGet } from '@interfaces/test.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface TestServiceData{
  loading:boolean,
  tests:BodyTest[],
}


@Injectable({
  providedIn: 'root'
})
export class TestService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private urlApi = environment.apiUrl;

  #testData = signal<TestServiceData>({
    loading:false,
    tests:[],
  })

  public testData = computed(() => this.#testData());
  // form = this.formBuilder.group({
  //   name: ['', Validators.required],
  //   code: ['', Validators.required],
  //   trayectos: [[], Validators.required],
  // })

  public test = signal<Test>({
    name:'',
    focus:0,
    dream:1,
    energy:1,
    feeding:1,
    goals:0,
    kindness:1,
    patient:0,
    physical_activity:1,
    stress:0,
    behavior:1,
  });

  getTests():Observable<TestGet | null>{
    this.#testData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.get<TestGet>(`${this.urlApi}/questions/grouped-by-pillar/1`);
    this.#testData.update(
      value=> ({...value, loading:false})
    );
    return response;
  }


}
