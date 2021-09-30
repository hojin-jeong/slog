
# slog
[![GitHub](https://img.shields.io/github/license/hojin-jeong/slog)](https://github.com/hojin-jeong/slog/blob/master/license.md)
[![npm](https://img.shields.io/npm/v/@map_side/slog)](https://www.npmjs.com/package/@map_side/slog)

> Super simple log share

### Using Libraries
> jserial, socket.io, socket.io-client, eventemitter2

# Quick Start

## Installation
```shell
npm install @map_side/slog --save
```

## Basic Usage
```javascript
const sslog = require('@map_side/slog')

// Server - standalone
const server = new sslog.server({
    port: '3000'
    // support socket.io server opts
})
server.listen()

// Server - with web server
const httpServer = require('http').createServer()
const server = new sslog.server({
    // support socket.io server opts
})
server.bind(httpServer)
httpServer.listen(3000)

// Server - receive log
server.on('*.*', message => {
    console.log("Received:", message)
})

// Client
new sslog.client({
    name: "test",
    address: 'ws://127.0.0.1:7077',
    enableGlobalException: true // catch uncaughtException error after process.exit()
    // support socket.io client opts
})
```