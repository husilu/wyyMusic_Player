import ajax from '@/utils/request.ts';

const urls = {
  playlist: "/playlist/catlist",
  topplaylist: "/top/playlist?cat="
}

export default {
  playlist () {
    return ajax.get(`${urls.playlist}`);
  },
  topplaylist(cat:string) {
    return ajax.get(`${urls.topplaylist}${cat}`);
  }
}
