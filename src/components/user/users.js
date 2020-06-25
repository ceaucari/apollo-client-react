import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { Link, Redirect } from '@reach/router';
import Modal from '../utils/modal';
import UserEdit from './userEdit';
import UserDelete from './userDelete';
import { useEffect } from 'react';
import { GET_USERS, GET_ME } from './graphql';

const s = {
  center: {
    textAlign: 'center',
  },
};

const Users = () => {
  const [users, setUsers] = useState(null);
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (!users) {
      setUsers(data?.users);
    }
  }, [data, users]);

  const { data: currentUser } = useQuery(GET_ME);
  const me = currentUser?.me;

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const [userId, setUserId] = useState(null);

  const toggleModal = userId => {
    setShowModal(!showModal);
    setUserId(userId);
  };

  const userDeleted = () => {
    toggleModal();
    setUsers(users.filter(user => user.id !== userId));
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  if (!me || me.role !== 'ADMIN') {
    return <Redirect to="/" noThrow />;
  }

  return (
    <>
      <Modal
        isVisible={showModal}
        closeModal={toggleModal}
        title={action === 'edit' ? 'Edit user' : 'Delete user'}
      >
        {action === 'edit' ? (
          <UserEdit userId={userId} />
        ) : (
          <UserDelete userId={userId} userDeleted={userDeleted} />
        )}
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
              <th>since</th>
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
                <td>
                  <Link to={`/user/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.role || 'USER'}</td>
                <td>
                  <span>{`${new Date(
                    user.createdAt
                  ).toLocaleDateString()}`}</span>
                </td>
                <td style={s.center}>
                  <Link to={`/user/${user.id}`}>{user.messages.length}</Link>
                </td>
                <td>
                  <button
                    className="button"
                    onClick={() => {
                      setAction('edit');
                      toggleModal(user.id);
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-edit" aria-hidden="true" />
                    </span>
                    <span>Edit</span>
                  </button>
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={() => {
                      setAction('delete');
                      toggleModal(user.id);
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-trash" aria-hidden="true" />
                    </span>
                    <span>Delete</span>
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
