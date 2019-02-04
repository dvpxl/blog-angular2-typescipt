System.register(['@angular/platform-browser-dynamic', '@angular/http', 'rxjs/add/operator/map', './app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, app_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS
            ]);
        }
    }
});
// .js way
// (function(app) {
//   document.addEventListener('DOMContentLoaded', function() {
//     ng.platform.browser.bootstrap(app.AppComponent);
//   });
// })(window.app || (window.app = {})); 
//# sourceMappingURL=main.js.map