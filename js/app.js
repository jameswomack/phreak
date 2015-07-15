'use strict';

var CSSColor = require('./css-color')
var CSSUnit  = require('./css-unit')
var DaPhreak = require('./da-phreak')

var em = CSSUnit.em

var App = {
  get doc() {
    return DaPhreak.DocumentExtensions.bindTo(document)
  },

  demo : function demo () {
    // The Pointer Event Polyfill
    // This was released with a proper build so...
    require('./vendor/jquery/pep')

    var selector = '.da-phreak'

    var query = this.doc.query
    var sheet = App.sheet = this.doc.initStyleSheet()

    // getComputedStyle(document.querySelector('h1')) if we want to match exactly
    var rule  = new DaPhreak.Rule({
      selector   : selector,
      properties : {
        backgroundColor : CSSColor.rgb3(0),
        color           : CSSColor.rgb3(255),
        display         : 'block',
        fontSize        : em(1.5),
        fontWeight      : 'bold',
        textAlign       : 'center'
      }
    })

    var daPhreakEls = query(selector)

    daPhreakEls.on('pointerup', function onPointerUp (/* event */) {
      sheet.disabled = !sheet.disabled

      return false
    }, false)

    /*
     * var sheets = document.styleSheets // StyleSheetList
     * var sheet = sheets[0]             // CSSStyleSheet
     * var rules = sheet.cssRules        // CSSRuleList
     * var colorsRule = rules[0]
     * var style = colorsRule.style
     * style.backgroundColor === 'rgb(0, 0, 0)'
     * style.color           === 'rgb(255, 255, 255)'
     * style.cssText === 'color: rgb(255, 255, 255); background: rgb(0, 0, 0);'
     * colorsRule.cssText === '#da-phreak { color: rgb(255, 255, 255); background: rgb(0, 0, 0); }'
     * colorsRule.selectorText === '#da-phreak'
     * (style.backgroundColor = 'rgb(255, 0, 0)) === "Change the background color to red"'
     */

    DaPhreak.SheetExtensions.pushRule(sheet, rule)

    setInterval(function randomColorInterval () {
      DaPhreak.RuleExtensions.changeProperty(rule, 'backgroundColor', CSSColor.rand())
    }, 2000)
  },

  registerElements : function registerElements () {
    // https://www.npmjs.com/package/document-register-element
    // http://www.html5rocks.com/en/tutorials/webcomponents/customelements/
    // Polyfill for document.registerElement
    require('document-register-element')

    this.doc.registerAndInsertElement(require('./elements/neon-header'), 'hgroup')

    // https://github.com/PixelsCommander/ReactiveElements
    // Adds `document.registerReact`
    require('reactive-elements')

    this.doc.registerAndInsertComponent(require('./components/character.jsx'), 'section', {
      characterName: 'Crazy Eyes'
    })
  },

  start : function start () {
    this.registerElements()
    this.demo()
  }
}

module.exports = App
