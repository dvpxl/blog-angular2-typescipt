import {Injectable} from '@angular/core';


@Injectable()
export class CONFIG {

    private server_mode = "prod";
	private dev_api_url = "//localhost:3000";
	private prod_api_url = "//followiot.com";
	private test_api_url = "https://api-followiot-test.herokuapp.com"
	
	getApiUrl() {
		if(this.server_mode === "prod") {
			return this.prod_api_url;
		}
		if(this.server_mode === "dev") {
			return this.dev_api_url;
		}
		if(this.server_mode === "test") {
			return this.test_api_url;
		}
	}
}

