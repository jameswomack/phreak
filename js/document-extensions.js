'use strict';

var ElementExtensions = require('./element-extensions')

var STYLE = 'style'

var DocumentExtensions = {
  initStyleSheet  : function initStyleSheet (doc) {
    var styleEl = doc.createElement(STYLE)

    doc.head.appendChild(styleEl)
    return styleEl.sheet
  },

  query           : function query (doc, sel) {
    var list  = doc.querySelectorAll(sel),
        array = Array.prototype.slice.call(list)

    array.on = function on (name, callback) {
      this.forEach(function each (el) {
        el.addEventListener(name, callback)
      })
    }.bind(array)

    array.off = function off (name, callback) {
      this.forEach(function each (el) {
        el.removeEventListener(name, callback)
      })
    }.bind(array)

    return array
  },

  createElement   : function (doc, nodeName) {
    return doc.createElement(nodeName)
  },

  queryForParent: function (doc, parentSel) {
    return parentSel ? this.query(doc, parentSel)[0] : doc.body
  },

  insertElement   : function insertElement (doc, nodeName, parentSel) {
    var parent = this.queryForParent(doc, parentSel),
        el = this.createElement(doc, nodeName)

    parent.appendChild(el)

    return el
  },

  registerAndInsertElement: function registerAndInsertElement (doc, element, parentSel) {
    var Element = this.registerElement(doc, element)

    return this.insertElement(doc, Element.name, parentSel)
  },

  registerAndInsertComponent: function (doc, Component, parentSel, props) {
    document.registerReact(Component.displayName, Component)

    var el = this.createElement(doc, Component.displayName)

    props && (el.setProps(props))

    this.queryForParent(doc, parentSel).appendChild(el)

    return this.insertElement(doc, Component.displayName, parentSel)
  },

  registerElement : function registerElement (doc, element) {
    var descriptors = ElementExtensions.getPropertyDescriptors(element),
        Type        = element.extends

    var registration = doc.registerElement(
      element.name, {
        prototype : Object.create(Type.prototype, descriptors)
      }
    )

    // Only `name` & `prototype` are of much use. Name would be
    // 'neon-header' for elements/neon-header.js
    return registration
  },

  emit            : function emit (doc, eventName, payload) {
    doc.dispatchEvent(
      new CustomEvent(
        eventName,
        payload
      )
    );
  }
}

DocumentExtensions.bindTo = function bindTo (doc) {
  var DX   = DocumentExtensions,
      DocX = { }

  for (var k in DX) {
    if (DX.hasOwnProperty(k)) {
      DocX[k] = DX[k].bind(DX, doc)
    }
  }

  return DocX
}

module.exports = DocumentExtensions
