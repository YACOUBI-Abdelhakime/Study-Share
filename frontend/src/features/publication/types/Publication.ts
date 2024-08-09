export interface Publication {
  title: string;
  content: string;
  commentCount: number;
  publicationDate: string;
  isDiscussionOpen: boolean;
  tags: string[];
  userId: string;
  userName: string;
}
