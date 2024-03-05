import { Injectable, signal } from '@angular/core';
import { Test } from '@interfaces/test.interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {

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

}
