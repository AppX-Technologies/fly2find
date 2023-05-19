import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const HorizontalProgress = ({ text, style = {} }) => {
  return <ProgressBar className="mt-1" striped animated variant="dark" now={100} label={text} style={style} />;
};

export default HorizontalProgress;
