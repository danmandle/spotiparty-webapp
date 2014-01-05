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
  templates: ['list-songs-in-party'], //Declare the template names you use here
  refreshEvents: ['party.change'],
  initialize: function () {
    this.partyId = getUrlVars()['id'] || this.api.model('me').attributes.extra.partyId;

    this._filter = Hull.util._.filter;

    // this.sandbox.on('search.find', Hull.util._.bind(this.setTerm, this));
  }, //Called at component initialization
  beforeRender: function (data, errors) {
    console.log('About to render search results with data', data);
    if(!data.songs) return false;
    return data;

  }, //Called after datasources are resolved
  afterRender: function () {
    var self = this;
    $('a.up').on('click', function() {
      var elem = $(this);
      var data = elem.data();
      self.makeVote(data.songId, self.party.user, 1);
    });
    $('a.down').on('click', function() {
      var elem = $(this);
      var data = elem.data();
      self.makeVote(data.songId, self.party.user, -1);
    });
  }, //Called after template has been rendered - put jQuery plugin calls here
  /* append your own components methods */
  makeVote: function(songId, user, vote) {
    var self =this;
    $.ajax({
      url: '/party/vote',
      type: 'POST',
      data: {
        songId: songId,
        user: user,
        vote: vote
      },
      success: function() {
        self.refresh();
        $('a.up, a.down').remove();
      }
    });
  },
  getSongs: function() {
    console.log('Get Zee songs', arguments);
    var self = this;

    var dfd = Hull.data.deferred();

    $.getJSON('/party/' + this.partyId,
      function(party) {
        dfd.resolve(party.playlist);
        self.party = party;
      });

    return dfd;
  }
});
