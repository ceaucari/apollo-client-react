import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import { useEffect } from 'react';
import { GET_ME, GET_USERS } from '../user/graphql';

const ChatUsers = () => {
  const [users, setUsers] = useState(null);
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (!users) {
      setUsers(data?.users);
    }
  }, [data]);

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

  // if (!me || me.role !== 'ADMIN') {
  //   return <Redirect to="/" noThrow />;
  // }

  return (
    <>
      <h2>Users:</h2>
      {users?.map((user, idx) => (
        <div>{user.username}</div>
      ))}
    </>
  );
};

export default ChatUsers;
