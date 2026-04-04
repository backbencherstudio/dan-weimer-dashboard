export type UserType = "CONTRACTOR" | "ADMIN" | "EMPLOYEE"; // add whatever your backend sends

export type User = {
    id:            string;
    name:          string;
    email:         string;
    avatar:        string | null;
    country_code:  string;
    phone_number:  string;
    type:          UserType;
    gender:        string | null;
    date_of_birth: string | null;
    created_at:    string;
  };

export type LoginDto = {
  email:    string;
  password: string;
};

export type LoginResponse = {
  success:       boolean;
  message:       string;
  type:          UserType;
  authorization: {
    type:          "bearer";
    access_token:  string;
    refresh_token: string;
  };
};


export type MeResponse = {
    success: boolean;
    data:    User;
  };