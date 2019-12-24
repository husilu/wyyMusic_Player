import ajax from '@/utils/request.ts';

const urls = {
  song: "/song/url?id=",
  songdetail: '/song/detail?ids='
}

export default {
  song (id:string) {
    return ajax.get(`${urls.song}${id}`);
  },
  songdetail(id:string) {
    return ajax.get(`${urls.songdetail}${id}`);
  }
}
