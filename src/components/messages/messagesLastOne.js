// import React from 'react';
// import { useSubscription } from '@apollo/react-hooks';
// import MessageItem from './messageItem';
// import { MSG_SUBSCRIPTION } from './graphql';

// const LastMessage = () => {
//   const { data, loading } = useSubscription(MSG_SUBSCRIPTION);

//   if (!data || loading) {
//     return <p>No new messages</p>;
//   }

//   const {
//     messageCreated: { message },
//   } = data;

//   return (
//     <>
//       <h3>Last message:</h3>
//       <MessageItem key={message.id} message={message} />
//     </>
//   );
// };

// export default LastMessage;

//---------------------------------------------------------------------------
// Trying to either fer=tch from the query or the subscription in order to have content
// even if just landing on the page have the last message showing up
// and I managed to do that but after a subscription message comes in, I need to update the query
// so that the messages page

// import React from 'react';
// import { useQuery, useSubscription } from '@apollo/react-hooks';
// import MessageItem from './messageItem';
// import { MSG_SUBSCRIPTION, MSG_QUERY } from './graphql';
// import { useState, useEffect } from 'react';

// const LastMessage = ({ limit = 1 }) => {
//   const [message, setMessage] = useState(null);

//   const { data: queryData, loading, error } = useQuery(MSG_QUERY, {
//     variables: { cursor: '', limit: limit },
//   });
//   const { data: subscriptionData } = useSubscription(MSG_SUBSCRIPTION, {
//     refetchQueries: [{ query: MSG_QUERY }],
//   });

//   useEffect(() => {
//     if (subscriptionData) {
//       const {
//         messageCreated: { message },
//       } = subscriptionData;
//       setMessage(message);
//       // console.log('messageCreated', message);
//     }
//     if (!message) {
//       if (queryData) {
//         const {
//           messages: { edges },
//         } = queryData;
//         setMessage(edges[0]);
//         // console.log('edges', edges);
//       }
//     }
//   }, [queryData, subscriptionData]);

//   if (!message) {
//     return <p>No new messages</p>;
//   }

//   return (
//     <>
//       <h3>Last message:</h3>
//       <MessageItem key={message.id} message={message} />
//     </>
//   );
// };

// export default LastMessage;

//---------------------------------------------------------------------------

import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MessageItem from './messageItem';
import { MSG_QUERY, MSG_SUBSCRIPTION } from './graphql';

const LIMIT = 1;

const LastMessage = ({ limit = LIMIT }) => {
  const { data, loading, error, subscribeToMore } = useQuery(MSG_QUERY, {
    variables: { cursor: '', limit: limit },
  });

  if (error) {
    return <Error error={error} />;
  }

  if (!data || loading) {
    return <Loading />;
  }

  const {
    messages: { edges },
  } = data;

  return (
    <Subscription
      messages={edges}
      subscribeToMore={subscribeToMore}
      limit={limit}
    />
  );
};

export default LastMessage;

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
    return messages.map(message => (
      <MessageItem key={message.id} message={message} />
    ));
  }
}
