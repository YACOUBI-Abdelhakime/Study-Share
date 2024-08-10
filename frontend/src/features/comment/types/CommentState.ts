import { Comment } from "./Comment";

export interface CommentState {
  // The key is the publication ID
  comments: { [publicationId: string]: Comment[] };
  openCommentsPanelPublicationId: string;
  isLoading: boolean;
}
