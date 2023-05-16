import React from 'react';
import { Button } from 'react-bootstrap';

const FloatingButton = ({
  text,
  variant = 'dark',
  disabled = false,
  icon,
  onClick,
  size = 'sm',
  backgroundClass = ''
}) => {
  return (
    <Button
      size={size}
      variant={variant}
      style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 2 }}
      className={`m-4 ${backgroundClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && icon}
      {text}
    </Button>
  );
};

export default FloatingButton;
