this["Hull"] = this["Hull"] || {};
this["Hull"]["templates"] = this["Hull"]["templates"] || {};

this["Hull"]["templates"]["active-users/template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }

  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.me)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\n";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.onlineUsers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  });

this["Hull"]["templates"]["find-a-song/search-bar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"row\">\n  <div class=\"field append\">\n    <input id=\"search-input\" class=\"input wide\" type=\"text\">\n    <span class=\"adjoined\">\n      <a data-action=\"search\" href=\"#\">\n        <i class=\"icon-search\"></i>\n      </a>\n    </span>\n  </div>\n</section>\n";
  });

this["Hull"]["templates"]["list-parties/template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div>";
  if (stack1 = helpers.partyName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.partyName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.parties), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Hull"]["templates"]["list-songs-in-party/list-songs-in-party"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td data-songId=\"";
  if (stack1 = helpers.songId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.songId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.artist) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.artist); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.songName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.songName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.picture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      </tr>\n";
  return buffer;
  }

  buffer += "<table>\n  <thead>\n    <tr>\n      <th>Artist</th>\n      <th>Song Name</th>\n      <th>pictureUrl</th>\n      <th>UserName</th>\n    </tr>\n  </thead>\n  <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.songs), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tbody>\n</table>";
  return buffer;
  });

this["Hull"]["templates"]["list-songs/results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <tr data-action-addSong=\""
    + escapeExpression(((stack1 = ((stack1 = (depth1 && depth1.party)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-songId=\"";
  if (stack2 = helpers.href) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.href); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-songName=\"";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.name); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-artist=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.artists)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.artists)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.name); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.album)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      </tr>\n    ";
  return buffer;
  }

  buffer += "<table>\n  <thead>\n    <tr>\n      <th>Artist</th>\n      <th>Title</th>\n      <th>Album</th>\n    </tr>\n  </thead>\n  <tbody>\n    ";
  stack2 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.songs)),stack1 == null || stack1 === false ? stack1 : stack1.tracks), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n</table>\n";
  return buffer;
  });

this["Hull"]["templates"]["parties-map/template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });