import React, { useState } from 'react';
import { ProgressBar, Spinner } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { makeApiRequests } from '../../helpers/api';
import { MAX_CHUNK_SIZE } from '../../helpers/constants';

const DriveFileUploader = ({
  text = 'Upload The Image',
  onUploadedFilesChange,
  multiple = true,
  id,
  onNumberOfFilesChange, // Not Compulsory
  allowedFileTypes = [], // Example ['image/gif', 'image/jpeg', 'image/png']
  accept = '' // Only shows this type of file in file selection window
}) => {
  // onNumberOfFilesChange basically updates the number of alreadyUploaded and toBeUploaded files
  // onNumberOfFilesChange can contain 3 parameters(key, value , reset);
  // Keys can be alreadyUploaded and toBeUploaded
  // Example : onNumberOfFilesChange('toBeUploaded', files?.length) or onNumberOfFilesChange('alreadyUploaded',1)

  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileBeingUploaded, setFileBeingUploaded] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const sendChunk = async (
    fileId,
    uploadSessionUrl,
    chunk,
    chunkIndex,
    fileName,
    mimeType,
    fileSize,
    byteStart,
    byteEnd,
    totalChunks
  ) => {
    const fileInfoObject = {
      fileId,
      uploadSessionUrl,
      fileChunk: chunk,
      chunkIndex,
      fileName,
      totalChunks,
      mimeType,
      fileSize,
      byteStart,
      byteEnd
    };

    const { error, response } = await makeApiRequests({
      requestType: 'upload-file',
      requestBody: fileInfoObject
    });

    if (error) {
      return toast.error(error);
    }

    return await response;
  };
  const onFileChange = async e => {
    let files = e.target.files || [];
    if (!files) return;

    if (allowedFileTypes?.length) {
      const allowedFiles = Array.from(files)?.filter(file => allowedFileTypes.includes(file['type']));

      if (files?.length !== allowedFiles?.length) {
        if (multiple) {
          let fileDifference = files?.length - allowedFiles?.length;
          toast.error(
            `${fileDifference}/${files?.length} ${fileDifference < 2 ? 'File Is' : 'Files Are'} Not Suitable To Upload.`
          );
        } else {
          toast.error('This File Is Not Suitable To Upload.');
        }
        files = allowedFiles;
      }
    }

    // Updating Total Number Of Files To Be Uploaded

    onNumberOfFilesChange && onNumberOfFilesChange('toBeUploaded', files?.length); // This call should update the count of toBeUploaded files by the length of selected files

    // Use Promise.all() to upload all the selected files concurrently

    await Promise.all(
      Array.from(files).map(async file => {
        setFileBeingUploaded(URL.createObjectURL(file));
        setError('');
        setUploadProgress(0);
        setUploading(true);
        const totalChunks = Math.ceil(file.size / MAX_CHUNK_SIZE);

        let fileId = '';
        let uploadSessionUrl = '';

        let chunkIndex = 0;

        for (chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
          const start = chunkIndex * MAX_CHUNK_SIZE;
          const end = Math.min(start + MAX_CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const base64data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => {
              resolve(event.target.result.split(',')[1]);
            };
            reader.onerror = error => {
              reject(error);
            };
            reader.readAsDataURL(chunk);
          });

          try {
            const response = await sendChunk(
              fileId,
              uploadSessionUrl,
              base64data,
              chunkIndex,
              file.name,
              file.type,
              file.size,
              start,
              end - 1,
              totalChunks
            );

            if (response.status === 'pending') {
              fileId = response.fileId;
              uploadSessionUrl = response.uploadSessionUrl;
              setUploadProgress(((chunkIndex + 1) / totalChunks) * 100);
            } else if (response.status === 'complete') {
              setUploadProgress(100);
              setUploading(false);
              onUploadedFilesChange({
                fileName: file?.name,
                mimeType: file.type,
                fileId: response?.fileId,
                src: URL.createObjectURL(file)
              });

              // Updating the uploaded file count
              onNumberOfFilesChange && onNumberOfFilesChange('alreadyUploaded', 1); // This call sholud increase the alreadyUploaded files count by 1

              break;
            } else {
              setError(response.e);
              console.error('Upload error:', response.e);
              setUploading(false);
              break;
            }
          } catch (error) {
            console.error('Error during upload:', error);
            setUploading(false);
            break;
          }
        }
      })
    );

    // Resetting the file count

    onNumberOfFilesChange && onNumberOfFilesChange('', '', true); // Reseting the count of alreadyUploadedFiles and toBeUploaded files
  };

  return (
    <div>
      <div className="p-1 d-flex justify-content-center align-items-center">
        <input
          type="file"
          onChange={onFileChange}
          disabled={uploading}
          id={id}
          style={{ display: 'none' }}
          multiple={multiple}
          accept={accept}
        />
        <label htmlFor={!uploading && id}>
          <div
            className={`drive-file-uploader d-flex justify-content-center align-items-center  ${
              !uploading ? 'pointer p-5' : 'p-1'
            }`}
          >
            {uploading ? (
              <div className="position-relative">
                <img src={fileBeingUploaded} className="uploading-image" />
                <Spinner size={40} variant="dark" animation="border" className="image-loading-spinner" />
              </div>
            ) : (
              <Plus size={40} className={uploading && 'text-muted'} />
            )}
          </div>
        </label>
      </div>
      {!uploading && <h6 className="my-2 text-center font-weight-bold">{text}</h6>}
      {uploading && <div>{<ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />}</div>}
      {error && <div className="text-danger">Error: {error}</div>}
    </div>
  );
};

export default DriveFileUploader;
