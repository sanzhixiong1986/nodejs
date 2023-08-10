/**
 * @Author: Nick
 * @Date: 2023/8/10 09:56:33
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 09:56:33
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 */
var log = require('../utils/log.js');
var netbus = require('../netbus/netbus.js');
var proto_mgr = require('../netbus/proto_mgr.js');

var data = {
    uname: 'binary',
    upwd: '123456'
}

var buf = proto_mgr.encode_cmd(netbus.PROTO_JSON, 1, 1, data);
log.info(buf);
var cmd = proto_mgr.decode_cmd(netbus.PROTO_JSON, buf);
log.info(cmd[2]['uname']);