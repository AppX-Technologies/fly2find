import React from "react";
import { Button } from "react-bootstrap";

const FloatingButton = ({
  text,
  variant = "dark",
  disabled = false,
  Icon,
  RightIcon,
  onClick,
  className = "",
  style,
}) => {
  return (
    <Button
      variant={variant}
      style={{ position: "fixed", bottom: 0, right: 0, zIndex: 1, ...style }}
      className={`m-4 ${className}`}
      disabled={disabled}
      size="sm"
      onClick={onClick}
    >
      {Icon && <Icon className="mx-2" />}
      <span className="align-middle mid">{text}</span>
      {RightIcon && <RightIcon className="mx-2" />}
    </Button>
  );
};

export default FloatingButton;
