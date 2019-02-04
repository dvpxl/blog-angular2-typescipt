import {bootstrap}    from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';

import {ROUTER_PROVIDERS, APP_BASE_HREF} from '@angular/router';
 
bootstrap(AppComponent, [

	HTTP_PROVIDERS, 
	ROUTER_PROVIDERS,
	provide(APP_BASE_HREF, {useValue: '/products'})

]);

// .js way
// (function(app) {
//   document.addEventListener('DOMContentLoaded', function() {
//     ng.platform.browser.bootstrap(app.AppComponent);
//   });
// })(window.app || (window.app = {}));