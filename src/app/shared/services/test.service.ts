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
    behavior:1,
  });

}
