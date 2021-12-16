import React from 'react';

const ClickableCard = ({ children, selected, onClick }) => {
  return (
    <div
      className={'hover-light mb-2 p-2 rounded ' + (selected ? 'border border-primary' : '')}
      onClick={e => {
        const cellText = document.getSelection();
        if (cellText.toString().length > 0) {
          return;
        }
        onClick();
      }}
    >
      {children}
    </div>
  );
};

export default ClickableCard;
