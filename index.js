const express = require('express')
const app = express()  

const port = 9000;

app.get('/', function (req, res) {
    res.send('Got a Get request')
})

app.listen(port, () => {
    console.log(`Example app lisastening at http://localhost:${port}`)
})

