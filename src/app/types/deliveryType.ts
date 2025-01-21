export interface getAdminType {
  status: string;
  data: getAdminTypeData[];
}

export interface getAdminTypeData {
  _id: string;
  full_name: string;
  username: string;
  signature: number;
  created_by: string;
  created_at: number;
  deleted: boolean;
}



