import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import MessageItem from './messageItem';
import { MSG_SUBSCRIPTION } from './graphql';

const LastMessage = () => {
  const { data, loading } = useSubscription(MSG_SUBSCRIPTION);

  if (!data || loading) {
    return <p>No new messages</p>;
  }

  const {
    messageCreated: { message },
  } = data;

  return (
    <>
      <h3>Last message:</h3>
      <MessageItem key={message.id} message={message} />
    </>
  );
};

export default LastMessage;

// I still need to figure out how to update the query in Apollo cache with useSubscription()
