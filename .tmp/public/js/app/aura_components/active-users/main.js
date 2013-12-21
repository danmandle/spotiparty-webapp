
    console.log('this loaded second');
    Hull.component({
      refreshEvents: ['model.hull.me.change', 'online.users.change'], // calls render on these events
      datasources: { onlineUsers : function() {
        return $.get('/user/online');
      } }, //List data sources you want to use here
        templates: ['template'], //Declare the template names you use here
      initialize: function() {
        console.log('showing active users');
      },
      beforeRender: function (data, errors) {
        console.log('Users View Data', data);
      }, //Called after datasources are resolved
        afterRender: function () {}, //Called after template has been rendered - put jQuery plugin calls here
        /* append your own components methods */
      getUsers: function() {
        console.log('Datasource Args', arguments);
      },
      setUsers: function(users) {
        if (! this.users ) {
          this.users = [];
        }
        var self = this;

        if(users.length){
          _.each(users, function(user) {
            self.users.push(user);
          });
        } else {
          this.users.push(users);
        }
      },


    });
