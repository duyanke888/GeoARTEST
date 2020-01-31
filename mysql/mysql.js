const express = require('express');
const mysql = require('mysql');
const app = express();

//建立连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  port: 3306
})

// 设置为可跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 前端请求地址为  http://localhost:8001/login
app.get('/login', (req, res) => {
  const sql = 'SELECT * FROM artest'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: '用户不存在',
        affextedRows: 0
      })
    }
    res.json({
      code: 200,
      message: results,
      affextedRows: results.affextedRows
    })
  })
})

app.listen(8001, () => {
  console.log('ok');
})