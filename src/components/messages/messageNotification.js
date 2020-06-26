import React, { Component, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MessageItem from './messageItem';
import { MSG_QUERY, MSG_SUBSCRIPTION } from './graphql';

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
            edges: [messageCreated.message],
          },
        };
      },
    });
  };

  render() {
    const { messages } = this.props;
    const message = messages[0];
    return (
      <>
        <div className="columns">
          <span className="column is-7 is-size-5">{message.user.username}</span>
          <span className="column is-size-7 has-text-right">{`${new Date(
            message.createdAt
          ).toLocaleString()}`}</span>
        </div>
        <div>{message.text}</div>
      </>
    );
  }
}

const MessageNotification = ({ limit = 1 }) => {
  const { data, loading, error, subscribeToMore } = useQuery(MSG_QUERY, {
    variables: { cursor: '', limit: limit },
  });

  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowNotification(!showNotification);
    }, 3000);
  }, []);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  if (error) {
    return <Error error={error} />;
  }

  if (!data || loading) {
    return <Loading />;
  }

  const {
    messages: { edges },
  } = data;

  if (showNotification) {
    return (
      <div className="notification is-info">
        <button className="delete" onClick={toggleNotification} />
        <h2>Last message:</h2>
        <Subscription
          messages={edges}
          subscribeToMore={subscribeToMore}
          limit={limit}
        />
      </div>
    );
  }
  return null;
};

export default MessageNotification;
