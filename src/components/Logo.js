import React from 'react';

const Logo = ({ light }) => {
  return (
    <h3 className={`logo mb-0 ${light ? 'text-light' : ''}`}>
      F<span className="underline">ly2Find</span>
    </h3>
  );
};

export default Logo;
