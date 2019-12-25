import ajax from '@/utils/request.ts';

const urls = {
  banner: "/banner",
  personalized: "/personalized?limit=6",
  searchDefault: '/search/default',
  searchHot: '/search/hot/detail',
  searchSuggest: '/search/suggest',
  searchkey: '/search?keywords=',
  newestAlbum: '/album/newest',
  zjDetail: '/album?id=',
  zjDynamic: '/album/detail/dynamic?id='
}

export default {
  banner() {
    return ajax.get(`${urls.banner}`); // limit = 30, order = 'hot', cat
  },
  personalized() {
    return ajax.get(`${urls.personalized}`);
  },
  searchDefault() {
    return ajax.get(`${urls.searchDefault}`);
  },
  searchHot() {
    return ajax.get(`${urls.searchHot}`);
  },
  searchSuggest(param: any) {
    return ajax.get(`${urls.searchSuggest}?keywords=${param}&type=mobile`);
  },
  searchkey(keywords: string) {
    return ajax.get(`${urls.searchkey}${keywords}`);
  },
  newestAlbum() {
    return ajax.get(`${urls.newestAlbum}`);
  },
  zjDetail(id: string) {
    return ajax.get(`${urls.zjDetail}${id}`);
  },
  zjDynamic(id: string) {
    return ajax.get(`${urls.zjDynamic}${id}`);
  }
}
