'use strict';

var App = require('./app')

document.addEventListener('DOMContentLoaded', function ready (/* event */) {
  window.App = App
  App.start()
})
