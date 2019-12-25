import ajax from '@/utils/request.ts';

const urls = {
  MusicComment: "/comment/music",
  PlaylistComment: "/comment/playlist",
  AlbumComment: "/comment/album"
}

export default {
  MusicComment (id:string, limit: number) {
    return ajax.get(`${urls.MusicComment}?id=${id}&limit=${limit}`);
  },
  PlaylistComment(id:string, limit: number) {
    return ajax.get(`${urls.PlaylistComment}?id=${id}&limit=${limit}`);
  },
  AlbumComment(id:string, limit: number) {
    return ajax.get(`${urls.AlbumComment}?id=${id}&limit=${limit}`);
  }
}
