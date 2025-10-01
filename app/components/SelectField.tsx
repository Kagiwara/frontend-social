import React from 'react';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error: string | undefined;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  required = true,
}) => {
  return (
    <div className="form-group">
      <label className={required ? '' : 'optional'}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="select"
        aria-invalid={!!error}
      >
        <option value="">Выберите город</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SelectField;