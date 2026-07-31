export interface Incident {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  category:string;
  reportedBy: string;
  createdAt?: string;
  updatedAt?: string;
}
