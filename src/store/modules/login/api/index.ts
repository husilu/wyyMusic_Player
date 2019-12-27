import ajax from '@/utils/request.ts';

const urls = {
  Existence: "/cellphone/existence/check?phone=",
  Login: "/login/cellphone",
  userDetail: "/user/detail?uid=",
  logout: "/logout"
}

export default {
  Existence(tel: string) {
    return ajax.get(`${urls.Existence}${tel}`);
  },
  Login(tel: string, pw: string) {
    return ajax.get(`${urls.Login}?phone=${tel}&password=${pw}`);
  },
  userDetail(uid: string) {
    return ajax.get(`${urls.userDetail}${uid}`);
  },
  logout() {
    return ajax.get(`${urls.logout}`);
  }
}
