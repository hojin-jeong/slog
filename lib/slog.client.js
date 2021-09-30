
const SocketIO  = require('socket.io-client')
const JSerial   = require('jserial')

class slogc {
    constructor(opts = {}) {
        this.$name = opts.name
        this.$socket = new SocketIO(opts.address, opts)
        this.$serializer = new JSerial()

        process.stdout.oWrite = process.stdout.write
        process.stdout.write = this.$_stdoutWrite.bind(this)
        process.stderr.oWrite = process.stderr.write
        process.stderr.write = this.$_stderrWrite.bind(this)
        if(opts.enableGlobalException) {
            process.once('uncaughtException', async err => {
                process.stderr.write(err && err.stack ? err.stack : err, _ => {
                    setTimeout(process.exit, 100)
                })
            })
        }
    }

    $_stdoutWrite(msg, cb) {
        this.postLog('stdout', msg, cb)
        process.stdout.oWrite(msg)
    }
    $_stderrWrite(msg, cb) {
        this.postLog('stderr', msg, cb)
        process.stderr.oWrite(msg)
    }

    postLog(type, message, callback) {
        this.$socket.send(this.$serializer.serialize({
            type,
            name: this.$name,
            message: message && message.stack ? message.stack : message,
        }), callback)
    }

    get socket() {
        return this.$socket
    }
}

module.exports = slogc