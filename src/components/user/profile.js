import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import Modal from '../utils/modal';
import UserEdit from './userEdit';
import { GET_USER, GET_ME } from './graphql';

const Profile = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  const user = data?.user;

  const { data: currentUser } = useQuery(GET_ME);
  const me = currentUser?.me;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = userId => {
    setShowModal(!showModal);
  };

  const userUpdated = () => {
    toggleModal();
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  const canEdit = user?.id === me?.id || me?.role === 'ADMIN';

  return (
    <>
      <Modal isVisible={showModal} closeModal={toggleModal} title="Edit user">
        <UserEdit userId={userId} userUpdated={userUpdated} />
      </Modal>
      <MainLayout>
        {canEdit && (
          <div>
            <button
              className="button"
              onClick={() => {
                toggleModal(user.id);
              }}
            >
              <span className="icon is-small">
                <i className="fa fa-edit" aria-hidden="true" />
              </span>
              <span>Edit</span>
            </button>
          </div>
        )}

        <div>
          <div>Id: {user.id}</div>
          <div>Username: {user.username}</div>
          <div>First name: {user.firstName}</div>
          <div>Last name: {user.lastName}</div>
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
          <div>
            Member since: {` ${new Date(user.createdAt).toLocaleDateString()}`}
          </div>
          <hr />
          <h3>Messages:</h3>
          {user.messages.map(message => (
            <div key={message.id}>
              <span>{`[${message.id}] - `}</span>
              <span>{` ${new Date(message.createdAt).toLocaleString()}`}</span>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;

// TODO: Hide fields for other users?
