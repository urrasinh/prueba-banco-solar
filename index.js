const http = require('http')
const fs = require('fs')
const url = require('url')

const { insertar, consultar, eliminar, editar, consultaTransferencia, realizaTransferencia } = require('./consultas')




http.createServer(async (req, res) => {
    if (req.url == '/' && req.method === 'GET') {
        res.setHeader('content-type', 'text/html')
        const html = fs.readFileSync('index.html', 'utf8')
        res.end(html)
    }

    if ((req.url == '/usuario' && req.method === 'POST')) {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', async () => {

            const bodyObject = JSON.parse(body)
            const datos = [bodyObject.nombre, bodyObject.balance]

            const respuesta = await insertar(datos)


            if (respuesta) {
                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(respuesta));

            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    message: `El ejercicio '${bodyObject.nombre}' ya existe`
                }));
            }

        })
    }

    if (req.url == '/usuarios' && req.method === 'GET') {
        // Paso 2
        const registros = await consultar()
        // Paso 3
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros))
    }

    if (req.url.startsWith('/usuario?') && req.method == 'DELETE') {
        
        const { id } = url.parse(req.url, true).query
        
        const respuesta = await eliminar(id)
        res.end(JSON.stringify(respuesta))
    }


    if (req.url.startsWith('/usuario?') && req.method == 'PUT') {
        const { id } = url.parse(req.url, true).query
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', async () => {
            const bodyObject = JSON.parse(body)
            const datos = [ id, bodyObject.name, bodyObject.balance]
            const respuesta = await editar(datos)
            res.end(JSON.stringify(respuesta))
        })
    }
    if ((req.url == '/transferencia' && req.method === 'POST')) {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', async () => {
            console.log(body)
            const bodyObject = JSON.parse(body)
            const datos = [bodyObject.emisor, bodyObject.receptor, bodyObject.monto]

            const respuesta = await realizaTransferencia(datos)

            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(respuesta))
        })
    }

    if (req.url === '/transferencias' && req.method === 'GET') {
        const registros = await consultaTransferencia()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros))
    }


})

    .listen(3000, console.log('Server ON in localhost:3000'))