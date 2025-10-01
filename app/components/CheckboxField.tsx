import React from 'react';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  required = true,
}) => {
  return (
    <div className="form-group">
      <label className={required ? '' : 'optional'}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="checkbox"
        />
        <span>{label}</span>
      </div>
    </div>
  );
};

export default CheckboxField;