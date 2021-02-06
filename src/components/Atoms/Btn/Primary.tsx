import React from 'react';

interface Props {
  txt: string;
  type: 'button' | 'submit';
  setShowModal?: any;
  Func?: any;
  disabledRule?: any;
  isSolid?: boolean;
}
const Primary: React.FC<Props> = props => {
  return (
    <button
      type={props.type}
      className={`btn btn--primary ${props.isSolid && 'solid'}`}
      onClick={() => {
        if (props.setShowModal) {
          props.setShowModal(true);
        }
        if (props.Func) {
          props.Func();
        }
      }}
      disabled={props.disabledRule}
    >
      {props.txt}
    </button>
  );
};

export default Primary;
