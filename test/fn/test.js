'use strict';

var serverCreator = require('../fixtures/server')

module.exports = {
  test : function test (browser) {
    serverCreator(function done (server) {
      browser
        .url('http://localhost:8124/html/index.html')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('#da-phreak', 1000)
        .click('#da-phreak')
        .wait(1000)
        .expect.element('#phreaky-stylie').to.have.attribute('title')
          .which.contains('disabled')
        .end(function end (/* testResult */) {
          server.close()
        })
    })
  }
};
