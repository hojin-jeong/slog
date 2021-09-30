
const EE2       = require('eventemitter2')
const SocketIO  = require('socket.io')
const JSerial   = require('jserial')

class slogs extends EE2 {
    constructor(opts = {}) {
        super({
            wildcard: true
        })

        this.$serializer = new JSerial()
        this.$port = opts.port || 8080
        this.$server = undefined
    }

    $_onConnection(socket) {
        socket.on('message', this.$_onSocketMessage.bind(this))
    }
    $_onSocketMessage(buffer) {
        const message = this.$serializer.deserialize(buffer)
        this.emit(`${message.name || 'NONAME'}.${message.type}`, message)
    }

    bind(server) {
        this.$server = SocketIO(server)
        this.$server.on('connection', this.$_onConnection.bind(this))
    }
    listen() {
        this.bind()
        this.$server.listen(this.$port)
    }
}

module.exports = slogs