export interface Report {
  reportFileId: string;
  employee: Employee;
  report: Report
}

export interface Employee {
  identityId: string;
  firstname: string;
  lastname: string
}
export interface Report {
  streetId: string;
  startHomeNumber: string;
  endHomeNumber: string
  date: string
  startTime: string
  endTime: string
}