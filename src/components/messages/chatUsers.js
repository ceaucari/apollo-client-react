import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import { useEffect } from 'react';
import { GET_USERS } from '../user/graphql';

const ChatUsers = () => {
  const [users, setUsers] = useState(null);
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (!users) {
      setUsers(data?.users);
    }
  }, [data, users]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <h2>Users:</h2>
      {users?.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </>
  );
};

export default ChatUsers;
