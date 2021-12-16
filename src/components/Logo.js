import React from 'react';
import { BRAND_NAME } from '../helpers/constants';

const Logo = ({ light }) => {
  return <h3 className={`logo mb-0 ${light ? 'text-light' : ''}`}>{BRAND_NAME}</h3>;
};

export default Logo;
