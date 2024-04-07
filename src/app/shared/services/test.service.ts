import { Injectable, computed, inject, signal } from '@angular/core';
import { BodyTest, Test, TestGet } from '@interfaces/test.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


export interface TestServiceData{
  loading:boolean,
  tests:BodyTest[],
  ip:string,
  name:string | null,
  epoch:string
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
    ip: '',
    name:null,
    epoch:''
  });

  #testProgressQuestions = signal<any>(null);


  public testData = computed(() => this.#testData());
  public testProgress = computed(() => this.#testProgressQuestions());
  // form = this.formBuilder.group({
  //   name: ['', Validators.required],
  //   code: ['', Validators.required],
  //   trayectos: [[], Validators.required],
  // })


  constructor(){

  }

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

  saveName(name:string){
    this.#testData.update(
      value=> ({...value, name:name})
    );
    this.generateUuidToken().subscribe()
  }

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


  generateUuidToken(){
    this.#testData.update(
      value=> ({...value, loading:true})
    );
    const response = this.http.get<any>(`https://api.ipify.org/?format=json`).pipe(
      tap(data=>{
        const ip = data.ip.replaceAll('.','');
        const epoch = new Date(2010, 6, 26).getTime() / 1000;
        localStorage.setItem('uuidToken', `${this.#testData().name}${ip}${epoch}`);
        this.#testData.update(
          value=> ({...value, loading:false, ip, epoch: epoch.toString()})
        );
        this.saveProgressTest();
      })
    );

    return response;

  }


  saveProgressTest(){
    this.http.post<any>(`${this.urlApi}/guest/answer`,
    {
      "uuidToken": localStorage.getItem('uuidToken'),
      "ipAddress": this.#testData().ip,
      "name": this.#testData().name,
      questions: this.#testProgressQuestions()?.guestAnswers ?? []
    }).subscribe();
  }

  setProgress(question:any){
    this.#testProgressQuestions.update((value:any)=>({...value, guestAnswers:[...value.guestAnswers, question]}))
    console.log(this.#testProgressQuestions());
  }

  getProgress(uuidToken : string):Observable<any | null>{
    this.#testData.update(
      value=> ({...value, loading:true})
    );
      return this.http.get<any>(`${this.urlApi}/guest/bytoken/${uuidToken}`).pipe(
        tap((data)=>{
          const {name, uuidToken, ipAddress} = data;
          this.#testData.update(
            value=> ({...value, loading:false, name, ip:ipAddress})
          );
          this.#testProgressQuestions.set(data);
        })
      );
  }

}
