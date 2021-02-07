export interface User {
  id: number;
  firstName: string;
  lastName: string;
  studentNumber: number;
  yearOfGraduation: number;
  iconImageUrl: string | null;
  sex: number;
  email: string;
  desiredOccupation?: desiredOccupation;
  desiredOccupations: number;
  companyInformation?: CompanyInformation[];
}

export interface desiredOccupation {
  id: number;
  name: string;
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

export interface Draft {
  id: number;
  content: string;
  postedBy: number;
  createdAt: string;
  updatedAt: string;
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
