const http = require('http');
const { client } = require('websocket');
const websocketServer = require('websocket').server;

let num = -1;

const clients = []

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
        console.log("Connection closed for id: " + clientId)
        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];
            if (client.id == clientId) {
                clients.pop(client)
            }
        }
        console.log("Clients remaining: " + clients.length);
    })
    connection.on("message", (data) => {
        let message = JSON.parse(data.utf8Data)
        console.log(message.message + ' by ' + message.name + ' Client id: ' + clientId);
        for (let i = 0; i < clients.length; i++) {
            if (clientId != clients[i].id) {
                let client = clients[i]
                client.connection.send(JSON.stringify(message))
            }
        }
    })

    // generate a client id
    const clientId = generateId()
    clients.push({
        id: clientId,
        connection: connection
    })
    
    clients.count++
    console.log(`Client logged with id: ${clientId}\nthe number of clients is: ${clients.length}`);
})

function generateId() {
    num++
    return num
}