
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export enum View {
  Chat = 'Chat',
  Journal = 'Journal',
  Trackers = 'Trackers',
  Resources = 'Resources',
  Profile = 'Profile',
}
