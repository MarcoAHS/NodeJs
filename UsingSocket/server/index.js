import express from "express"
import logger from "morgan"
import { Server } from "socket.io"
import { createServer } from 'node:http'

const port = process.env.PORT ?? 1234;
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

io.on('connection', (socket) => {
    console.log('Conectado')
    socket.on('disconnect', () => {
        console.log('Desconectado')
    })
    socket.on('chat message', (msg) => {
        const username = socket.handshake.auth.username ?? 'anonymous'
        io.emit('chat message', msg, username)
    })
})
app.use(logger('dev'))
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})
server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})