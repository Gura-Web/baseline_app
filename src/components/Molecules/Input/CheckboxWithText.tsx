import React, { ChangeEventHandler } from 'react';
import { Checkbox } from '../../Atoms/Input/index';
import { CheckBoxProps } from '../../Atoms/Input/CheckboxProps';

const CheckboxWithText: React.FC<CheckBoxProps> = props => {
  return (
    <label key={props.keyName} className={`input-component`}>
      <Checkbox
        keyName={props.keyName}
        className={props.keyName}
        category={props.category}
        type={props.type}
        id={props.id}
        checkboxFunc={props.checkboxFunc ? props.checkboxFunc : ''}
        txt={props.txt}
        checkedPref={props.checkedPref}
        isChecked={props.isChecked}
      />
      <span>{props.txt}</span>
    </label>
  );
};

export default CheckboxWithText;
