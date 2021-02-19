/*
 * @Author: your name
 * @Date: 2021-02-19 17:14:52
 * @LastEditTime: 2021-02-19 17:32:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/Users/wujiabao/Desktop/work/express-practice/index.js
 */
const express = require('express')
const app = express() 

app.use('/static', express.static('public'))

const port = 9009;

app.get('/', function (req, res) {
    res.send('Got a Get request')
})

app.listen(port, () => {
    console.log(`Example app lisastening at http://localhost:${port}`)
})

