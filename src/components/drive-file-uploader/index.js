import React, { useState } from 'react';

const MAX_CHUNK_SIZE = 2 * 1024 * 1024; // 48MB

const DriveFileUploader = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
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
    const file = e.target.files[0];
    if (!file) return;

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
          setUploadProgress((chunkIndex + 1 / totalChunks) * 100);
        } else if (response.status === 'complete') {
          setUploadProgress(100);
          setUploading(false);
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
  };

  return (
    <div className="p-5">
      <input type="file" onChange={onFileChange} disabled={uploading} />
      {uploading && <div>Uploading: {uploadProgress.toFixed(2)}%</div>}
      {error && <div className="text-danger">Error: {error}</div>}
    </div>
  );
};

export default DriveFileUploader;
