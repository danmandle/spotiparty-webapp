/**
 * PartyController
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

module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PartyController)
   */
  _config: {},

  vote: function(req, res) {
    var usr = req.param('user');
    Party.findOne({user: usr})
      .done(function(err, party) {
	if(err) return res.send(500);
	if(!party) return res.send(404);

	var track = req.param('track');
      })
  },

  addToPlaylist: function(req, res) {
    // nececito uno spotify id in post
    var usr = req.param('user');
    if(!usr) {res.send('Must Specify a user', 400); return;}
    Party.findOne({user: usr})
      .done(function(err, user) {
        if(err) return res.send(500);
        if(!user) return res.send(404);

        var track = req.param('track');
        if(track) {
          user.playlist = user.playlist.filter(function(t) {
            return t !== track;
          }, this);

          user.playlist.push(track);
          console.log('User adding playlist', user);
          user.save(function(err) {
            if(err) return res.send(500);

            res.json(user);
          });
        } else {
          res.send('Must specify a track', 400);
        }
      });
  },

  removeFromPlaylist: function(req, res) {
    // spotifyid and song uri
    var usr = req.param('user');
    if(!usr) {res.send('Must Specify a user', 400); return;}
    Party.findOne({user: usr})
      .done(function(err, user) {
        if(err) return res.send(500);
        if(!user) return res.send(404);

        var track = req.param('track');
        console.log('User adding playlist', user.playlist);
        if(track) {
          user.playlist = user.playlist.filter(function(t) {
            return t !== track;
          }, this);
          user.save(function(err) {
            if(err) return res.send(500);

            res.json(user);
          });
        } else {
          res.send('Must specify a track', 400);
        }
      });
  },

  getParty: function(req, res) {
    // find by spotify id
    var usr = req.param('user');
    if(!usr) {res.send('Must Specify a user', 400); return;}
    Party
      .find({user: usr})
      .done(function(err, user) {
        if(err) return res.send(500);
        if (!user) return res.send(404);

        res.json(user);
      });
  }

};
