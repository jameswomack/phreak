'use strict';

var STYLE = 'style'

var DocumentExtensions = {
  initStyleSheet : function initStyleSheet (doc) {
    var styleEl = doc.createElement(STYLE)
    doc.head.appendChild(styleEl)
    return styleEl.sheet
  }
}

module.exports = DocumentExtensions
