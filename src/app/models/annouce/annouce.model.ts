export interface IAnnounce {
  id: string;
  title: string;
  category: string;
  tags?: Array<string>;
  description: string;
  img_url: string;
  estimate: number;
  ticketPrice: number;
  minTickets?: number;
  maxTickets?: number;
  currentTickets: number;
}
