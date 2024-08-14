import React from 'react';

const Title = ({ title }) => {
  return (
    <div className="text-center my-3">
      <h3 className="mb-0">
        <b>{title}</b>
      </h3>
      <div style={{ height: 6, width: 20 }} className="bg-gradient-dark mx-auto rounded"></div>
    </div>
  );
};

export default Title;
