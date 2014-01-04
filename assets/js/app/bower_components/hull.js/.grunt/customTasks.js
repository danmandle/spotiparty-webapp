var git = require('git-rev');

module.exports = function (grunt) {
  var SEMVER_REGEXP = /^((\d+)\.(\d+)\.(\d+))(?:-([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?(?:\+([\dA-Za-z\-]+(?:\.[\dA-Za-z\-]+)*))?$/;

  grunt.registerMultiTask('dist', 'Builds the various flavours of hull.js', function () {
    grunt.task.run(this.data);
  });

  grunt.registerTask("version", "generate a file from a template", function () {
    var conf = grunt.config("version");
    var done = this.async();
    function write (name) {
      grunt.config.set("PKG_VERSION", name);
      grunt.file.write(conf.dest, grunt.template.process(conf.template));

      var t = (SEMVER_REGEXP.test(name)) ? 31536000 : 0;
      grunt.config.set('cache', t);
      grunt.config.set('expires', new Date(Date.now() + t * 1000).toUTCString());

      grunt.log.writeln('Generated version description for \'' + conf.dest + '\' successfully.');

      done();
    }

    git.branch(function(branch) {
      if (['HEAD', 'master'].indexOf(branch) !== -1) {
        git.tag(write);
      } else {
        write(branch);
      }
    });
  });
};
