//游戏的模块
var log = require("../utils/log.js");
var proto_mgr = require("../netbus/proto_mgr.js");

var service_modules = {};

/**
 * 注册对应的模块
 * @param {*} stype 
 * @param {*} service 
 */
function register_service(stype, service) {
    if (service_modules[stype]) {
        log.warn(service_modules[stype].name + "service is ergister!!!!");
    }
    service_modules[stype] = service;
    service.init();
}

/**
 * 接受相关的数据
 * @param {*} session 
 * @param {*} str_or_buf 
 */
function on_recv_client_cmd(session, str_or_buf) {
    log.warn("service_manager.on_recv_client_cmd=", str_or_buf,session.proto_type);
    var cmd = proto_mgr.decode_cmd(session.proto_type, str_or_buf);
    if (!cmd) {
        return false;
    }
    var stype, ctype, body;
    stype = cmd[0];
    ctype = cmd[1];
    body = cmd[2];
    if (service_modules[stype]) {
        service_modules[stype].on_recv_player_cmd(session, ctype, body);
    }
    return true;
}


//玩家掉线
function on_client_lost_connect(session) {
    for (var key in service_modules) {
        service_modules[key].on_player_disconnect(session);
    }
}

var service_manager = {
    on_client_lost_connect: on_client_lost_connect,
    on_recv_client_cmd: on_recv_client_cmd,
    register_service: register_service,
}

module.exports = service_manager;