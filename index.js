'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultDocType = '<!doctype html>';

function hapiReactRouter(server, options, done){

  var routes = options.routes;
  options.doctype = options.doctype || DefaultDocType;

  server.decorate('reply', 'router', function(data){
    var response = this.response().hold();

    Router.run(routes, this.request.url.path, function(Handler){
      var component = React.createElement(Handler, data);
      var html = React.renderToString(component);
      response.source = options.doctype + html;
      response.send();
    });

    return response;
  });

  done();
}

hapiReactRouter.attributes = {
  pkg: require('./package.json')
};

module.exports = {
  register: hapiReactRouter
};
