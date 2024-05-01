import { FocusEvent, ChangeEvent, FC } from 'react';

import './inputField.css';

interface InputFieldProps {
  type: 'text' | 'email' | 'number' | 'password';
  label?: string;
  value: string | number;
  placeholder?: string;
  error?: boolean;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  isDisabled = false,
  handleFocus,
}) => {
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
      />
    </div>
  );
};

export default InputField;
