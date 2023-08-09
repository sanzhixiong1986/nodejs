var proto_mgr = require('proto_mgr');

var websocket = {
    sock: null,
    serives_handler: null,
    proto_type: 0,
    is_connected: false,

    _on_opened: function (event) {
        console.log("ws connect server success");
        this.is_connected = true;
    },

    _on_recv_data: function (str_or_buf) {

        console.log("收到数据", str_or_buf);
        if (!this.serives_handler) {
            return;
        }

        var cmd = proto_mgr.decode_cmd(this.proto_type, str_or_buf.data);
        if (!cmd) {
            return;
        }

        var stype = cmd[0];
        if (this.serives_handler[stype]) {
            this.serives_handler[stype](cmd[0], cmd[1], cmd[2]);
        }
    },

    _on_socket_close: function (event) {
        if (this.sock) {
            this.close();
        }
    },

    _on_socket_err: function (event) {
        this.close();
    },

    connect: function (url, proto_type) {
        this.sock = new WebSocket(url);
        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._on_recv_data.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
        this.proto_type = proto_type;
    },

    /**
     * 发送苏剧
     * @param {*} style 
     * @param {*} ctype 
     * @param {*} body 
     */
    send_cmd: function (style, ctype, body) {
        if (!this.sock || !this.is_connected) {
            return;
        }
        var buf = proto_mgr.encode_cmd(this.proto_type, style, ctype, body);
        this.sock.send(buf);
    },

    /**
     * 关闭操作
     */
    close: function () {
        this.is_connected = false;
        if (this.sock !== null) {
            this.sock.close();
            this.sock = null;
        }
    },

    register_serivces_handler: function (serivces_handler) {
        this.serives_handler = serivces_handler;
    }
}

websocket.connect("ws://127.0.0.1:6081/ws", 1);

module.exports = websocket;