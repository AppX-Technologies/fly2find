import React from 'react';
import { Spinner } from 'react-bootstrap';

const CircularProgressBar = ({ variant = 'dark', size = 20, className = '' }) => {
  return <Spinner variant={variant} className={className} style={{ height: size, width: size }} />;
};

export default CircularProgressBar;
