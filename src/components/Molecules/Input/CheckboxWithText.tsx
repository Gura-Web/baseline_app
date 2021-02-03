import React from 'react';
import { Checkbox } from '../../Atoms/Input/index';
import { CheckBoxProps } from '../../Atoms/Input/CheckboxProps';

const CheckboxWithText: React.FC<CheckBoxProps> = props => {
  const { keyName, txt } = props;

  return (
    <label key={keyName} className="input-component">
      {/* propsを親から持ってきてる */}
      <Checkbox {...props} />
      <span>{txt}</span>
    </label>
  );
};

export default CheckboxWithText;
