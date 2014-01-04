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

  beforeCreate: function(values, next) {
    var oldVals = values;
    Party.destroy({
      user: values.user
    }).done(function(err) {
      values = oldVals;
      values.playlist = values.playlist || [];
      console.log('Before create party validations', values);
      next();
    });
  }

};
