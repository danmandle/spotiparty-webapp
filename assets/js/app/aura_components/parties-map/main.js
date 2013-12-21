Hull.component({
  refreshEvents: ['party.change'],
  datasources: {'parties': function() {
    return $.getJSON('/party');
  }}, //List data sources you want to use here
  templates: ['template'], //Declare the template names you use here
  require: ['http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js?2'],
  initialize: function () {
    this.L = this.require('http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js?2');
    console.log('Leaflet is here', this.L);
    navigator.geolocation.getCurrentPosition(this.showMap.bind(this));
  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('DATA', data);
  }, //Called after datasources are resolved
  afterRender: function () {},

  showMap: function(locationData) {
    console.log('Location Data', locationData);
    var l = [locationData.coords.latitude, locationData.coords.longitude];
    this.$el.height(window.innerHeight / 3);
    this.map = this.L.map(this.el).setView(l, 13);
  }
});
