export interface User {
  id: number;
  firstName: string;
  lastName: string;
  studentNumber: number;
  yearOfGraduation: number;
  iconImageUrl: string | null;
  sex: number;
  email: string;
  desiredOccupations: number;
  companyInformation?: CompanyInformation[];
}

export interface CompanyInformation {
  id: number;
  companyId: number;

  myActivities?: MyActivity[];
}

export interface MyActivity {
  id: number;
  companyInformationId: number;
  content: string;
  postedYear: number;
}

export const userInit: User = {
  id: 1,
  firstName: '＜＞',
  lastName: '＜＞',
  studentNumber: 1,
  yearOfGraduation: 1,
  iconImageUrl: 'a',
  sex: 1,
  email: '1',
  desiredOccupations: 1,
};
