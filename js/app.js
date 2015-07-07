'use strict';

var CSSColor = require('./css-color')
var DaPhreak = require('./da-phreak')

var App = { }

function demo () {
  var selector = '#da-phreak'
  var sheet = App.sheet = DaPhreak.DocumentExtensions.initStyleSheet(document)
  var rule  = new DaPhreak.Rule({
    selector   : selector,
    properties : {
      backgroundColor : CSSColor.rgb3(0),
      color           : CSSColor.rgb3(255),
      textAlign       : 'center'
    }
  })
  var daPhreakEl = document.querySelector(selector)

  function updateTitleWithSheetStatus (el) {
    var prefix = sheet.disabled ? 'dis' : 'en'
    el.title = 'The stylesheet is ' + prefix + 'abled'
  }

  daPhreakEl.addEventListener('click', function click (event) {
    sheet.disabled = !sheet.disabled

    updateTitleWithSheetStatus(event.currentTarget)

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

  updateTitleWithSheetStatus(daPhreakEl)

  setInterval(function randomColorInterval () {
    DaPhreak.RuleExtensions.changeProperty(rule, 'backgroundColor', CSSColor.rand())
  }, 2000)
}

App.start = demo

module.exports = App
