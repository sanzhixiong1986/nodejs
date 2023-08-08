var log = require('../utils/log.js');
var netbus = require('../netbus/netbus.js');

var proto_mgr = {};

/**
 * 操作
 * @param {*} proto_type 
 * @param {*} str_or_buffer 
 */
function decode_cmd(proto_type, str_or_buffer) {
    str_or_buffer = decrypt(str_or_buffer);//加密
    if (proto_type == netbus.PROTO_JSON) {
        return json_decode(str_or_buffer);
    }
}

/**
 * 进行数据解析
 * @param {*} cmd_json 
 * @returns 
 */
function json_decode(cmd_json) {
    var cmd = JSON.parse(cmd_json);
    if (!cmd ||
        typeof (cmd[0]) == "undefined" ||
        typeof (cmd[1]) == "undefined" ||
        typeof (cmd[2]) == "undefined") {
        return null;
    }
    log.info("json_decode", cmd);
    return cmd;
}

/**
 * 加载数据
 * @param {*} proto_type 
 * @param {*} stype 
 * @param {*} ctype 
 * @param {*} body 
 * @returns 
 */
function encode_cmd(proto_type, stype, ctype, body) {
    var buf = null;
    if (proto_type == netbus.PROTO_JSON) {
        buf = _json_encode(stype, ctype, body);
    }

    if (buf) {
        buf = encrypt_cmd(buf);//加密
    }
    return buf;
}

// 加密
function encrypt_cmd(str_of_buf) {
    return str_of_buf;
}

/**
 * 加载数据
 * @param {*} stype 
 * @param {*} ctype 
 * @param {*} body 
 */
function _json_encode(stype, ctype, body) {
    var cmd = {};
    cmd[0] = stype;
    cmd[1] = ctype;
    cmd[2] = body;
    var str = JSON.stringify(cmd);
    return str;
}

/**
 * 加密
 * @param {*} str_or_buffer 
 * @returns 
 */
function decrypt(str_or_buffer) {
    return str_or_buffer;
}

proto_mgr.decode_cmd = decode_cmd;
proto_mgr.encode_cmd = encode_cmd;

module.exports = proto_mgr;