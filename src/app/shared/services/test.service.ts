import { Injectable, signal } from '@angular/core';
import { Test } from '@interfaces/test.interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  public test = signal<Test>({
    name:'',
    focus:0,
    behavior:1,
  });

}
