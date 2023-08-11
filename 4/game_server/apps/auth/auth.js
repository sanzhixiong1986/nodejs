/**
 * @Author: Nick
 * @Date: 2023/8/10 09:37:45
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 09:55:05
 * Description: 
 * Copyright: Copyright (©)}) 2023 Nick. All rights reserved.
 * Auth 服务器的操作
 */
const proto_mgr = require("../../netbus/proto_mgr.js");
var log = require("../../utils/log.js");
var utils = require("../../utils/utls.js");
var Cmd = require("../../apps/Cmd.js");
var Respones = require("../../apps/Respones.js");
const auth_model = require("./auth_model.js");

var STYPE_AUTH = 2; //游戏的


/**
 * 游戏登陆操作
 * @param {*} session 
 * @param {*} body 
 */
function guest_login(session, body) {
    checkBody(body);

    var ukey = body;
    auth_model.guest_login(session, ukey, function (ret) {
        session.send_cmd(STYPE_AUTH, Cmd.Auth.GUEST_LOGIN, ret);
    });
}

/**
 * 用户信息修改
 * @param {*} session 
 * @param {*} body 
 */
function guest_edit(session, body) {
    checkBody(body);

    let jsonObj = JSON.stringify(body);
    if (!jsonObj) {
        session.send_cmd(STYPE_AUTH, Cmd.Auth.GUEST_LOGIN, Respones.INVALID_PARAMS);
        return;
    }
    auth_model.guest_edit_userInfo_by_id(session, JSON.parse(jsonObj), function (rret) {
        session.send_cmd(STYPE_AUTH, Cmd.Auth.GUEST_EDIT, 1);
    })
}


/**
 * 用户账号密码登陆
 * @param {*} session 
 * @param {*} body 
 */
function login_user(session, body) {
    checkBody(body);

    let jsonObj = JSON.stringify(body);
    let json = JSON.parse(jsonObj);

    if (!json) {
        session.send_cmd(STYPE_AUTH, Cmd.Auth.GUEST_LOGIN, Respones.INVALID_PARAMS);
        return;
    }

    auth_model.login_user_center(session, json, function (ret) {
        if (ret === 1) {
            session.send_cmd(STYPE_AUTH, Cmd.Auth.LOGIN, 1);
        } else {
            session.send_cmd(STYPE_AUTH, Cmd.Auth.LOGIN, -1000);
        }
    });
}


/**
 * 用户查找密码，并且修改密码
 * @param {*} session 
 * @param {*} body 
 */
function find_password(session, body) {
    checkBody(body);
}


function checkBody(body) {
    if (!body) {
        session.send_cmd(STYPE_AUTH, Cmd.Auth.GUEST_LOGIN, Respones.INVALID_PARAMS);
        return;
    }
}

var service = {
    stype: STYPE_AUTH,
    name: "Auth_Service",

    init: function () {
        log.info(this.name + "service initialized");
    },

    //每个服务器收到数据调用
    on_recv_player_cmd: function (session, ctype, body) {
        log.warn(this.name + " on_recv_player_cmd");
        switch (ctype) {
            case Cmd.Auth.GUEST_LOGIN:
                guest_login(session, body);
                break
            case Cmd.Auth.GUEST_EDIT:
                guest_edit(session, body);
                break;
            case Cmd.Auth.LOGIN:
                login_user(session, body);
                break;
            case Cmd.Auth.FIND_PASSWORD:
                find_password(session, body);
                break;
        }
    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.error(this.name + " on_player_disconnect", session.session_key);
    }
}

module.exports = service;