import { ILookupTable } from './i-lookup-table';

export interface ITrack {
  id: number;
  audio: string;
  createdAt: string;
  description: string;
  duration: number;
  image: string;
  likesCount: number;
  name: string;
  price: number;
  album: ILookupTable;
  artist: ILookupTable;
  mediaType: ILookupTable;
  genre: ILookupTable;
}
