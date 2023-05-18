export interface IAnnounce {
  id: string;
  title: string;
  category: string;
  description: string;
  img_url?: string;
  minTickets?: number;
  currentTickets: number;
}
