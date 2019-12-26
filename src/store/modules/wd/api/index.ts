import ajax from '@/utils/request.ts';

const urls = {
  userplayList: "/user/playlist?uid="
}

export default {
  userplayList (id:string) {
    return ajax.get(`${urls.userplayList}${id}`);
  }
}
