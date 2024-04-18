
export interface SectionPost {
  id:          number;
  name:        string;
  description: string;
  background:  string;
  hasAds:      boolean;
  ads:         any;
  url_ads:     string;
  posts:       Post[];
  collaborators:       Collaborators[];
  type: number;
  textColor: string;
}

export interface Post {
  id?:          number;
  title?:       string;
  description?: string;
  duration?:string;
  category?:    Category;
  subcategory?: Category;
  postType?:    PostType;
  tier?:        Category;
  user?:        User;
  postDetail?:  PostDetail;
}

export interface Collaborators {
  id?:          number;
  name?:       string;
  email?: string;
  phone?:string;
  image?:    any;

}

export interface Category {
  id:          number;
  name:        string;
  description: string;
}

export enum PostMediaType { video = 'video', audio = 'audio', blog = 'blog' };

export interface PostType {
  id:          number;
  name:        PostMediaType;
  description: string;
}

export interface PostDetail {
  id:          number;
  content:     string;
  videoUrl:    null | string;
  imageUrl:    null;
  audioUrl:    null | string;
  thumbnail:   string;
  coverMobile: null;
  coverWeb:    null;
  date:        null;
}

export interface User {
  id:    number;
  name:  string;
  email: string;
  phone: string;
  image: string;
}
