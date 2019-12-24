import ajax from '@/utils/request.ts';

const urls = {
  songList: "/playlist/detail?id="
}

export default {
  songList (id:string) {
    return ajax.get(`${urls.songList}${id}`);
  }
}
