import { Ref, FocusEvent, KeyboardEvent, ChangeEvent, forwardRef } from 'react';

import './inputField.css';

interface InputFieldProps {
  type: 'text' | 'email' | 'number' | 'password';
  label?: string;
  value: string | number;
  placeholder?: string;
  error?: string;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef(
  (
    {
      type,
      label,
      value,
      placeholder,
      onChange,
      isDisabled = false,
      handleFocus,
      error,
      onKeyDown,
    }: InputFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className='input-field-wrapper'>
        {label && (
          <label className='input-label' htmlFor={label}>
            {label}
          </label>
        )}
        <input
          className='input-field'
          id={label}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={isDisabled}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          ref={ref}
        />
        {error && <p> {error} </p>}
      </div>
    );
  }
);

export default InputField;
