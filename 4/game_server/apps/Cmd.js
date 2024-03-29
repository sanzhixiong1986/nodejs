/**
 * @Author: Nick
 * @Date: 2023/8/11 09:02:34
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/11 09:02:34
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 相关的命令行 
 */
var Cmd = {
    USER_DISCONNECT: 10000,
    Auth: {
        GUEST_LOGIN: 1, //游戏登陆
        GUEST_EDIT: 2, //用户修改
        LOGIN: 3, // 登陆模块
        FIND_PASSWORD: 4, //找密码
    },
    GameSystem: {
        GET_GAME_INFO: 1//游戏信息
    }
}

module.exports = Cmd;