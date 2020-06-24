import React from 'react';
import MessageForm from './messageCreate';

const s = {
  wrapper: {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'row',
    position: 'relative',
  },
  messagesWrapper: {
    flexGrow: '1',
    height: '100vh',
    backgroundColor: '#cdcdcd',
    overflow: 'hidden',
    overflowY: 'scroll',
    position: 'relative',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  messages: {
    // maxHeight: 'calc(100vh - 170px)',
    maxHeight: '400px',
    borderBottomWidth: '3px',
    backgroundColor: 'yellow',
    // overflow: 'hidden',
    overflowY: 'scroll',
  },
  messageForm: {
    height: '170px',
    // flex: '1',
    // flexGrow: '1',
    backgroundColor: 'tomato',
    // display: 'flex',
    position: 'absolute',
    // bottom: '-170px',
    bottom: 0,
    left: 0,
    right: 0,
    // width: '100%',
  },
  sidebarLeft: {
    height: '100vh',
    width: '300px',
    backgroundColor: 'cyan',
  },
  sidebarRight: {
    height: '500px',
    width: '300px',
    backgroundColor: 'cyan',
  },
};

const MessagesLayout = () => {
  return (
    <div style={s.wrapper}>
      <div style={s.sidebarLeft}></div>
      <div style={s.messagesWrapper}>
        <div style={s.messages}>
          <h1>FIRST Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>Messages</h1>
          <h1>LAST Messages</h1>
        </div>
        <div style={s.messageForm}>
          <MessageForm />
        </div>
      </div>
      <div style={s.sidebarRight}></div>
    </div>
  );
};

export default MessagesLayout;
