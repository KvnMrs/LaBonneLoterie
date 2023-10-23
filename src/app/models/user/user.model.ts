import { User } from 'firebase/auth';
import { IAnnounce } from '../annouce/annouce.model';

export interface IUser extends User {
  uid: string;
  firstname: string;
  lastname: string;
  city: string;
  phone: string;
  imgProfile: string;
  email: string;
  password: string;
  memberSince: string;
  announcesUser: Array<string>;
  rate: number;
  bankAccount: number;
}
export interface IFavorite {
  announce: IAnnounce[];
}
