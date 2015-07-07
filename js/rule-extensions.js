var isUndefined = require('amp-is-undefined')

var RuleExtensions = Object.create({
  referToCSSStyleRuleAndIndex: function referToCSSStyleRuleAndIndex (rule,
                                 cssStyleRule, index) {
    rule.cssStyleRule      = cssStyleRule
    rule.cssStyleRuleIndex = index
    // sheet === rule.cssStyleRule.parentStyleSheet
    return rule
  },

  changeProperty: function changeProperty (rule, name, value) {
    rule.properties[name] = value

    if (this.hasCSSStyleRuleReference(rule)) {
      rule.cssStyleRule.style[name] = value
    }

    return rule
  },

  derefCSSStyleRuleAndIndex: function derefCSSStyleRuleAndIndex (rule) {
    delete rule.cssStyleRule
    delete rule.cssStyleRuleIndex

    return rule
  },

  hasCSSStyleRuleReference: function hasCSSStyleRuleReference (rule) {
    return !isUndefined(rule.cssStyleRule)
  },

  hasValidCSSStyleRuleIndex: function hasValidCSSStyleRuleIndex (rule) {
    if (this.hasCSSStyleRuleReference(rule)) {
      var index = rule.cssStyleRuleIndex
      var parentStyleSheet = rule.cssStyleRule.parentStyleSheet
      var cssStyleRuleAtIndex = parentStyleSheet.cssRules.item(index)
      return cssStyleRuleAtIndex === rule.cssStyleRule
    }

    return false
  }
})

module.exports = RuleExtensions
