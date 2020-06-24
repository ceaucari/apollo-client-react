import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { Link } from '@reach/router';
import Modal from '../utils/modal';
import UserEdit from './userEdit';

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      role
      messages {
        id
        createdAt
        text
      }
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const users = data?.users;

  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const toggleModal = userId => {
    setShowModal(!showModal);
    setUserId(userId);
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  // if (!data) return <p>Not found</p>;

  return (
    <>
      <Modal isVisible={showModal} closeModal={toggleModal} title="Edit user">
        <UserEdit userId={userId} />
      </Modal>
      <MainLayout>
        <table className="table">
          <thead>
            <tr>
              <th>-</th>
              <th>ID</th>
              <th>username</th>
              <th>email</th>
              <th>role</th>
              <th>messages</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.id}</td>
                {/* <td>{user.username}</td> */}
                <td>
                  <Link to={`/user/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.role || 'USER'}</td>
                {/* <span>{`${new Date(user.createdAt).toLocaleString()}`}</span> */}
                <td>
                  {user.messages.map(message => (
                    <div key={message.id}>
                      <div>{message.id}</div>
                      <div>{`${new Date(
                        message.createdAt
                      ).toLocaleString()}`}</div>
                      {/* <div>{message.text}</div> */}
                    </div>
                  ))}{' '}
                </td>
                <td>
                  <button
                    className="button"
                    onClick={() => toggleModal(user.id)}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-edit" aria-hidden="true" />
                    </span>
                    {/* <span>Edit</span> */}
                  </button>
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={() => alert(`Delete user ${user.username}`)}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-trash" aria-hidden="true" />
                    </span>
                    {/* <span>Delete</span> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MainLayout>
    </>
  );
};

export default Users;
