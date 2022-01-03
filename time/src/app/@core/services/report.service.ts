import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '.';
import { Report } from '../models/report.model';

@Injectable({
    providedIn: 'root',
})
export class ReportService {

    private attendanceAPI = 'report';
    constructor(
        private http: ApiService,
    ) { }

    sendTime(time: any) {
        const copyVal: any = Object.assign({}, time);

        copyVal.report.startTime = this.getDateAsPastternFromDate(copyVal.report.startTime);
        copyVal.report.endTime = this.getDateAsPastternFromDate(copyVal.report.endTime);
        return this.http.post(this.attendanceAPI, copyVal);
    }

    getHistory(): Observable<Report[]> {
        return this.http.get(`${this.attendanceAPI}`)
    }

    private getDateAsPastternFromDate(date: Date = new Date()): string {
        var dateStr =
            date.getFullYear() + "-" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2)
            + "T" +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        return dateStr;
    }
}

