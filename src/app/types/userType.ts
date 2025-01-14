export interface userType {
  status: string;
  message: string;
  data: userTypeData;
  token: string;
}

export interface userTypeData {
  _id: string;
  full_name: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface InputUserInfo {
  data: {
    username: string;
    password: string;
  };
}

export interface AllUserData {
  status: string;
  data: userTypeData[];
}

export interface ErrorType {
  status: number;
  data: ErrorTypeData;
}

export interface ErrorTypeData {
  status: string;
  message: string;
  error_name: string;
}
