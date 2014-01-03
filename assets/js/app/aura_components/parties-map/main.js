Hull.component({
  refreshEvents: ['party.change'],
  datasources: {'parties': function() {
    return $.getJSON('/party');
  }}, //List data sources you want to use here
  templates: ['template'], //Declare the template names you use here
  require: ['http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js?2'],
  initialize: function () {
    this.circles = {};
    this.L = this.require('http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js?2');
    console.log('Leaflet is here', this.L);
    navigator.geolocation.getCurrentPosition(this.setLocation.bind(this), function() {alert('You must give us your location >:)')});
  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('DATA', data);
    data.location = this.data.location;
    return data;
  }, //Called after datasources are resolved
  afterRender: function () {
    this.showMap();
  },

  setLocation: function(locationData) {
    this.data.location = locationData;
    this.showMap();
  },

  showMap: function() {
    if(!this.data.location) return false;
    console.log('Location Data', this.data.location);
    var l = [this.data.location.coords.latitude, this.data.location.coords.longitude];
    this.$el.height(window.innerHeight / 2);
    this.map = this.L.map(this.el).setView(l, 14);

    this.L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(this.map);

    this.L.marker(l).bindPopup('You').addTo(this.map).openPopup();

    this.addParties(l);
  },

  addParties: function(l) {
    var dfd = $.Deferred();
    this.parties = {};
    var icon = this.L.icon({
      iconUrl: '/images/map-icon.png',
      iconRetinaUrl: '/images/map-iconx2.png',
      iconSize: [20, 60],
      iconAnchor: [10, 60],
      popupAnchor: [-3, -76],
    });
    this.data.parties.forEach(function(party) {

      console.log('Adding party to map', party);
      this.parties[party.user] = {};

      this.parties[party.user].circle = this.L.circle([party.lat, party.long], party.radius, {
        color: '#61cd89',
        fillColor: '#' + (function co(lor){   return (lor +=
            [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })(''),
        fillOpacity: 0.5
      }).addTo(this.map);

      this.parties[party.user].marker = this.L.marker([party.lat, party.long], {icon: icon}).bindPopup(party.partyName).addTo(this.map).openPopup();

    }.bind(this));

    this.map.setView(l, 14);
    return dfd;
  }
});
