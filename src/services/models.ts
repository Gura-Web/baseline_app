import { Activity } from '../components/Molecules/Card';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  studentNumber: number;
  yearOfGraduation: number;
  iconImageUrl: string | null;
  sex: number;
  email: string;
  desiredOccupation?: DesiredOccupation;
  desiredOccupations: number;
  companyInformation?: CompanyInformation[];
}

export interface DesiredOccupation {
  id: number;
  name: string;
}

export interface CompanyInformation {
  id: number;
  companyId: number;
  createdAt: string;

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
  id: -1,
  firstName: '＜＞',
  lastName: '＜＞',
  studentNumber: 1,
  yearOfGraduation: 1,
  iconImageUrl: 'a',
  sex: 2,
  email: '1',
  desiredOccupations: 1,
};

export interface Prefecture {
  name: string;
}

export interface Company {
  id: number;
  frigana: string;
  companyName: string;
  businessDescription: string;
  numberOfEmployees: number;
  companyUrl: string;
  createdAt: string;
  updatedAt: string;
  logoImageUrl: string | null;
  prefectures: Prefecture[] | undefined;
}

export interface TopInfo {
  companies: Company[];
  myActivities: Map<number, MyActivity> | null;
  otherActivities: Map<number, MyActivity> | null;
}
