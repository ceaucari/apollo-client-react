import React from 'react';
import MainLayout from '../layouts/mainLayout';
import Upload from '../utils/upload';
import Files from '../utils/files';

// import { CreateUploadLink, createUploadLink } from 'apollo-upload-client';

const UserFrom = () => {
  return (
    <MainLayout>
      <Upload />
      <Files />
    </MainLayout>
  );
};

export default UserFrom;
