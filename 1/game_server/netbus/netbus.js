/**
 * @Author: Nick
 * @Date: 2023/8/10 09:55:27
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 09:55:27
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 */
var net = require('net');
var ws = require('ws');

var log = require('../utils/log.js');

var service_manager = require("./service_manager.js");
const proto_mgr = require('./proto_mgr.js');
const { stype } = require('../test/talk_room.js');

var netbus = {
    PROTO_JSON: 1,
    PROTO_BUF: 2,
}

/**
 * websocket 的相关操作
 * @param {*} ip 
 * @param {*} port 
 * @param {*} proto_type 
 */
function start_ws_server(ip, port, proto_type) {
    log.info("starting websocket server");
    var server = new ws.Server({
        host: ip,
        port: port
    });

    function on_server_client_comming(client_sock) {
        ws_add_client_session_event(client_sock, proto_type);
    }
    server.on('connection', on_server_client_comming);

    function on_server_listen_error(err) {
        log.error("on_server_listen_error", err);
    }
    server.on('error', on_server_listen_error);

    function on_server_listen_close(err) {
        log.error("on_server_listen_close", err);
    }
    server.on('close', on_server_listen_close);
}


/**
 * 添加ws的相关操作
 * @param {*} session 
 * @param {*} proto_type 
 */
function ws_add_client_session_event(session, proto_type) {
    session.on("close", function () {
        on_session_exit(session);
    });

    session.on("error", function (err) { });

    //链接到对应的数据
    session.on("message", function (data) {
        //是json的操作
        if (session.proto_type == netbus.PROTO_JSON) {
            //解析相关数据
            on_session_recv_cmd(session, data);
        }
    })

    on_session_enter(session, proto_type, true);
}

var global_session_list = {};   //存放进入游戏的相关用户
var global_session_key = 1;
/**
 * 是否有用户进来
 * @param {*} session 
 * @param {*} proto_type 
 * @param {*} is_ws 
 */
function on_session_enter(session, proto_type, is_ws) {
    if (is_ws) {
        //log.info("on_session_enter", session);
    }
    session.last_pkg = null;
    session_is_ws = is_ws;
    session.proto_type = proto_type;
    session.is_connected = true;
    //添加扩展的方法
    session.send_encoded_cmd = session_send_encoded_cmd;//服务器发送给客户端的方法
    session.send_cmd = session_send_cmd;
    //加入到列表中
    global_session_list[global_session_key] = session;
    session.session_key = global_session_key;
    global_session_key++;
}

/**
 * 发送数据的方法
 * @param {*} cmd 
 */
function session_send_encoded_cmd(cmd) {
    if (!this.is_connected) {
        return;
    }
    this.send(cmd);
}

/**
 * 解析相关的数据
 * @param {*} session 
 * @param {*} str_or_buffer 
 */
function on_session_recv_cmd(session, str_or_buffer) {
    log.info("on_session_recv_cmd");
    if (!service_manager.on_recv_client_cmd(session, str_or_buffer)) {
        session_close(session);
    }
}

/**
 * 是否是字符串
 * @param {*} obj 
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object string]';
}

/**
 * 退出
 * @param {*} session 
 */
function on_session_exit(session) {
    log.info("session_exit");
    session.is_connected = false;//恢复状态
    service_manager.on_client_lost_connect(session);
    session.last_pkg = null;
    if (global_session_list[session.session_key]) {
        global_session_list[session.session_key] = null;
        delete global_session_list[session.session_key];
        session.session_key = null;
    }
}

/**
 * 关闭
 * @param {*} session 
 */
function session_close(session) {
    session.close();
}

/**
 * 发送数据
 * @param {*} session 
 * @param {*} cmd 
 */
function session_send(session, cmd) {
    if (!cmd) {
        return;
    }
    session.send(cmd);
}

/**
 * 发送数据相关
 * @param {*} stype 
 * @param {*} ctype 
 * @param {*} body 
 */
function session_send_cmd(stype, ctype, body) {
    
    if (!this.is_connected) {
        return;
    }
    var cmd = null;
    cmd = proto_mgr.encode_cmd(1, stype, ctype, body);
    log.info("server send client", cmd);
    if (!cmd) {
        return;
    }
    
    this.send_encoded_cmd(cmd);
}

netbus.start_ws_server = start_ws_server;

netbus.session_send = session_send;
netbus.session_close = session_close;

module.exports = netbus; //导出相关的操作