import { ITrack } from './i-track';
import { IUserPlaylist } from './i-user-playlist';

export interface IPlaylist {
  createdAt: string;
  id: number;
  name: string;
  tracks: ITrack[];
  user: IUserPlaylist;
}
