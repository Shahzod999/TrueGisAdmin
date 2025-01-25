import { CompanyTypeOne } from "./companyType";

export interface CommentType {
  _id: string;
  user_id: string;
  rating: number;
  message: string;
  images: string[];
  thumbnails: string[];
  company_id: string;
  status: string;
  created_at: number;
  deleted: boolean;
  company: CompanyTypeOne;
  user: User;
  replies?: Reply[];
  updated_at?: number;
  updated_by?: string;
}

export interface Reply {
  reply_id: string;
  message: string;
  reply_by: string;
  reply_from: string;
  reply_date: number;
  updated_at: number;
  updated_by: string;
}

export interface User {
  _id: string;
  telegram_id: number;
  lang: string;
  phone?: string;
  full_name?: string;
  step: any;
  search_query?: string;
  telegram_name: string;
  telegram_username?: string;
  telegram_profile_photo?: TelegramProfilePhoto;
  last_location: LastLocation;
  created_at: string;
  updated_at: string;
  is_blocked: boolean;
  is_admin: boolean;
  can_order: boolean;
  last_activity: string;
  last_activity_type?: string;
  referral_code: any;
}

export interface TelegramProfilePhoto {
  file_id?: string;
  image?: string;
  thumbnail?: string;
}

export interface LastLocation {
  type: string;
  coordinates: number[];
}
