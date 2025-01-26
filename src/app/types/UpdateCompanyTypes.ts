export interface UpdateCompanyType {
  _id: string;
  company_id: string;
  current_data: UpdateCompanyCurrentData;
  requested_changes: CompanyUpdateRequestedChanges;
  requester_name: string;
  requester_phone_number: string;
  requester_position: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  company: CompanyUpdate;
}

export interface UpdateCompanyCurrentData {
  name: string;
  phone_number: any;
  description: any;
  logo: any;
  logoThumbnail: any;
  full_address: string;
  working_hours: WorkingHours;
  website: any;
  photos_sample: PhotosSample[];
  social_media: SocialMedia;
  mobile_apps: MobileApps;
  email: any;
}

export interface WorkingHours {
  Tuesday: string[];
  Wednesday: string[];
  Thursday: string[];
  Friday: string[];
  Saturday: string[];
  Sunday: string[];
  Monday: string[];
}

export interface PhotosSample {
  photo_id: string;
  photo_url: string;
  photo_url_large: string;
  video_thumbnail_url: any;
  latitude: number;
  longitude: number;
  type: string;
  photo_datetime_utc: string;
  photo_timestamp: number;
}

export interface SocialMedia {
  telegram: any;
  instagram: any;
  facebook: any;
  twitter: any;
  youtube: any;
}

export interface MobileApps {
  ios: any;
  android: any;
}

export interface CompanyUpdateRequestedChanges {
  name: string;
  phone_number: any;
  description: any;
  logo: string;
  logoThumbnail: string;
  full_address: string;
  working_hours: WorkingHours;
  website: any;
  photos_sample: PhotosSample[];
  social_media: SocialMedia;
  mobile_apps: MobileApps;
  email: any;
}



export interface CompanyUpdate {
  _id: string;
  business_id: string;
  google_id: string;
  place_id: string;
  google_mid: string;
  phone_number: any;
  name: string;
  description: any;
  latitude: number;
  longitude: number;
  full_address: string;
  review_count: number;
  rating: number;
  timezone: string;
  working_hours: WorkingHours;
  website: any;
  verified: boolean;
  place_link: string;
  cid: string;
  reviews_link: string;
  owner_id: string;
  owner_link: string;
  owner_name: string;
  booking_link: any;
  reservations_link: any;
  business_status: string;
  type: string;
  subtypes: string[];
  photos_sample: PhotosSample[];
  reviews_per_rating: ReviewsPerRating;
  photo_count: number;
  about: About;
  address: string;
  order_link: any;
  online_menu_link: any;
  price_level: any;
  district: any;
  street_address: string;
  city: string;
  zipcode: any;
  state: string;
  country: string;
  owner_telegram_id: any;
  location: Location;
  logo: any;
  logoThumbnail: any;
  order_type: any;
  is_accept_orders: boolean;
  has_menu: boolean;
  is_partner: boolean;
  social_media: SocialMedia;
  mobile_apps: MobileApps;
  email: any;
  created_by: string;
  created_role: string;
  created_at: number;
  deleted: boolean;
}




export interface ReviewsPerRating {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface About {
  summary: any;
  details: Details;
}

export interface Details {
  Accessibility: Accessibility;
}

export interface Accessibility {
  "Wheelchair accessible entrance": boolean;
  "Wheelchair accessible parking lot": boolean;
}

export interface Location {
  type: string;
  coordinates: number[];
}

