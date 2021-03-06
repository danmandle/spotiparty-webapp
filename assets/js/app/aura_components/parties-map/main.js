Number.prototype.toRad = function() {
   return this * Math.PI / 180;
};
var isAtParty = function(point1, point2, rad) {
  point1 = point1.map(function(num) {return parseFloat(num, 10); });
  point2 = point2.map(function(num) {return parseFloat(num, 10); });
  rad = parseFloat(rad, 10);
  var lat2 = point2[0];
  var lon2 = point2[1];
  var lat1 = point1[0];
  var lon1 = point1[1];

  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  lat1 = lat1.toRad();
  lat2 = lat2.toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;

  return d <= rad / 1000;
};

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
    navigator.geolocation.getCurrentPosition(this.setLocation.bind(this), function() {alert('You must give us your location >:)');});
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
    if(this.map) return false;
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

  addParties: function(l) { // l is user location
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


      var atParty = isAtParty(l, [party.lat, party.long], party.radius);
      if (atParty) {
        this.parties[party.user].marker = this.L.marker([party.lat, party.long], {icon: icon}).bindPopup('<span>'+party.partyName+'</span><br><a href="#" onclick="$(\'body\').trigger(\'join.party\', ' +party.id+'); return false;">Join Party!</a>').addTo(this.map).openPopup();
      }else {
        this.parties[party.user].marker = this.L.marker([party.lat, party.long], {icon: icon}).bindPopup(party.partyName).addTo(this.map).openPopup();
      }


      console.log('In Party?', isAtParty(l, [party.lat, party.long], party.radius));
    }.bind(this));

    this.map.setView(l, 14); // l is user location
    return dfd;
  }
});
