import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MessageForm from './messageCreate';
import MainLayout from '../layouts/mainLayout';
import MessageItem from './messageItem';
import LoadMore from './messagesLoadMore';

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

  if (!data || loading) {
    return <Loading />;
  }

  if (error) return <Error error={error} />;

  const {
    messages: { edges, pageInfo },
  } = data;

  return (
    <MainLayout>
      <MessageForm />

      <Subscription messages={edges} subscribeToMore={subscribeToMore} />

      {pageInfo.hasNextPage && (
        <LoadMore limit={limit} pageInfo={pageInfo} fetchMore={fetchMore} />
      )}
    </MainLayout>
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
