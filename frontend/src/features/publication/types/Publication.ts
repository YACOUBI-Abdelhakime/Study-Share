export interface Publication {
  _id: string;
  title: string;
  content: string;
  commentsCount: number;
  isDiscussionOpen: boolean;
  tags: string[];
  userId: string;
  userName: string;
  createdAt: string;
}
