import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
  helpText?: string;
  required?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  helpText,
  required = true,
  placeholder = '',
}) => {
  return (
    <div className="form-group">
      <label className={required ? '' : 'optional'}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input"
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {helpText && <span className="help-text">{helpText}</span>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;