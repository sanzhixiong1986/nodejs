/**
 * @Author: Nick
 * @Date: 2023/8/10 11:43:13
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 11:43:13
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 增加一个中间件
 */
const netbus = require("../../netbus/netbus.js");
const service_manager = require("../../netbus/service_manager.js");
const game_config = require("./game_config");
var gw_service = require("./gw_service.js");
const log = require("../../utils/log.js");

var host = game_config.gateway_config.host;
var ports = game_config.gateway_config.ports;
//启动服务器的的部分
netbus.start_ws_server(host, ports[0], true);
//是否有其他的服务器需要做链接
var game_server = game_config.game_server;
for (var key in game_server) {
    //netbus进行扩展
    log.info("key=", game_server[key].stype);
    netbus.connect_tcp_server(game_server[key].stype, game_server[key].host, game_server[key].port, false);
    service_manager.register_service(game_server[key].stype, gw_service);
}