import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { filesQuery } from './files';

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }],
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p>Drag 'n' drop some files here,</p>
          <p> or click to select files</p>
        </>
      )}
    </div>
  );
};

export default Upload;
