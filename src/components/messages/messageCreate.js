import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_MESSAGE, IS_LOGGED_IN, MSG_QUERY } from './graphql';

import Error from '../utils/error';

const MessageForm = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const [input, setInput] = useState('');

  // const mutationUpdate = (cache, { data }) => {
  // console.log('UPDATED data:', data);
  // console.log('UPDATED cache:', cache);
  // };

  const mutationComplete = data => {
    setInput('');
  };

  const [createMessage, { error }] = useMutation(CREATE_MESSAGE, {
    // update: (cache, data) => mutationUpdate(cache, data),
    onCompleted: data => mutationComplete(data),
    // refetchQueries: [{ query: MSG_QUERY }],
  });

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      createMessage({ variables: { text: input } }).catch(err =>
        console.log(err)
      );
    }
  };

  if (!data.isLoggedIn) {
    return null;
  }
  return (
    <div className="column is-full">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <textarea
            className="textarea"
            placeholder="Type your message here"
            rows="3"
            name="message"
            onChange={e => setInput(e.target.value)}
            value={input}
            required
          />
        </div>
        {error && <Error error={error} />}
        <button className="button is-link is-fullwidth" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
