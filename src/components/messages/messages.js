import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import Subscription from './messagesSubscription';
import LoadMore from './messagesLoadMore';
import { MSG_QUERY } from './graphql';

export const LIMIT = 2;

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
    <>
      <Subscription messages={edges} subscribeToMore={subscribeToMore} />
      {pageInfo.hasNextPage && (
        <LoadMore limit={limit} pageInfo={pageInfo} fetchMore={fetchMore} />
      )}
    </>
  );
};

export default Messages;
