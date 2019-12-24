import ajax from '@/utils/request.ts';

const urls = {
  playlist: "/api/top/playlist"
}

export default {
  playlist (param) {
    return ajax.get(`${urls.playlist}?limit=${param.limit}&order=${param.order}`, { notify: true }); // limit = 30, order = 'hot', cat
  }
}
