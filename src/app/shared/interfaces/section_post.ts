import { Post } from "./post";

export interface SectionPost {
  id:          number;
  name:        string;
  description?: string;
  background:  null | string;
  hasAds?:      boolean;
  adsMobile?:   any;
  ads?:         any;
  url_ads?:     string;
  posts:       Post[];
  collaborators?:Collaborators[];
  type: number;
  textColor?: string;
}

export interface Collaborators {
  id?:          number;
  name?:       string;
  email?: string;
  phone?:string;
  image?:    any;

}
