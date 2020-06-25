import React, { Component } from 'react';
import MessageItem from './messageItem';
import { MSG_SUBSCRIPTION } from './graphql';

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

export default Subscription;
