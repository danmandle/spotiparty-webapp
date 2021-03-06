

if (!window.called) {
  window.called = true;
  (function() {
    require.config({
      waitSeconds: 20,
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
          online(app.data.api.model('me').attributes);
        }

      });

      var online = function(user) {
        var self = this;
        console.log('Subscribing tod socket');

        if(window.location.pathname === '/') {
          if(Hull.me) {
            window.location.replace('/parties');
          }
        }
        if(window.location.pathname === '/logout') {
          Hull.logout(function() {
            window.location.replace('/');
          });
        }

        if(window.location.pathname === '/search' && Hull.me && !Hull.me.attributes.extra.partyId) {
          window.location.replace('/partyId');
        }

        if (window.socket) {
          window.socket.socket.reconnect();
        } else {
          window.socket = io.connect();
        }

        if (!window.socket.$events) {
          window.socket.on('connect', function() {


            window.socket.post('/user/subscribe', app.data.api.model('me').attributes, function(response) {
              console.log('window.socket Post Response ', 'User', response);
              Hull.emit('online.users.change', response);
            });

            window.socket.get('/party', {}, function(response) {
              console.log('window.socket Post Response', 'Party', response);
              // Hull.emit('party.change', response);
            });

            window.socket.on('message', function(msg) {
              console.log('Got socket message', msg.model);
              switch (msg.model) {
                case 'user':
                  Hull.emit('online.users.change', msg);
                  return;
                case 'party':
                  Hull.emit('party.change', msg);
                  return;
                default:
                  console.log('We got some new, unknown server message. Check it.', msg);
              }
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


      $('body').on('join.party', function(event, data) {
        var partyId = data;
        $.ajax({
          type: 'GET',
          url: '/party/' + partyId,
          success: function(party) {
            party.users = party.users || [];
            var user = app.data.api.model('me').attributes;
            var url = location.host.indexOf('127.0.0') === -1 ? 'http://spotiparty.co:80' : location.protocol + '//' + location.host;
            user.extra.socketId = io.sockets[url].sessionid;
            user.extra.partyId = partyId;
            party.users.push(user);
            var promise1 = Hull.data.api('me','put', user);
            var promise2 = $.ajax({
              type: 'PUT',
              url: '/party/' + partyId,
              data: party
            });

            $.when(promise1, promise2).then(function() {
              window.location.replace('/search');
            });
          }
        });
      });


    });

  })();

}
