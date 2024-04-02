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

export interface TestGet{
  questions:BodyTest[]
}

export enum TypeTest { range = 'range', select_icon = 'select_icon', select_single = 'select_single', multiple = 'multiple' }

export interface BodyTest{
  id:number,
  title:string,
  content:string,
  // type: TypeTest,
  type: string,
  pillarId?: number,
  pillar: PillarTest,
  answers: AnswerTest[]
}

export interface PillarTest{
  id:number,
  name:string
}

export interface AnswerTest{
  id:number,
  content:string,
  ponderation:number,
  img?:string,
  selected?:boolean
}
