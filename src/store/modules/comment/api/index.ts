import ajax from '@/utils/request.ts';

const urls = {
  MusicComment: "/comment/music"
}

export default {
  MusicComment (id:string, limit: number) {
    return ajax.get(`${urls.MusicComment}?id=${id}&limit=${limit}`);
  }
}
