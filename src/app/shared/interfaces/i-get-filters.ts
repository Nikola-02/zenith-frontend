import { ILookupTable } from './i-lookup-table';

export interface IGetFilters {
  albums: ILookupTable[];
  genres: ILookupTable[];
  artists: ILookupTable[];
  mediaTypes: ILookupTable[];
}
