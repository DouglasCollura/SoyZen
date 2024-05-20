
export interface Post {
  id:           number;
  title:        string;
  description:  string;
  duration:     string;
  orderSection: number;
  countLikes:   number;
  likeMe:       boolean;
  category:     Category;
  subcategory:  Category;
  postType:     PostType;
  tier:         Category;
  user:         User;
  date:any;
  postDetail:   PostDetail;
}


export enum PostMediaType { video = 'video', audio = 'audio', blog = 'blog', ads = 'ads' };

export interface PostType {
  id:          number;
  name:        PostMediaType;
  description: string;
}

export interface Category {
  id:          number;
  name:        string;
  description: string;
}

export interface PostDetail {
  id:          number;
  content:     string;
  videoUrl:    string;
  imageUrl:    string;
  audioUrl:    string;
  thumbnail:   string;
  coverMobile: string;
  coverWeb:    string;
  date:        string;
  adsUrl:      string;
}

export interface User {
  id:    number;
  name:  string;
  email: string;
  phone: string;
  image: string;
}
