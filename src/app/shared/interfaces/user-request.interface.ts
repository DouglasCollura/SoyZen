
export interface UserRequest {
  data:    User;
  support: Support;
}

export interface User {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}

export interface Support {
  url:  string;
  text: string;
}

export interface UserAuth {
  id:                   number;
  name:                 string;
  email:                string;
  phone:                string;
  image:                string;
  active:               boolean;
  resetToken:           null;
  resetTokenExpiration: null;
  created_at:           Date;
  updated_at:           Date;
  tier:                 Tier;
  roles:                Tier[];
  token:                string;
}

export interface Tier {
  id:          number;
  name:        string;
  description: string;
  active?:     boolean;
  created_at:  Date;
  updated_at:  Date;
}
