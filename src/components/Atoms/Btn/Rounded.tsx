import React from 'react';
interface Props {
  txt: string;
  isDelete?: string;
  className?: any;
  Func?: any;
  isType?: 'button';
}

const Rounded: React.FC<Props> = props => {
  return (
    <button
      className={` btn--rounded ${props.isDelete && 'delete'} ${
        props.className
      }`}
      type={props.isType ? props.isType : 'submit'}
      onClick={() => {
        if (props.Func) {
          props.Func();
        }
      }}
    >
      {props.txt}
    </button>
  );
};

export default Rounded;
