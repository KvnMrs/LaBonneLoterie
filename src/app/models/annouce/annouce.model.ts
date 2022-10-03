export interface annouceModel {
  id: number
  name : string,
  category: string,
  description: string,
  img?: string,
  minTickets?: number
  currentTickets?: number
}