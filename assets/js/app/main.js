if (!window.called) {
  window.called = true;
  (function() {
    require.config({
      paths: {
        underscore: 'bower_components/underscore/underscore-min',
        Hull: '//d3f5pyioow99x0.cloudfront.net/0.7.9/hull',
        handlebars: 'libs/handlebars-fix',
        'handlebars-runtime': 'bower_components/handlebars/handlebars.runtime',
        compiledTemplats: 'templates/templates-compiled'
      },

      shim: {
        underscore: {
          exports: '_'
        },

        compiledTemplats: {
          deps: ['handlebars-runtime', 'Hull']
        },

        Hull: {
          exports: 'Hull'
        }
      }
    });

    require(['underscore', 'Hull'], function(_, Hull) {
      var app;
      Hull.on('model.hull.me.change', function(msg) {
        if (msg.model.attributes.id) {
          console.log('User Logged In');
          online(msg.model);
        } else {
          console.log('User Logged Out');
          offline(msg.model);
        }
      });

      Hull.init({
        debug: true, //Enable to see all traces from the app
        appId: '527bae00069395de710003d5',
        orgUrl: 'https://a3213198.hullapp.io',
        sources: {

        }
      }, function(hull) {

        console.log('Hull is initialized, here it is', hull);

        app = hull;

        if (app.data.api.model('me').attributes.id) {
          online();
        }

      });

      var online = function() {
        var self = this;
        console.log('Subscribing tod socket');

        if (window.socket) {
          window.socket.socket.reconnect();
        } else {
          window.socket = io.connect();
        }

        if (!window.socket.$events) {
          window.socket.on('connect', function() {

            window.socket.post('/user/subscribe', app.data.api.model('me').attributes, function(response) {
              console.log('window.socket Post Response ', response);
              Hull.emit('online.users.change', response);
            });

            window.socket.on('message', function(msg) {
              // alert('zola');
              Hull.emit('online.users.change', msg);
            });
          });
        }

      };


      var offline = function(usrModel) {
        if (window.socket) {
          console.log('Disconnecting the socket');
          socket.disconnect();
        }
      };

      online = _.debounce(online);
      offline = _.debounce(offline);

    });

  })();

}
