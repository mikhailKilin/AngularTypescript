module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-ts");
  grunt.initConfig({
    ts: {
      dev : {
        src: ["app/**/*.ts"],
        html: ["app/*.html"],
        reference: "./app/reference.ts",
        out:"app/out.js",
        watch:"app"
      }
    }
  });
 
  grunt.registerTask("default", ["ts:dev"]);
};