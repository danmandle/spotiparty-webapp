function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

Hull.component({
  datasources: {songs: function() {return this.getSongs();}}, //List data sources you want to use here
  templates: ['results'], //Declare the template names you use here
  refreshEvents: ['search.refresh'],
  initialize: function () {
    this.partyId = getUrlVars()['id'] || this.api.model('me').attributes.extra.partyId;

    this.getParty(this.partyId);
    this._filter = Hull.util._.filter;

    this.sandbox.on('search.find', Hull.util._.bind(this.setTerm, this));
  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('About to render search results with data', data);
    if(!data.songs) return false;

    if(this.party && this.party.partyName) $('#at-party').text('People at ' + this.party.partyName);

    data.party = {};
    data.party.id = this.partyId;

    data.songs.tracks = this._filter(data.songs.tracks,
      function(track) {
        var isAvalable = track.album.availability.territories.toLowerCase().indexOf('us') !== -1 ? true : false;
        return isAvalable;
      });

    return data;

  }, //Called after datasources are resolved
  afterRender: function () {
    var self = this;
    $('[data-action-addSong]').on('click', function() {
      var elem = $(this);
      var position = elem.offset().top + 'px';
      data = elem.data();
      self.addToParty(data.actionAddsong, data.songid, data.songname, data.artist, data.albumName);
      elem.css({position: 'absolute', top: position }).animate({top: '-100px'}, 550);
      console.log('Adding song', data.songid, 'to', 'party ' + data.actionAddsong);
    });
  }, //Called after template has been rendered - put jQuery plugin calls here
  /* append your own components methods */
  getSongs: function() {
    console.log('Get Zee songs', arguments);
    if(!this.searchTerm) return false;

    var img = $('<img class="loading" src="/gumby/img/loading.gif">').appendTo(this.$el);

    var dfd = Hull.data.deferred();

    return $.getJSON('http://ws.spotify.com/search/1/track.json?q=' + this.searchTerm,
      function(trackData) {
	img.remove();
        dfd.resolve(trackData);
      });
  },
  setTerm: function(searchData) {
    this.searchTerm = searchData.term;

    Hull.emit('search.refresh', searchData);
  },
  makeSearch: function() {

  },

  getParty: function() {
    var dfd = $.Deferred();
    var self = this;
    $.ajax({
      url: '/party/' + this.partyId,
      type: 'get',
      success: function(party) {
        self.party = party;
        dfd.resolve();
      }
    });
    return dfd;
  },

  addToParty: function(partyId, songId, songName, artist, album) {
    var self = this;
    this.getParty().done(function() {
      self.party.playlist.push({
        songId: songId,
        user: self.data.me.attributes,
        songName: songName,
        artist: artist,
        albumName: album,
        votes: 0
      });
      $.ajax({
        url: '/party/' + self.partyId,
        type: 'put',
        data: self.party,
        success: function() {
          // alert('The song has been added to the party\'s playlist');
        }
      });
    });
  }

});
