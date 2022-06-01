const http = require('http')
const fs = require('fs') 

//const {  } = require('./consultas')



http.createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
        res.setHeader("content-type", "text/html")
        const html = fs.readFileSync("index.html", "utf8")
        res.end(html)
    }
})
/*
http
.createServer((req, res) => {
    if (req.url == '/' && req.method === 'GET') {

        fs.readFile('index.html', (err, data) => {
            if(err){
                res.statusCode = 500;
                res.end()
            }else {
                res.setHeader('Content-type', 'test/html')
                res.end(data)
            }
        })
    }
        
})*/
.listen(3000, console.log('Server ON in localhost:3000'))