# nodejs 第一天安装必要的库(mysql,redis,ws)

## 安装mysql
npm install mysql

## 安装redis
npm install redis

## 安装ws
npm install ws

## 安装Express
npm install express

## 使用Express

```javascript
var express = require("express");
var path = require("path");

if (process.argv.length < 3) {
    console.log("node webserver.js port");
    return;
}

var app = express();
var port = parseInt(process.argv[2]);

process.chdir("./apps/webserver");
console.log(process.cwd());

app.use(express.static(path.join(process.cwd(), "www_root")));

app.listen(port);

console.log("webserver started at port " + port);

```

在apps内部创建一个webserver进行网页的相关的操作，现在是做了一个index.html 输出了一个helloworld，这个是为http作为操作