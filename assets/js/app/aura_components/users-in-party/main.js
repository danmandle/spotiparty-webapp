Hull.component({
  datasources: {users: function() {return this.getUsers();}}, //List data sources you want to use here
  templates: ['users-in-party'], //Declare the template names you use here
  refreshEvents: ['online.users.change'],
  initialize: function () {
    this.partyId = this.api.model('me').attributes.extra.partyId || location.replace('/parties');
  }, //Called at component initialization
  beforeRender: function (data, errors) {}, //Called after datasources are resolved
  afterRender: function () {
    // alert('refresh')
  }, //Called after template has been rendered - put jQuery plugin calls here
  getUsers: function() {
    return $.ajax({
      url: '/user/atParty',
      type: 'GET',
      data: {
        partyId: this.partyId
      }
    });
  }
});
