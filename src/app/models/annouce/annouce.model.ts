export interface IAnnounce {
  id: string;
  name: string;
  category: string;
  description: string;
  img_url?: string;
  minTickets?: number;
  currentTickets: number;
}
