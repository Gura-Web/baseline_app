import { ChangeEventHandler } from 'react';

export interface CheckBoxProps {
  type: 'checkbox' | 'radio';
  txt: string;
  checkboxFunc?: any;
  checkedPref?: string[];
  id?: string | undefined;
  keyName?: string;
  className?: string;
  category?: string;
  isChecked?: boolean;
  onChange?: ChangeEventHandler;
  value?: string;
}
