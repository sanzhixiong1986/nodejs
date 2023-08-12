/**
 * @Author: nick
 * @Date: 2023/8/12 16:24:41
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/12 16:24:41
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 系统的相关的一些操作模块
 */
var game_config = require("../gateway/game_config");
var game_system_service = require("../system_server/game_system_service.js");
var netbus = require('../../netbus/netbus.js');
var service_manager = require('../../netbus/service_manager.js');

var game_system = game_config.game_system_server;

netbus.start_ws_server(game_system.host, game_system.port, netbus.PROTO_JSON);

service_manager.register_service(game_system.stypes, game_system_service);