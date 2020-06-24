import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MessageForm from './messageCreate';
import MessageItem from './messageItem';
import LoadMore from './messagesLoadMore';

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
  },
  sidebarRight: {
    width: '300px',
  },
  loadMore: {},
};

const MSG_QUERY = gql`
  query($cursor: String, $limit: Int!) {
    messages(cursor: $cursor, limit: $limit) @connection(key: "msgs") {
      edges {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const LIMIT = 2;

const Messages = ({ limit = LIMIT }) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    MSG_QUERY,
    {
      variables: { cursor: '', limit: limit },
    }
  );

  if (error) {
    return <Error error={error} />;
  }

  if (!data || loading) {
    return <Loading />;
  }

  const {
    messages: { edges, pageInfo },
  } = data;

  return (
    <div style={s.wrapper} className="container">
      <div style={s.sidebarLeft}></div>
      <div style={s.messagesWrapper}>
        <div style={s.messageForm}>
          <MessageForm />
        </div>
        <div style={s.messages}>
          <Subscription messages={edges} subscribeToMore={subscribeToMore} />
        </div>
        {pageInfo.hasNextPage && (
          <div style={s.loadMore}>
            <LoadMore limit={limit} pageInfo={pageInfo} fetchMore={fetchMore} />
          </div>
        )}
      </div>
      <div style={s.sidebarRight}></div>
    </div>
  );
};

export default Messages;

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

class Subscription extends Component {
  componentDidMount() {
    this.subscribe();
  }

  subscribe = () => {
    this.props.subscribeToMore({
      document: MSG_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { messageCreated } = subscriptionData.data;

        return {
          ...prev,
          messages: {
            ...prev.messages,
            edges: [messageCreated.message, ...prev.messages.edges],
          },
        };
      },
    });
  };

  render() {
    const { messages } = this.props;
    return messages.map(message => (
      <MessageItem key={message.id} message={message} />
    ));
  }
}
