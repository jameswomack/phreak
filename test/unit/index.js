'use strict';

var TEST_ROOT      = 'test',
    FIXTURES_ROOT  = TEST_ROOT + '/fixtures'

if (Boolean(process.env.TEST_BABEL_OVERRIDE)) {
  console.info('Running tests with Babel enabled in BH Test Tools')
  require('babel/register')
}

var path = require('path')

if (process.env.TEST_COVERAGE) {
  var defaults = {
    pattern            : process.cwd(),
    'data-cover-never' : [ 'node_modules', 'test/unit/' ]
  }
  var pkgTestConfig = require(process.cwd() + '/package.json')['bh-test'] || {}
  var coverNever = defaults['data-cover-never']

  if (pkgTestConfig['data-cover-never']){
    coverNever = coverNever.concat(pkgTestConfig['data-cover-never'])
  }

  var config = {
    pattern            : pkgTestConfig.pattern || defaults.pattern,
    'data-cover-never' : coverNever
  }

  require('blanket')(config)
}

var chai        = require('chai'),
    sinonChai   = require('sinon-chai')

/*
 * Sinon–Chai provides a set of custom assertions for using the Sinon.JS spy,
 * stub, and mocking framework with the Chai assertion library. You get all the
 * benefits of Chai with all the powerful tools of Sinon.JS.
*/
chai.use(sinonChai)

/*
 * Globals
 */
global.sinon    = require('sinon')
global.chai     = chai
global.expect   = chai.expect
// Rewire is magic: rewire paths must be relative to this file
global.rewire   = require('rewire')
global.jsdom    = require('jsdom')

global.requiret = function requiret (pathRelativeToRoot) {
  return require(path.join(process.cwd(), pathRelativeToRoot))
}

global.requiref = function requiref (pathRelativeToFixturesFolder) {
  return require(path.join(process.cwd(), FIXTURES_ROOT, pathRelativeToFixturesFolder))
}

global.itShould = function itShould (description, block) {
  it('should ' + description, block)
}
