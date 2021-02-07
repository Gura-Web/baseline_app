import React, { useEffect } from 'react';
import { CheckIcon } from '../../../assets/images/index';
import { CheckBoxProps } from './CheckboxProps';

const Checkbox: React.FC<CheckBoxProps> = ({
  category,
  checkboxFunc,
  checkedPref,
  id,
  isChecked,
  keyName,
  onChange,
  type,
  value,
}) => {
  let typeClass;
  if (type === 'checkbox') {
    typeClass = 'input-checkbox input-checkbox--normal';
  }
  useEffect(() => {}, []);
  const checkHandler = (e: any) => {
    e.stopPropagation();
    // 卒業生の在籍
    if (category == 'enrollment_of_graduates' && checkboxFunc) {
      checkboxFunc(e.currentTarget.checked);
    }
    // 希望職種
    if (category == 'jobs' && checkboxFunc) {
      if (e.currentTarget.checked) {
        checkboxFunc(e.currentTarget.name, true);
      } else {
        checkboxFunc(e.currentTarget.name, false);
      }
    }

    // 都道府県
    if (category == 'prefectures' && checkboxFunc) {
      console.log('B');
      if (e.currentTarget.checked) {
        checkboxFunc(e.currentTarget.name, true);
      } else {
        checkboxFunc(e.currentTarget.name, false);
      }
    }
    // 地域選択(企業登録)
    if (category == 'prefSelect' && checkboxFunc) {
      if (e.currentTarget.checked) {
        checkboxFunc();
      }
    }
  };
  const isCheckedPref = () => {
    return checkedPref?.some((pref: any) => {
      if (id == pref.id) {
        return true;
      }

      return false;
    });
  };
  const onDefaultCheckedFunc = () => {
    if (checkedPref) {
      return isCheckedPref();
    }
    if (isChecked) {
      return true;
    }
  };

  return (
    <>
      <input
        onChange={checkHandler}
        id={`input-${id}`}
        data-key={id}
        className="check-radio-input"
        type={type}
        value={value}
        name={keyName}
        defaultChecked={onDefaultCheckedFunc()}
      />
      <label htmlFor={`input-${id}`} className={`${typeClass}`}>
        <img src={CheckIcon} alt="" />
      </label>
    </>
  );
};

export default Checkbox;
