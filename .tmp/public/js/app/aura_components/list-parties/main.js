Hull.component({
  refreshEvents: ['party.change'],
  datasources: {'parties': function() {
    return $.getJSON('/party');
  }}, //List data sources you want to use here
  templates: ['template'], //Declare the template names you use here
  initialize: function () {

  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('DATA', data);
  }, //Called after datasources are resolved
  afterRender: function () {}
});
