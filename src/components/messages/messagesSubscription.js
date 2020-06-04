import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import MessageItem from './messageItem';

const MSG_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      message {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

const Subscription = () => {
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

export default Subscription;
