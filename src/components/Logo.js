import React from 'react';

const Logo = ({ light }) => {
  return (
    <h3 className={`logo mb-0 ${light ? 'text-light' : ''}`}>
      R<span className="underline">atherFly</span>
    </h3>
  );
};

export default Logo;
