import React from 'react';
import './progress.scss';

const CircularProgressBar = ({ size = 1.5 }) => {
  return <progress style={{ width: `${size}em`, height: `${size}em` }} className="pure-material-progress-circular" />;
};

export default CircularProgressBar;
