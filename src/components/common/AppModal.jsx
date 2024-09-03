import { Modal } from "react-bootstrap";

const AppModal = ({
  show,
  showCloseButton = true,
  title,
  onHide,
  children,
  size,
  fullscreen = undefined,
  hideHeader = false,
  modalBodyClassName = "px-2",
  modalFooterClassName = "p-0",
  footerContent,
}) => (
  <Modal
size={size    }
    fullscreen={fullscreen}
    show={show}
    onHide={onHide}
    centered
    backdrop="static"
  >
    {!hideHeader && (
      <Modal.Header className="" closeButton={showCloseButton}>
        <Modal.Title>
          <h6 className="mb-0">{title}</h6>
        </Modal.Title>
      </Modal.Header>
    )}
    <Modal.Body className={`overflow-auto ${modalBodyClassName}`}>
      {children}
    </Modal.Body>
    {footerContent && (
      <Modal.Footer className={` ${modalFooterClassName}`}>
        {footerContent()}
      </Modal.Footer>
    )}
  </Modal>
);

export default AppModal;
