import React, { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { ArrowUpRightCircle } from 'react-bootstrap-icons';

const FileDetails = ({ files = [] }) => {
  const [expanded, setExpanded] = useState(files.length < 5);

  const File = file => {
    return (
      <Col xs={12} className="mt-1">
        <Alert variant="secondary">
          <div>
            <Alert.Link target="_blank" href={`https://drive.google.com/file/d/${file.file.id}/view`}>
              {file.file.fileName}
              <ArrowUpRightCircle className="ms-2" size={20} />
            </Alert.Link>
          </div>
        </Alert>
      </Col>
    );
  };

  const getFilesToShow = () => {
    if (expanded) return files;

    return files.slice(0, 4);
  };
  return (
    <>
      <h6 className="mt-3 mb-2">Files</h6>
      <Row>
        {getFilesToShow().map((f, i) => (
          <File key={i} file={f} />
        ))}

        {!expanded && (
          <Col xs={12} className="text-right text-muted">
            <i className="hover" onClick={() => setExpanded(true)}>
              <u>...{files.length - getFilesToShow().length} more files</u>
            </i>
          </Col>
        )}
      </Row>
    </>
  );
};

export default FileDetails;
