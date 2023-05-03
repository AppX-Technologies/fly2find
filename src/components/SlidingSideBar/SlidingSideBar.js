import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft, X } from 'react-bootstrap-icons';

const SlidingSideBar = ({ children, visible = false, title = '', showCloseButton = true, onClose, fullScreen }) => {
  const Header = () => {
    return (
      <>
        <div className="d-flex">
          <h5 className="flex-grow-1 font-weight-bold xxxlarge">{title}</h5>
          {showCloseButton && (
            <Button className="close_button" onClick={onClose} variant="danger">
              Close <X size={20} className="align-text-top" />
            </Button>
          )}
        </div>
        <hr className="my-2" />
      </>
    );
  };

  return (
    <div className={`bar-container ${visible ? 'bar-visible' : 'bar-collapsed'}`}>
      <div className={`bar-content${fullScreen ? '-fullscreen' : ''}`}>
        {(title || showCloseButton) && <Header />}
        <div id="bar-body">{children}</div>
      </div>
    </div>
  );
};

export default SlidingSideBar;
