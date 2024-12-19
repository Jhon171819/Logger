export interface Mail {
  id: string;
  from: string;
  subject: string;
  body: string;
  category: string;
  date: string;
  read: boolean;
  starred: boolean;
}