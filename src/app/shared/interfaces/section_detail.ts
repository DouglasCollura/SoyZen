import { Post } from "./post";

export enum SectionDetailType {
  RECENT = 'RECENT',
  SUBCATEGORY = 'SUBCATEGORY',
  TEXT = 'TEXT',
  IMAGETEXT = 'IMAGETEXT',
}

export interface SectionDetail {
  id:       number;
  name:     string;
  icon:     string;
  color:    string;
  template: Template;
  sections: Section[];
}

export interface Section {
  id:           number;
  name:         string;
  title:        null | string;
  subtitle:     null;
  background:   null | string;
  content:      null | string;
  countRecent:  number | null;
  order:        number;
  image:        null | string;
  type:         SectionDetailType;
  posts:        Post[];
  subcategory?: Subcategory;
}

export interface Subcategory {
  id:          number;
  name:        string;
  description: string;
}

export interface Template {
  id:   number;
  name: string;
}
