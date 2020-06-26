import React, { useState, useMemo } from 'react';
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
    margin: '0 auto',
  },
};

//--------------------------------------------------------------------------------------

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    let icon = 'fa fa-arrow-down';
    if (sortConfig?.key === key && sortConfig?.direction === 'ascending') {
      direction = 'descending';
      icon = 'fa fa-arrow-up';
    }
    setSortConfig({ key, direction, icon });
  };
  return { items: sortedItems, requestSort, sortConfig };
};

//--------------------------------------------------------------------------------------

const UsersTable = ({ users, editUser, deleteUser }) => {
  const { items, requestSort, sortConfig } = useSortableData(users);
  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.icon : undefined;
  };

  return (
    <div>
      <table className="table" style={s.center}>
        <thead>
          <tr>
            <th></th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('id')}
              >
                <span>Id</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('id')} />
                </span>
              </button>
            </th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('name')}
              >
                <span>Name</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('name')} />
                </span>
              </button>
            </th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('username')}
              >
                <span>Username</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('username')} />
                </span>
              </button>
            </th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('email')}
              >
                <span>Email</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('email')} />
                </span>
              </button>
            </th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('role')}
              >
                <span>Role</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('role')} />
                </span>
              </button>
            </th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('since')}
              >
                <span>Since</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('since')} />
                </span>
              </button>
            </th>
            <th>
              <button
                type="button"
                className="button is-white"
                onClick={() => requestSort('messages')}
              >
                <span>Messages</span>
                <span className="icon is-small">
                  <i className={getClassNamesFor('messages')} />
                </span>
              </button>
            </th>
            <th>
              <button type="button" className="button is-white" disabled>
                <span>Edit</span>
              </button>
            </th>
            <th>
              <button type="button" className="button is-white" disabled>
                <span>Delete</span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((u, idx) => (
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td>{u.id}</td>
              <td>
                {u.firstName} {u.lastName}
              </td>
              <td>
                <Link to={`/user/${u.id}`}>{u.username}</Link>
              </td>
              <td>{u.email}</td>
              <td>{u.role || 'USER'}</td>
              <td>
                <span>{`${new Date(u.createdAt).toLocaleDateString()}`}</span>
              </td>
              <td className="has-text-centered">
                <Link to={`/user/${u.id}`}>{u.messages.length}</Link>
              </td>
              <td>
                <button className="button" onClick={() => editUser(u.id)}>
                  <span className="icon is-small">
                    <i className="fa fa-edit" aria-hidden="true" />
                  </span>
                  <span>Edit</span>
                </button>
              </td>
              <td>
                <button
                  className="button is-danger"
                  onClick={() => deleteUser(u.id)}
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
    </div>
  );
};

//--------------------------------------------------------------------------------------

const Users = () => {
  const [users, setUsers] = useState(null);
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    setUsers(data?.users);
  }, [data, users]);

  const { data: meData } = useQuery(GET_ME);
  const me = meData?.me;

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleEdit = id => {
    setUserId(id);
    setAction('edit');
    setShowModal(!showModal);
  };

  const handleDelete = id => {
    setUserId(id);
    setAction('delete');
    setShowModal(!showModal);
  };

  const userUpdated = () => {
    toggleModal();
    setUsers(null);
  };

  const userDeleted = () => {
    toggleModal();
    setUsers(users.filter(user => user.id !== userId));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderModal = () => (
    <Modal
      isVisible={showModal}
      closeModal={toggleModal}
      title={action === 'edit' ? 'Edit user' : 'Delete user'}
    >
      {action === 'edit' ? (
        <UserEdit userId={userId} userUpdated={userUpdated} />
      ) : (
        <UserDelete userId={userId} userDeleted={userDeleted} />
      )}
    </Modal>
  );

  if (error) {
    return <Error error={error} />;
  }

  if (loading || !users || me === undefined) {
    return <Loading />;
  }

  if (!me || me.role !== 'ADMIN') {
    return <Redirect to="/" noThrow />;
  }

  return (
    <>
      {renderModal()}
      <MainLayout>
        <UsersTable
          users={users}
          editUser={handleEdit}
          deleteUser={handleDelete}
        />
      </MainLayout>
    </>
  );
};

export default Users;
