const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234;
app.disable('x-powered-by') //Quita Header de Agua
app.use(express.json()) //MiddleWare para poder usar el JSON desde el Body
app.use((req, res, next) => {
    if(req.method !== 'POST') return next() //Si no es POST ignora este Middleware
    req.body.timeStamp = Date.now()
    next()
}) //Middleware personalizado, aqui solo le agrego al body un atributo extra, 
app.get('/', (req, res) => {
    res.json({message: "Chambeo"})
}) //Endpoint definition
app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
}) //Endpoint Definition
app.use((req, res) => {
    res.status(404).send('<h1>Not Found Endpoint</h1>')
}) //Middleware sin restriccion, todas las solicitudes pasan por el, en este caso endpoint por defecto
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
}) //Server Listening