export interface IUser {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUserProfile {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  announcesUser: Array<string>;
  imgUrl: string;
  phoneNumber: string;
  rate: number;
}
