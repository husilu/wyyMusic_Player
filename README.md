# wyyMusic_Player
node(照搬别人的代码)+Vue-cli3+Ts(简单的Ts，主要是Ts练手)+vant(UI框架)的一个简易的仿网易云音乐网页App。

服务器端如何启动详见NeteaseCloudMusicApi-master里面的readMe说明。

浏览器端：

```
npm install  // 下载依赖
npm run dev  // 启动项目
```
修改src/utils/request.ts文件
```
const instance = axios.create({
  baseURL: 'http://192.168.1.5:4000' // 修改这里，此处为服务器网络地址，即计算机ip地址+node服务器端口号（默认4000）
});
```
## 功能目标：

- [x] nav （发现，我的，账号）
- [x] 发现页面上半部分
- [x] 发现页面推荐歌单
- [x] 发现页面新碟 + 新歌
- [x] 发现页面歌单（歌单广场）
- [ ] 发现页面排行榜
- [x] 我的页面上半部分
- [x] 我的页面我创建的歌单
- [ ] 我的页面歌单页面
- [ ] 账号页面
- [x] 账号详情页面
- [ ] 歌曲播放页面
- [x] 歌曲搜索页面


# 需要优化的地方：

1：nav哪个高亮判断根据路由来判断，现在是根据的tab值来判断的

2: 歌单广场用户自定义显示类型

3：歌单广场上拉刷新（未实现）

4： 登录的actions里面ajxa报错，导致无法在action里面访问登录api，提到外面访问接口（在组件里面访问，不在actions里面访问）还是会报错 

5： mounted为什么会在beforeRouteEnter之前执行？

答： 并不是mounted在beforeRouteEnter之前执行，是mounted在beforeRouteEnter里面的next函数之前执行。

6:  watch监听，开启{ immediate: true }，会优先于dom构造之前执行？

答：watch监听，开启{ immediate: true }会在created()也就是说在dom挂载之前执行，在beforeCreate之后执行。

7： 搜索页面的防抖

防抖：触发高频事件后n秒内函数只会执行一次，如果n秒内再次被触发，则重新计算时间

节流：
一定时间内 只会触发一次函数，会稀释函数的执行频率
