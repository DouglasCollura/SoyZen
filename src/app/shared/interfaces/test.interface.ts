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

export enum TypeTest { range, select_icon, select_single, multiple }

export interface BodyTest{
  id:number,
  title:string,
  content:string,
  type: TypeTest,
  pillar: PillarTest,
  answer: answerTest[]
}

export interface PillarTest{
  id:number,
  name:string
}

export interface answerTest{
  id:number,
  content:string,
  score:number,
  img?:string,
  selected?:boolean
}
