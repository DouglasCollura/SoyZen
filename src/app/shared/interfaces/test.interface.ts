import { Feelings } from "./feelings.interface";
import { Interest } from "./interest.interface";

export interface Test{
  name:string,
  feeling?:Feelings,
  focus:number,
  behavior:number,
  interests?:Interest[]
}
