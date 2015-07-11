'use strict';

module.exports = {
  name      : 'neon-header',

  extends   : HTMLHeadingElement,

  props     : {
    title : 'Da Phu-phu-phreak!'
  },

  cycle     : {
    created: function created () {
      console.dir(this)
      console.log('created', this, arguments)
      this.classList.add('da-phreak')
      this.textContent = this.props.title
    },

    attached: function attached () {
      console.log('attached', this, arguments)
    },

    detached: function detached () {
      console.log('detached', this, arguments)
    },

    attributeChanged: function attributeChanged (/* name, previousValue, value */) {
      console.log('attributeChanged', this, arguments)
    }
  },

  isElement : true
}

