const http = require('http');
const { client } = require('websocket');
const websocketServer = require('websocket').server;

let num = 0;

const clients = {
    count: 0
}

const httpServer = http.createServer((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
});
httpServer.listen(8080, () => console.log("On"))

const wsServer = new websocketServer({
    "httpServer": httpServer
})

wsServer.on("request", request => {
    // connect
    const connection = request.accept(null, request.origin)
    connection.on("close", () => {
        console.log("Closed")
        clients.count--
    })
    connection.on("message", (data) => {
        let message = JSON.parse(data.utf8Data)
        for (let i = 0; i < clients.count; i++) {
            if (clientId != i + 1) {
                let client = clients[i + 1]
                client.connection.send(JSON.stringify(message))
            }
        }
    })

    // generate a client id
    const clientId = generateId()
    clients[clientId] = {
        connection: connection,
        id: clientId
    }

    clients.count++
    console.log(`Client logged with id: ${clientId}, and connection ${connection}\nthe number of clients is: ${clients.count}`);
})

function generateId() {
    num++
    return num
}