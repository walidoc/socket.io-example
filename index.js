const express = require('express')
const socket = require('socket.io')

const app = express()
app.use(express.static('public'))

const server = app.listen(4000, () => {
    console.log('app is listening on port number 4000')
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)
    
    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

})
