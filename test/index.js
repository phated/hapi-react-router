'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var hapi = require('hapi');
var plugin = require('../');

lab.experiment('hapi-react-router', function(){

  var server;

  lab.beforeEach(function(done){
    server = new hapi.Server();
    done();
  });

  lab.test('registers as a plugin', function(done){
    server.register({
      register: plugin
    }, function(err){
      code.expect(err).to.not.exist();
      done();
    });
  });
});
