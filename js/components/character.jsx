/* @jsx React.DOM */

var React = require('react')

module.exports = React.createClass({
  displayName: 'phreak-character',

  getInitialState  : function () {
    return {
      color: '#000000'
    }
  },

  attributeChanged : function (name, oldValue, newValue) {
    console.log('Attribute ' + name + ' was changed from ' + oldValue + ' to ' + newValue)
  },

  render           : function () {
    return <div>{this.props.characterName}</div>
  },

  changeColor      : function (color) {
    this.state.color = color
    this.forceUpdate()
  }
})

