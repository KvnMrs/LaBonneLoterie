import { Timestamp } from "firebase/firestore";

export interface IAnnounce {
  id: string;
  title: string;
  category: string;
  tags?: Array<string>;
  description: string;
  imgsAnnounce: Array<string>;
  estimate: number;
  ticketPrice: number;
  minTickets?: number;
  maxTickets?: number;
  currentTickets: number;
  createdAt: number | Date;
  endHour: number;
  endDate: Date;
  endAt: Timestamp;
  authorUid: string;
  status: string;
}
