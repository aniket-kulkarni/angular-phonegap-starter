!function(){"use strict";var e=angular.module("agora",["ui.router","ngMaterial","ngMessages","agora.core","agora.test"]);e.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("home",{url:"/home",templateUrl:"app/test/home.html",controller:"HomeController",controllerAs:"home"}).state("view2",{url:"/view2",templateUrl:"app/test/view2.html",controller:"View2Controller",controllerAs:"view2"}),t.otherwise("/home")}])}(),function(){"use strict";angular.module("agora.core",[]),angular.module("agora.test",[])}(),function(){"use strict";function e(){var e=this;e.name="app"}var t=angular.module("agora.core");t.controller("AppController",e)}(),function(){"use strict";function e(){var e=this;e.name="home"}var t=angular.module("agora.test");t.controller("HomeController",e)}(),function(){"use strict";function e(){var e=this;e.name="view2"}var t=angular.module("agora.test");t.controller("View2Controller",e)}(),angular.module("agora.core").run(["$templateCache",function(e){e.put("app/test/home.html","<div>\n   This is {{home.name}} view\n</div>"),e.put("app/test/view2.html",'<div>\n   This is {{view2.name}} view\n</div>\n\n<md-input-container>\n    <label>Title</label>\n    <input ng-model="view2.title">\n</md-input-container>')}]);