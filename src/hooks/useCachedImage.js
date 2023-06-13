import { useState, useEffect, useMemo } from 'react';
import localforage from 'localforage';
import { makeApiRequests } from '../helpers/api';

const MAX_CACHE_SIZE = 50;

const getFileChunk = async (fileId, chunkIndex) => {
  const fileInfoObject = {
    fileId,
    chunkIndex
  };

  const { error, response } = await makeApiRequests({
    requestType: 'read-file',
    requestBody: fileInfoObject
  });

  return await response;
};

const onFetchingFiles = async fileId => {
  let completeChunkData = '';
  let chunkIndex = 0;
  let totalChunks = 1;

  while (chunkIndex < totalChunks) {
    const response = await getFileChunk(fileId, chunkIndex);
    if (response) {
      completeChunkData += response?.chunkData;
    }
    totalChunks = response?.totalChunks;
    chunkIndex += 1;
  }

  return completeChunkData;
};

const fetchImageAsBlob = async fileId => {
  const base64Data = await onFetchingFiles(fileId);
  const byteCharacters = atob(base64Data?.replace(/-/g, '+').replace(/_/g, '/'));
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  let blobObj = new Blob(byteArrays, { type: 'image/png' }); // Adjust the type according to the image format

  return blobObj;
};

const useCachedImages = fileIds => {
  const [imageSrcs, setImageSrcs] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const fileIdsTemp = Array.isArray(fileIds) ? fileIds : [fileIds];

      const blobUrls = await Promise.all(
        fileIdsTemp.map(async fileId => {
          let blob = await localforage.getItem(fileId);
          if (!blob) {
            blob = await fetchImageAsBlob(fileId);

            const keys = await localforage.keys();
            if (keys.length >= MAX_CACHE_SIZE) {
              await localforage.removeItem(keys[0]);
            }

            await localforage.setItem(fileId, blob);
          }
          return URL.createObjectURL(blob);
        })
      );

      setImageSrcs(blobUrls);
    };

    loadImages();
  }, [fileIds]);

  return Array.isArray(fileIds) ? imageSrcs : imageSrcs[0];
};

export default useCachedImages;
