/**
 * @Author: Nick
 * @Date: 2023/8/10 16:04:19
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 16:04:19
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 */

var netbus = require('../../netbus/netbus.js');
var service_manager = require('../../netbus/service_manager.js');
var auth = require('./auth.js');

netbus.start_ws_server("127.0.0.1", 6082, netbus.PROTO_JSON);

service_manager.register_service(2, auth);

//数据操作
var mysql_center = require("../../database/mysql_center.js");
const game_config = require('../gateway/game_config.js');
mysql_center.connect("127.0.0.1", 3306, "user", "root", "sanzhixiong");
//end

//redis相关操作
var center_redis_config = game_config.center_redis;
var redis_center = require("../../database/redis_center.js");
redis_center.connect(center_redis_config.host, center_redis_config.port);
//end