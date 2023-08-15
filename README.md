# nodejs 游戏服务器的开发分类

[第一天-安装相关的库文件](https://github.com/sanzhixiong1986/nodejs/tree/main/1)

[第二天-tcp websocket编写](https://github.com/sanzhixiong1986/nodejs/tree/main/2)

[第三天-游戏的数据结构的定义](https://github.com/sanzhixiong1986/nodejs/tree/main/3)

### 添加日志

8-11 添加中心数据相关的操作，增加用户游客账号的登陆，正式账号的登陆。
文件4把json改成messagepack方式进行传输

8-15 把gateway加入进来

游戏服务器相关模块

```diff

+ 1: 游客注册，游客登陆

+ 2: 手机注册，手机登录

+ 3: 游客账号 bind手机;

+ 4: 微信账号, 注册与登陆;

5: 游戏排行耪；

6: 好友,添加好友，验证，查找好友;

+ 7: 每日签到和登陆奖励;
+       初始化用户的领奖的操作

8: 用户信息和用户资料的修改;

9:任务系统和奖励;

10: 五子棋网络对战游戏，

11: 游戏聊天，道具;

12: 游戏语音聊天;

13: 房间战绩;

14: 查看玩家信息;

15: 商城充值与商品兑换;

16: 玩家群聊;

17: 系统消息，

18: 好友聊天;

19: 系统配置文件，热更新系统的部署;

20: 服务器启动脚本编写

21: node.js上线发布