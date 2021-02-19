import React from 'react';

interface Props {
  ttl: string;
  name: string;
  selectObj: any;
  defaultValue?: any;
}

const SelectSecondary: React.FC<Props> = props => {
  const renderSelectItem = () => {
    return Object.values(props.selectObj).map((data: any, index) => {
      return (
        <option
          value={data.id}
          selected={props.defaultValue == data.id && true}
        >
          {data.name}
        </option>
      );
    });
  };

  return (
    <div className="input-dropdown">
      {props.ttl != '' && (
        <p className="input-dropdown__heading">{props.ttl}</p>
      )}
      <div className="input-dropdown__wrap">
        <select name={props.name}>{renderSelectItem()}</select>
      </div>
    </div>
  );
};

export default SelectSecondary;
