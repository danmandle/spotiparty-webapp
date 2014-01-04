Hull.component({
  datasources: {}, //List data sources you want to use here
  templates: ['users-in-party'], //Declare the template names you use here
  refreshEvents: ['online.users.change'],
  initialize: function () {

  }, //Called at component initialization
  beforeRender: function (data, errors) {}, //Called after datasources are resolved
  afterRender: function () {
    alert('refresh')
  }, //Called after template has been rendered - put jQuery plugin calls here
});
