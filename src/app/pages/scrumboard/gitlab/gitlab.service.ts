import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppUtils} from "../../../utils/AppUtils";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class GitlabService {


    constructor(
        private _httpClient: HttpClient
    ) {

    }

    findAllProjects(idProject): Observable<any> {
        return this._httpClient.get(AppUtils.BACKEND_API_PATH + '/gitlab/projects/' + idProject);
    }

    findAllCommitsPerProjectAndBranchPerUnit(idProject, dateStart, dateEnd): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        let filter: RequestFilter = this.critereFilterFactory(idProject, dateStart, dateEnd);
        return this._httpClient.post(AppUtils.BACKEND_API_PATH + '/gitlab/commits/unit', filter, options);
    }

    findAllCommitsPerProjectAndBranch(idProject, dateStart, dateEnd): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        let filter: RequestFilter = this.critereFilterFactory(idProject, dateStart, dateEnd);
        return this._httpClient.post(AppUtils.BACKEND_API_PATH + '/gitlab/commits', filter, options);
    }


    findAllBranchsPerProject(idProject): Observable<any> {
        return this._httpClient.get(AppUtils.BACKEND_API_PATH + '/gitlab/branchs/' + idProject);
    }

    findAllBranchsPerProjectId(idProject): Observable<any> {
        return this._httpClient.get(AppUtils.BACKEND_API_PATH + '/gitlab/branchs/path/' + idProject);
    }

    private critereFilterFactory(idProject: any, dateFrom: any, dateTo: any) {
        const requestFilter: RequestFilter = {
            idProject: idProject,
            dateFrom: dateFrom,
            dateTo: dateTo
        };
        return requestFilter;
    }
}

interface RequestFilter {
    idProject?: string;
    idBranch?: string;
    dateFrom?: string;
    dateTo?: string;
}

