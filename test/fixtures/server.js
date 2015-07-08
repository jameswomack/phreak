'use strict';

var HTTP   = require('http'),
    Static = require('node-static')

var fileServer = new Static.Server('./')

function requestReceived (request, response) {
  request.addListener('end', function end () {
    fileServer.serve(request, response)
  }).resume()
}

module.exports = function exports (done) {
  var server = HTTP.createServer(requestReceived)
  server.listen(8124, done.bind(done, server))
}
