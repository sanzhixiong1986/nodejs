var proto_mgr = {
    PROTO_JSON: 1,

    encode_cmd: encode_cmd,
    decode_cmd: decode_cmd
}

/**
 * 组装数据
 * @param {*} proto_type 
 * @param {*} stype 
 * @param {*} ctype 
 * @param {*} body 
 * @returns 
 */
function encode_cmd(proto_type, stype, ctype, body) {
    var buf = null;
    if (proto_type === proto_mgr.PROTO_JSON) {
        buf = _json_encode(stype, ctype, body);
    }

    if (buf) {
        buf = encrypt_cmd(buf);
    }
    return buf;
}

/**
 * 加密
 * @param {*} str_or_buf 
 */
function encrypt_cmd(str_or_buf) {
    return str_or_buf;
}

/**
 * 解密
 */
function decrypt_cmd(str_or_buf) {
    return str_or_buf;
}

/**
 * 对数据进行组装
 * @param {*} stype 
 * @param {*} ctype 
 * @param {*} body 
 * @returns 返回json数据
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
 * 数据的操作
 * @param {*} proto_type 
 * @param {*} str_or_buf 
 * @returns 
 */
function decode_cmd(proto_type, str_or_buf) {
    str_or_buf = decrypt_cmd(str_or_buf); //解密
    return json_decode(str_or_buf)
}

/**
 * 
 * @param {*} cmd_json 
 * @returns 
 */
function json_decode(cmd_json) {
    var cmd = null;
    try {
        cmd = JSON.parse(cmd_json);
    }
    catch (e) { }
    return cmd;
}


module.exports = proto_mgr;