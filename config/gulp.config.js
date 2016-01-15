module.exports = (function() {

  var client = './client/';
  var index  = client + 'index.html';
  var dist = './dist';
  var libDir = client + 'lib/**/*.*';
  var assetsDir = client + 'assets/**/*.*';
  var appDir = client + 'app/**/*.*';
  var stylesDir = client + 'styles/**/*.*';

  var config = {

    /** Src Files */

    srcJs : client + 'app/**/*.js',
    styles : client + 'styles/**/*.css',
    htmlTemplates : client + 'app/**/*.html',    
    devSrc : [ index,appDir,stylesDir,libDir,assetsDir],
    appFiles : [client + 'index.html', client + 'styles/**/*.css',
                client + 'app/**/*.js',client + 'app/**/*.html'],
    images : client + 'assets/images/**/*.*',                
    index : index,    

    /** Client Dir */

    stylesDir : stylesDir,
    libDir : libDir,
    assetsDir : assetsDir,
    appDir : appDir,

    /** dist dir */

    distWeb : './dist/web',
    distApp : './dist/app',
    distAppWww : './dist/app/www',
    distWebImages : dist + '/web/assets/images',
    distAppImages : dist + '/app/www/assets/images',

    /**
     * Build Time Files
     */

    phonegapArtifacts : ['./phonegap_artifacts/hooks/**/*.*',
    './phonegap_artifacts/plugins/**/*.*','./phonegap_artifacts/platforms/**/*.*','./phonegap_artifacts/*.*'],
    temp : client + 'temp/',
    templateCache : {
      file : 'template.js',
      options : {
        module : 'agora.core',
        standAlone : false,
        root : 'app/'
      }
    },

    /** Server Files */
    serverPath : './server/server.js'
    
  };

  return config;


})();
