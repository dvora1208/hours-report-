import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../@core/models';
import { UserService } from '../@core/services';

import * as moment from 'moment';
import { ReportService } from '../@core/services/report.service';
import { StreetService } from '../@core/services/street.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Report } from '../@core/models/report.model';

//const idRegex = /^(?=.*[0-9])(?=.{9})/
//const onlyLettersRegex = /^[a-z\u0590-\u05fe]+$/i

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class AttendanceComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  formEmployee!: FormGroup;
  formReport!: FormGroup;


  user!: UserLogin;
  isMeridian = false;
  submitted = false;
  loading = false;
  isShowAlert = false;
  dismissible = true;
  alertType = '';

  hedaer = '';
  resMeesage = '';

  reportFileId: any;
  street: any[] = [];
  reportHistory: Report[] = [];
  message?: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private reportService: ReportService,
    private streetService: StreetService
  ) { }

  get fEmployee() { return this.formEmployee.controls; }
  get fReport() { return this.formReport.controls; }

  ngOnInit(): void {
    this.user = this.userService.getUser();

    // this.form = this.formBuilder.group({
    //   date: [new Date(), Validators.required],
    //   startTime: [new Date(), Validators.required],
    //   endTime: ['', Validators.required]
    // });

    this.formEmployee = this.formBuilder.group({
      identityId: ['', Validators.required],// Validators.pattern(idRegex)],
      firstname: ['', Validators.required, ],//Validators.pattern(onlyLettersRegex)],
      lastname: ['', Validators.required, ],//Validators.pattern(onlyLettersRegex)]
    });


    this.formReport = this.formBuilder.group({
      streetId: ['', Validators.required],
      startHomeNumber: ['', Validators.required],
      endHomeNumber: ['', Validators.required],
      date: [new Date(), Validators.required],
      startTime: [new Date(), Validators.required],
      endTime: ['', Validators.required]
    });

    this.street = this.streetService.getStreet();

    // this.form.valueChanges.subscribe(item => {
    //   this.submitted = false;
    // })
  }

  onSubmit() {

    debugger
    if (this.fReport.endTime.value < this.fReport.startTime.value) {
      this.setInvalidError();
      this.resMeesage = "תאריך סיום אינו יכול להיות קטן מתאריך התחלה";
      return;
    }

    let value = {
      reportFileId: this.reportFileId,
      employee: this.formEmployee.value,
      report: this.formReport.value
    }

    this.reportService.sendTime(value)
      .subscribe(item => {
        this.hedaer = 'עדכון הצליח';
        this.resMeesage = 'פעולה בוצעה בהצלחה'
        this.isShowAlert = true;
        this.alertType = "success"

        // Clear all form
        this.reportFileId = undefined;
        this.formEmployee.reset();
        this.formReport.reset();

        setTimeout(() => {
          this.selectTab(0)
        }, 1000);
      })
  }

  setInvalidError() {
    this.alertType = "warning"
    this.hedaer = 'שגיאה';
    this.isShowAlert = true;
    this.submitted = false;
  }

  resetDate() {
    this.formReport.patchValue({
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    });
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  onSelectHistoryTab() {
    this.reportService.getHistory()
      .subscribe(item => {
          this.reportHistory = item;
      }, error => {
        this.message = `שגיאה-לא ניתן לטעון הסטורייה `
      })
  }
}
