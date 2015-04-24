'use strict';

var React = require('react');
var Router = require('react-router');

function hapiReactRouter(server, options, done){

  var routes = options.routes;

  server.decorate('reply', 'router', function(data){
    var response = this.response().hold();

    Router.run(routes, this.request.path, function(Handler){
      var component = React.createElement(Handler, data);
      var html = React.renderToString(component);
      response.source = html;
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
