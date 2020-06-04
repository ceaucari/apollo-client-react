import React from 'react';
import { messages as s } from '../../styles';

const MessageItem = ({ message, session }) => (
  <div style={s.wrapper}>
    <div style={s.firstRow}>
      <span style={s.name}>{message.user.username}</span>
      <small style={s.date}>{`${new Date(
        message.createdAt
      ).toLocaleString()}`}</small>
    </div>
    <p style={s.message}>{message.text}</p>

    {/* {session &&
      session.me &&
      message.user.id === session.me.id && (
        <MessageDelete message={message} />
      )} */}
  </div>
);

export default MessageItem;
