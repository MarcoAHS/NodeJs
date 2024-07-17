const http = require('node:http')
const server = http.createServer((req, res) =>  {
    console.log('request received') // -> node side 
    res.end('Mi Primera Chamba')// -> server request response (GET by Default)
})
server.listen(0, () => {
    console.log(`Server working on http://localhost:${server.address().port}`)
})