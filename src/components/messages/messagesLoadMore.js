import React from 'react';

const LoadMore = ({ limit, pageInfo, fetchMore }) => (
  <div className="is-2 is-offset-5 column">
    <button
      className="button is-fullwidth is-link"
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
                  ...fetchMoreResult.messages.edges,
                  ...prev.messages.edges,
                ],
              },
            };
          },
        })
      }
    >
      Load More
    </button>
  </div>
);

export default LoadMore;
