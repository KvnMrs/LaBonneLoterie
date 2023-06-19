import { User } from 'firebase/auth';

export interface IUser extends User {
  uid: string;
  firstname: string;
  lastname: string;
  city: string;
  phone: string;
  imgUrl: string;
  email: string;
  password: string;
  memberSince: Date;
  announcesUser: Array<string>;
  rate: number;
  accountBalance: number;
}
