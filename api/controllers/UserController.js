/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var sockets = [];

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},

  online: function(req, res) {
    User.find().done(function(err, users) {
      if (err) res.send(err, 500);

      res.json(users);
    });
  },

  atParty: function(req, res) {
    partyId = parseInt(req.param('partyId'), 10);
    console.log('Getting user at party', partyId);
    User.find().done(function(err, users) {
      if (err) res.send(err, 500);

      console.log('Looking for party in users before filter', users);
      users = users.filter(function(user) {
        console.log(user.extra.partyId === partyId, user.extra.partyId, partyId)
        return user.extra.partyId === partyId;
      });
      console.log('Looking for party in users after filter', users);

      res.json(users);
    });
  },

/*Subscribes all users to the requesting socket.*/
  subscribe: function(req, res) {
    User.subscribe(req.socket);
    var newUser = req.body;
    newUser.socketId = req.socket.id;
    newUser.__timestamp = new Date().getTime();
    User.create(newUser).done(function(err, user) {
      if(err) {
        User.update({id: newUser.id}, newUser, function(err, users) {
          if(err) {
            console.log('There was an error updating the user', newUser);
          }else {
            console.log('Updated users,', users);
          }

          User.publishUpdate(newUser.id, newUser);

        });
      }

      User.find(function(err, users){
        console.log('Subscribing socket to all users', users);
        User.subscribe(req.socket, users);
        res.json(users);
      });

      if(user) { // this is throwing an error. Need to pub create better
        User.publishCreate({
          id: user.id
        });
      }
    });

    // req.socket.on('connection', function() {
    //   console.log('User Connected', arguments);
    // });

    req.socket.on('disconnect', function(arg1, arg2) {
      console.log('User Disconnected', arg1, req.socket.id);

      User.destroy({
        socketId : req.socket.id
      }).done(function(err) {
        if(err) {
          console.log('Error deleting user');
        }else {
          console.log('Deleted User with id', req.socket.id);

          User.publishDestroy(newUser.id);
        }
      });
    });

  }
};
