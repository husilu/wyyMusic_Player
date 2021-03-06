import ajax from '@/utils/request.ts';

const urls = {
  song: "/song/url?id=",
  songdetail: '/song/detail?ids=',
  lyric: '/lyric?id=',
  checkId: '/check/music?id='
}

export default {
  song (id:string) {
    return ajax.get(`${urls.song}${id}`);
  },
  songdetail(id:string) {
    return ajax.get(`${urls.songdetail}${id}`);
  },
  lyric(id:string) {
    return ajax.get(`${urls.lyric}${id}`);
  },
  checkId(id:string) {
    return ajax.get(`${urls.checkId}${id}`);
  }
}
