import { create } from 'zustand';
import { Mail } from '../types/mail';

interface MailStore {
  mails: Mail[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  toggleRead: (id: string) => void;
  toggleStarred: (id: string) => void;
}
const weeklyReport = "Here is the weekly report for our team: This week, we achieved key milestones, including the completion of Feature X in Project A and resolving critical bugs in Project B. Challenges included resource constraints and technical hurdles, which have been addressed with action plans in place. Goals for next week include deploying Feature X, conducting a sprint retrospective, and initiating Phase 2 of Project B. Team collaboration has been exceptional, with notable contributions from [Name 1] and [Name 2]. Let's keep the momentum going as we move into another productive week!";

const mockMails: Mail[] = [
  {
    id: '1',
    from: 'john@example.com',
    subject: 'Weekly Report',
    body: weeklyReport,
    category: 'Work',
    date: '2024-03-15',
    read: false,
    starred: false,
  },
  {
    id: '2',
    from: 'amazon@shopping.com',
    subject: 'Your Order Confirmation',
    body: 'Thank you for your recent purchase...',
    category: 'Shopping',
    date: '2024-03-14',
    read: true,
    starred: true,
  },
  {
    id: '3',
    from: 'social@linkedin.com',
    subject: 'New Connection Request',
    body: 'You have a new connection request...',
    category: 'Social',
    date: '2024-03-13',
    read: false,
    starred: false,
  },
];

export const useMailStore = create<MailStore>((set) => ({
  mails: [],
  selectedCategory: 'All',
  setMails: (mails:Mail[]) => set({mails: mails}),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  toggleRead: (id) =>
    set((state) => ({
      mails: state.mails.map((mail) =>
        mail.id === id ? { ...mail, read: !mail.read } : mail
      ),
    })),
  toggleStarred: (id) =>
    set((state) => ({
      mails: state.mails.map((mail) =>
        mail.id === id ? { ...mail, starred: !mail.starred } : mail
      ),
    })),
}));