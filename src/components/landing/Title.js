import React from 'react';

const Title = ({ title, isCentered = true }) => {
  return (
    <div className={`text-${isCentered && 'center'} my-3`}>
      <h3 className="mb-0">
        <b>{title}</b>
      </h3>
      <div style={{ height: 6, width: 20 }} className="bg-gradient mx-auto rounded"></div>
    </div>
  );
};

export default Title;
