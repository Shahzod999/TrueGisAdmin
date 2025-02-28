export interface ProductsTypesAll {
  status: string;
  data: ProductType[];
  pagination: Pagination;
}

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageThumbnail: string;
  company_id: string;
  category_id: string;
  price: number;
  weight: any;
  currency: string;
  active: boolean;
  created_by: string;
  created_at: number;
  deleted: boolean;
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
//

export interface SingleProductTypesAll {
  status: string;
  data: SingleProductType;
}

export interface SingleProductType {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageThumbnail: string;
  company_id: string;
  category_id: string;
  price: number;
  weight: any;
  currency: string;
  active: boolean;
  created_by: string;
  created_at: number;
  deleted: boolean;
  discount?: DiscountType;
  companies: CompaniesType[];
}

export interface CompaniesType {
  _id: string;
  name: string;
  address: string;
  logo: string;
}

export interface DiscountType {
  price: number;
  start_date: string;
  end_date: string;
}

export interface CategoryType {
  _id?: string;
  name?: string;
  image?: any;
  imageThumbnail?: any;
  company_id: string;
  created_by?: string;
  created_at?: number;
  deleted?: boolean;
  updated_at?: number;
  updated_by?: string;
  deleted_at?: number;
  deleted_by?: string;
}
