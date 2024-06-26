export interface IGetResponse<T> {
  currentPage: number;
  data: T[];
  pages: number;
  perPage: number;
  totalCount: number;
}
