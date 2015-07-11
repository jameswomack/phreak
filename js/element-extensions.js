'use strict';

var LifecycleConstants = require('./element-lifecycle-constants')

module.exports = Object.create({
  getPropertyDescriptors : function getPropertyDescriptors (element) {
    var descriptors = { }

    for (var k in element.cycle) {
      if (k in LifecycleConstants.mapToDOM) {
        var key = LifecycleConstants.mapToDOM[k]

        descriptors[key] = {
          value : element.cycle[k]
        }
      }
    }

    if (element.props) {
      descriptors.props       = { }
      descriptors.props.value = element.props
    }

    return descriptors
  }
})
