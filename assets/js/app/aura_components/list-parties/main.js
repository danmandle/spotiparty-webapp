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
  initialize: function () {

  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('DATA', data);
    var dfd = $.Deferred();
    navigator.geolocation.getCurrentPosition(function(location){
      var l = [location.coords.latitude, location.coords.longitude];
      data.parties.forEach(function(party) {
        var atParty = isAtParty(l, [party.lat, party.long], party.radius);
        party.atParty = atParty;
        return party;
      });
      dfd.resolve(data);
    }.bind(this), function() {alert('You must give us your location >:)');});

    return dfd;
  }, //Called after datasources are resolved
  afterRender: function () {}
});
