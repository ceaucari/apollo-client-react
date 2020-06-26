import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../user/graphql';
import DeleteMessage from './messageDelete';

const MessageItem = ({ message, session }) => {
  const { data: meData } = useQuery(GET_ME);
  const me = meData?.me;

  return (
    <div className="column background-grey is-full">
      <div className="columns">
        <span className="column is-7 is-size-5">{message.user.username}</span>
        <span className="column is-size-7 has-text-right">{`${new Date(
          message.createdAt
        ).toLocaleString()}`}</span>
        <div className="column is-1 has-text-right">
          {message.user.id === me?.id && (
            <DeleteMessage messageId={message.id} />
          )}
        </div>
      </div>
      <div>{message.text}</div>
    </div>
  );
};

export default MessageItem;
