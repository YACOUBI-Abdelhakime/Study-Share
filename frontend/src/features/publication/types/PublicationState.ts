import { Publication } from "./Publication";

export interface PublicationState {
  publications: Publication[];
  publicationTagValues: string[];
  isLoading: boolean;
}
