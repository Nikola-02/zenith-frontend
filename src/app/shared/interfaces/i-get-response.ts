import { ITrack } from './i-track';

export interface IGetResponse {
  currentPage: number;
  data: ITrack[];
  pages: number;
  perPage: number;
  totalCount: number;
}
