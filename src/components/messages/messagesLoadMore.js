import React from 'react';

const LoadMore = ({ limit, pageInfo, fetchMore }) => (
  <button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit: limit,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          return {
            messages: {
              ...fetchMoreResult.messages,
              edges: [
                ...prev.messages.edges,
                ...fetchMoreResult.messages.edges,
              ],
            },
          };
        },
      })
    }
  >
    Load More
  </button>
);

export default LoadMore;
