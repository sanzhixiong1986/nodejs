# nodejs 第二天 tcp websocket的编写

## 使用ws库进行websocket的编写

```javascript
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

```