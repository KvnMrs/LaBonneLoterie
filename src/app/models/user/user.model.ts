export interface IUser {
  uid: string;
  firstname: string;
  lastname: string;
  city: string;
  phoneNumber?: string;
  imgUrl?: string;
  email: string;
  password: string;
  memberSince: Date;
  announcesUser?: Array<string>;
  rate?: number;
  accountBalance: number;
}
