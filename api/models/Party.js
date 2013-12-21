/**
 * Party
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	/* e.g.
  	nickname: 'string'
  	*/

  },

  beforeCreate: function(values, cb) {
    values.playlist = values.playlist || [];

    cb();
  }

};
