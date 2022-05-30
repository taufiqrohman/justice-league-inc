import { MouseEventHandler } from 'react';
import './Button.css';

export interface PropTypes {
  variant: string;
  onClick?: () => void;
  label: string;
}

function Button({ variant, onClick, label }: PropTypes) {
  return (
    <span
      className={`btn btn-${variant || "default"}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
}

export default Button;
