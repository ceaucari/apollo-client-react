import React from 'react';
import NavBar from '../layouts/navBar';
import Messages from '../messages/messages';
import ChatUsers from '../messages/chatUsers';
import MessageForm from '../messages/messageCreate';

const s = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  messagesWrapper: {
    height: 'calc(100vh - 52px)',
    flexGrow: 1,
    overflow: 'hidden',
    overflowY: 'scroll',
    position: 'relative',
  },
  messages: {
    maxHeight: 'calc(100vh - 222px)',
    overflowY: 'scroll',
    width: '100%',
  },
  messageForm: {
    height: '170px',
  },
  sidebarLeft: {
    width: '300px',
    marginRight: '10px',
    backgroundColor: '#ededed',
    padding: '20px',
  },
  sidebarRight: {
    width: '300px',
    marginLeft: '10px',
    backgroundColor: '#ededed',
    padding: '20px',
  },
};

const MessagesPage = () => {
  return (
    <>
      <NavBar />
      <div style={s.wrapper}>
        <div style={s.sidebarLeft}>
          <ChatUsers />
        </div>
        <div style={s.messagesWrapper}>
          <div style={s.messageForm}>
            <MessageForm />
          </div>
          <div style={s.messages}>
            <Messages />
          </div>
        </div>
        <div style={s.sidebarRight}></div>
      </div>
    </>
  );
};

export default MessagesPage;
