var netbus = require('../netbus/netbus.js');
netbus.start_ws_server("127.0.0.1", 6081, netbus.PROTO_JSON);