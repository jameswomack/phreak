var SheetExtensions = {
  // 'push' here means that it's appended to `sheet`, as per `Array`
  pushRule: function pushRule (sheet, rule) {
    return sheet.insertRule(rule.toString(), sheet.cssRules.length)
  },

  // 'add' here means that it's added according to `rule.index`
  addRule: function addRule (sheet, rule) {
    return sheet.insertRule.apply(sheet, rule.toArray())
  },

  // Self-explanatory ⬇️
  addRuleAtIndex: function addRuleAtIndex (sheet, rule, index) {
    return sheet.insertRule(rule.toString(), index)
  }
}

module.exports = SheetExtensions
