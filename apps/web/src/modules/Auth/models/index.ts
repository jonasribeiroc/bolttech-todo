export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export type LoginAuthDTO = {
  email: string;
  password: string;
};

export type RegisterAuthDTO = {
  name: string;
  email: string;
  password: string;
};

