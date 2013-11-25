Hull.component({
  datasources: {songs: function() {return this.getSongs();}}, //List data sources you want to use here
  templates: ['results'], //Declare the template names you use here
  refreshEvents: ['search.refresh'],
  initialize: function () {

    this._filter = Hull.util._.filter;

    this.sandbox.on('search.find', Hull.util._.bind(this.setTerm, this));
  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('About to render search results with data', data);
    if(!data.songs) return false;

    data.songs.tracks = this._filter(data.songs.tracks,
      function(track) {
        var isAvalable = track.album.availability.territories.toLowerCase().indexOf('us') !== -1 ? true : false;
        return isAvalable;
      });

    return data;

  }, //Called after datasources are resolved
  afterRender: function () {
  }, //Called after template has been rendered - put jQuery plugin calls here
  /* append your own components methods */
  getSongs: function() {
    console.log('Get Zee songs', arguments);
    if(!this.searchTerm) return false;

    var dfd = Hull.data.deferred();

    return $.getJSON('http://ws.spotify.com/search/1/track.json?q=' + this.searchTerm,
      function(trackData) {
        dfd.resolve(trackData);
      });
  },
  setTerm: function(searchData) {
    this.searchTerm = searchData.term;

    Hull.emit('search.refresh', searchData);
  },
  makeSearch: function() {

  }

});
