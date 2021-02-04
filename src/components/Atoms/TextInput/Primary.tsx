import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';

interface Props {
  type: string;
  ttl: string;
  placeholder: string;
  isRequired: boolean;
  isError?: boolean;
  errorMessage?: string;
  unit?: string;
  maxLength?: number;
  name?: string;
  onKeyPress?: KeyboardEventHandler;
  onChange?: ChangeEventHandler;
  defaultValue?: string;
  disabled?: boolean;
  ref?: any;
}

const Primary: React.FC<Props> = props => {
  return (
    <>
      <label className="free-word">
        <h3 className="heading6">
          {props.ttl}
          {props.isRequired && <span className="cAttention">*</span>}
        </h3>
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          required={props.isRequired}
          maxLength={props.maxLength}
          onKeyPress={props.onKeyPress}
          onChange={props.onChange}
          defaultValue={props.defaultValue && props.defaultValue}
          disabled={props.disabled}
          ref={props.ref}
        />
        {props.unit}
        {props.isError && (
          <span className="error-message">{props.errorMessage}</span>
        )}
      </label>
    </>
  );
};

export default Primary;
