import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_MESSAGE, MSG_QUERY } from './graphql';
import { LIMIT } from './messages';

const DeleteMessage = ({ messageId, messageDeleted }) => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    refetchQueries: [
      { query: MSG_QUERY, variables: { cursor: '', limit: LIMIT } },
    ],
    onCompleted: messageDeleted,
  });

  const handleDeleteMessage = messageId => {
    console.log('MSG', messageId);
    deleteMessage({
      variables: { id: messageId },
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <button
      className="button is-danger"
      onClick={() => handleDeleteMessage(messageId)}
    >
      <span className="icon is-small">
        <i className="fa fa-trash" aria-hidden="true" />
      </span>
    </button>
  );
};

export default DeleteMessage;
