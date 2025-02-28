import { CommentType } from "./commetType";

export interface CompanyType {
  status: string;
  data: CompanyTypeOne[];
  types: Type[];
  pagination: Pagination;
}

export interface CompanyTypeOne {
  _id: string;
  business_id: string;
  google_id: string;
  place_id: string;
  google_mid: string;
  phone_number: string;
  name: string;
  description: any;
  latitude: number;
  longitude: number;
  full_address: string;
  review_count: number;
  rating: number;
  timezone: string;
  working_hours: WorkingHours;
  website: string;
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
  price_level: any;
  district: string;
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
  is_partner: boolean;
  social_media: SocialMedia;
  mobile_apps: MobileApps;
  created_by: string;
  created_role: string;
  created_at: number;
  deleted: boolean;
  has_menu: boolean;
  support_chat_id: number;
  support_number: string;
  ai_enabled: boolean;
  payment: any;
  comments: CommentType[];
  truegis_rating: number;
  truegis_rating_count: number;
  is_assigned: boolean;
  status: string;
}

export interface WorkingHours {
  Thursday?: string[];
  Friday?: string[];
  Saturday?: string[];
  Sunday?: string[];
  Monday?: string[];
  Tuesday?: string[];
  Wednesday?: string[];
}

export interface PhotosSample {
  photo_id?: string;
  photo_url: string;
  photo_url_large: string;
  video_thumbnail_url: any;
  latitude?: number;
  longitude?: number;
  type?: string;
  photo_datetime_utc?: string;
  photo_timestamp?: number;
}
export interface imgUploadedType {
  status: string;
  image: string;
  thumbnail: string;
}

export interface ReviewsPerRating {
  "1"?: number;
  "2"?: number;
  "3"?: number;
  "4"?: number;
  "5"?: number;
}

export interface About {
  summary: any;
  details: Details;
}

export interface Details {
  Accessibility?: Accessibility;
  Amenities?: Amenities;
  "Service options"?: ServiceOptions;
  Payments?: Payments;
  Offerings?: Offerings;
  "Dining options"?: DiningOptions;
  Atmosphere?: Atmosphere;
  Crowd?: Crowd;
  Children?: Children;
  Planning?: Planning;
  Parking?: Parking;
}

export interface Accessibility {
  "Wheelchair accessible entrance": boolean;
  "Wheelchair accessible parking lot"?: boolean;
}

export interface Amenities {
  "Gender-neutral restroom"?: boolean;
  Restroom?: boolean;
  "Wi-Fi"?: boolean;
}

export interface ServiceOptions {
  Delivery?: boolean;
  "Same-day delivery"?: boolean;
  "Outdoor seating"?: boolean;
  Takeout?: boolean;
  "Dine-in"?: boolean;
  "In-store pickup"?: boolean;
  "Curbside pickup"?: boolean;
  "No-contact delivery"?: boolean;
}

export interface Payments {
  "Credit cards": boolean;
  "Debit cards"?: boolean;
  "NFC mobile payments"?: boolean;
}

export interface Offerings {
  Coffee: boolean;
  "Small plates": boolean;
}

export interface DiningOptions {
  Breakfast?: boolean;
  Dinner?: boolean;
  Dessert?: boolean;
  Seating?: boolean;
  Lunch?: boolean;
}

export interface Atmosphere {
  Casual: boolean;
  Cozy?: boolean;
}

export interface Crowd {
  Groups: boolean;
}

export interface Children {
  "Good for kids": boolean;
}

export interface Planning {
  "Accepts reservations": boolean;
}

export interface Parking {
  "Free parking lot": boolean;
  "Free street parking": boolean;
}
export interface Location {
  type: string;
  coordinates: number[];
}

export interface SocialMedia {
  telegram?: string;
  instagram?: string;
  facebook?: string;
  whatsApp?: string;
  twitter: any;
  youtube: any;
}

export interface MobileApps {
  ios: any;
  android: any;
}

export interface Type {
  _id: string;
  name: string;
  created_by: string;
  created_at: number;
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
