"use strict";

/**
 * @Author: Nick
 * @Date: 2023/8/10 11:46:54
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 11:46:54
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 增加用户的配置
 */
var Stype = require("./Stype");

var game_config = {
  gateway_config: {
    host: "127.0.0.1",
    prots: [6080, 6081]
  },
  game_server: {
    0: {
      stype: Stype.TalkRoom,
      host: "127.0.0.1",
      port: 6084
    },
    1: {
      stype: Stype.Auth,
      host: "127.0.0.1",
      port: 6086
    }
  },
  center_database: {
    host: "127.0.0.1",
    port: 3306,
    db_name: "user",
    uname: "root",
    upad: "sanzhixiong"
  },
  //redis相关配置
  center_redis: {
    host: "localhost",
    port: 6379,
    db_index: 0
  }
};
module.exports = game_config;