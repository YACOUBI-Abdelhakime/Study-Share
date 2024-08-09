import { Publication } from "./Publication";

export interface PublicationState {
  publications: Publication[];
  isLoading: boolean;
}
