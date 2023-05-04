import React, { useState } from 'react';
import { ProgressBar, Spinner } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

const MAX_CHUNK_SIZE = 2 * 1024 * 1024; // 48MB

const DriveFileUploader = ({
  text = 'Upload The Image',
  onUploadedFilesChange,
  multiple = true,
  id,
  numberOfFilesToBeUploaded
}) => {
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

    const scriptUrl =
      'https://script.google.com/macros/s/AKfycbyF0VB4MgRsptXI7aCvIbN9294kk2exBEI_zzDb7_ZEzufq_0lmGQswAVTTZSPeEH4N/exec';

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({ payload: fileInfoObject, requestType: 'upload-file' })
    });

    return await response.json();
  };

  const onFileChange = async e => {
    const files = e.target.files || [];
    multiple && numberOfFilesToBeUploaded && numberOfFilesToBeUploaded(files?.length);

    if (!files) return;

    for (let fileIndex = 0; fileIndex < Array.from(files)?.length; fileIndex++) {
      const file = files[fileIndex];
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
            onUploadedFilesChange(URL.createObjectURL(file));
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
    }
  };

  return (
    <div>
      <div className="p-1 d-flex justify-content-center">
        <input
          type="file"
          onChange={onFileChange}
          disabled={uploading}
          id={id}
          style={{ display: 'none' }}
          multiple={multiple}
        />
        <label for={!uploading && id}>
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
