Hull.component({
  datasources: {}, //List data sources you want to use here
  templates: ['search-bar'], //Declare the template names you use here
  initialize: function () {

  }, //Called at component initialization
  beforeRender: function (data, errors) {}, //Called after datasources are resolved
  afterRender: function () {
    var self = this;
    this.$el.find('#search-input').on('keyup', function(e) {
      var code = e.keyCode || e.which;
       if(code == 13) { //Enter keycode
          self.triggerSearchCall(self.$el.find('#search-input'));
       }
    });
    this.$el.find('[data-action="search"]').on('click', function(evt) {
      evt.preventDefault();

      self.triggerSearchCall(self.$el.find('#search-input'));
    });
  }, //Called after template has been rendered - put jQuery plugin calls here
  /* append your own components methods */
  triggerSearchCall: function($input) {
    var searchData = {
      input : $input,
      term : $input.val()
    };
    this.sandbox.emit('search.find', searchData);
  }
});
