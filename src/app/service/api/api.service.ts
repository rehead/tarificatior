import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { apiRoutes } from '../../../environments/environment';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  getIpsData(): Observable<any> {
    return this.http.get(apiRoutes.ipData);
  }

  getCoordinates(subpath: string): Observable<any> {
    const url = apiRoutes.coordinatesService.replace(/{ipAddress}/i, subpath);

    return this.http.get(url);
  }
}
