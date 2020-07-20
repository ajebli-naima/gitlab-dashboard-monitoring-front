import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppUtils} from '../../utils/AppUtils';

@Injectable()
export class ScrumboardService {

    constructor(
        private _httpClient: HttpClient
    ) {

    }

    getAllApplication(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const options = {headers: headers};
        return this._httpClient.get(AppUtils.BACKEND_API_PATH + '/application/findAll', options);
    }

    getApplication(idApplication): Observable<any> {
        return this._httpClient.get(AppUtils.BACKEND_API_PATH + '/application/' + idApplication);
    }

    uploadPictureApplication(application, file): Observable<any> {
        const formData = new FormData();
        formData.append('application', JSON.stringify(application));
        formData.append('file', file)
        return this._httpClient.post(AppUtils.BACKEND_API_PATH + '/application', formData);
    }


}

