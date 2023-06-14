import React from 'react';
import useCachedImages from '../hooks/useCachedImage';
import { Image } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

const CachedImage = ({
  fileId,
  className,
  renderImageOnClick = true,
  rectangleClassName = 'rectangular-skeleton-small',
  deletable = false,
  deleteIconSize = 17,
  onDelete
}) => {
  const image = useCachedImages(fileId);

  return (
    <div>
      {image ? (
        <div className="d-flex justify-content-center">
          <Image 
            src={image}
            className={`${className} pointer`}
            onClick={() => renderImageOnClick && window.open(image, '_blank')}
          />
          {deletable && (
            <TrashFill
              className="text-primary pointer"
              size={deleteIconSize}
              title="Delete This Image"
              onClick={onDelete}
            />
          )}
        </div>
      ) : (
        <div className={rectangleClassName} />
      )}
    </div>
  );
};

export default CachedImage;
