import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const URL_API = environment.api_url;

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

	getAlljakes(){
		const url = `${URL_API}random/1000`
		const result = this.http.get(url).pipe(
				tap(res => { }),
				catchError(e => {
					throw e;
				})
			);
			return result;
	}

	getOnejake(id: string){
		const url = `${URL_API}${id}`
		const result = this.http.get(url).pipe(
				tap(res => { }),
				catchError(e => {
					throw e;
				})
			);
			return result;
	}

}
