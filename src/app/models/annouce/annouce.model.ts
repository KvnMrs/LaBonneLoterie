export interface IAnnounce {
  id: string;
  title: string;
  category: string;
  tags?: Array<string>;
  description: string;
  imgsAnnounce: Array<string> | null;
  estimate: number;
  ticketPrice: number;
  minTickets?: number;
  maxTickets?: number;
  currentTickets: number;
  createdAt: Date;
}
