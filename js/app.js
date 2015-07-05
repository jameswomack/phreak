var DaPhreak = require('./da-phreak')
var CSSColor = require('./css-color')

var App = { }

function demo () {
  var sheet = DaPhreak.DocumentExtensions.initStyleSheet(document)
  var rule = new DaPhreak.Rule({
    selector   : '#da-phreak',
    properties : {
      color      : CSSColor.rgb3(255),
      background : CSSColor.rgb3(0)
    }
  })

  console.log(rule.toString())
  /*
   * var sheet = document.styleSheets[0]
   * var rules = sheet.rules
   * var colorRules = rules[0]
   * var style = colorRules.style
   * style.backgroundColor === 'rgb(0, 0, 0)'
   * style.color           === 'rgb(255, 255, 255)'
   * style.cssText === 'color: rgb(255, 255, 255); background: rgb(0, 0, 0);'
   * colorRules.cssText === '#da-phreak { color: rgb(255, 255, 255); background: rgb(0, 0, 0); }'
   * (style.backgroundColor = 'rgb(255, 0, 0)) === "Change the background color to red"'
   */

  App.sheet = sheet

  return DaPhreak.SheetExtensions.pushRule(sheet, rule)
}

App.start = function appStart () {
  demo()
}

module.exports = App;
