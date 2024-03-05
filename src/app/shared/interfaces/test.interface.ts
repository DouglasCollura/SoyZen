import { Feelings } from "./feelings.interface";
import { Interest } from "./interest.interface";

export interface Test{
  name:string,
  feeling?:Feelings,
  focus:number,
  goals:number,
  patient:number,
  behavior:number,
  kindness:number,
  stress:number,
  dream:number,
  physical_activity:number,
  feeding:number,
  energy:number,
  interests?:Interest[]
}
