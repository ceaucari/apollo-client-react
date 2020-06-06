import React from 'react';

const MessageItem = ({ message, session }) => (
  <div className="column background-grey is-6 is-offset-3">
    <div className="columns">
      <span className="column is-size-5">{message.user.username}</span>
      <span className=" column is-size-7 has-text-right">{`${new Date(
        message.createdAt
      ).toLocaleString()}`}</span>
    </div>
    <div>{message.text}</div>
  </div>
);

export default MessageItem;
