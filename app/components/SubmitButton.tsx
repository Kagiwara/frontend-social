import React from 'react';

interface SubmitButtonProps {
 onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="submit-btn"
    >
      {children}
    </button>
  );
};

export default SubmitButton;