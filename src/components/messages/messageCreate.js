import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { form } from '../../styles';
import Error from '../utils/error';

const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!) {
    createMessage(text: $text) {
      id
      text
    }
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const MessageForm = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const [input, setInput] = useState('');

  const mutationUpdate = (cache, { data }) => {
    console.log('UPDATED data:', data);
    console.log('UPDATED cache:', cache);
  };

  const mutationComplete = data => {
    setInput('');
    console.log('COMPLETED data:', data);
  };

  const [createMessage, { error }] = useMutation(CREATE_MESSAGE, {
    update: (cache, data) => mutationUpdate(cache, data),
    onCompleted: data => mutationComplete(data),
  });

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      createMessage({ variables: { text: input } }).catch(err =>
        console.log('UNHANDLED ERR', err)
      );
    }
  };

  if (!data.isLoggedIn) {
    return null;
  }
  return (
    <div style={form.container}>
      <form onSubmit={handleSubmit}>
        <div style={form.field}>
          <label style={form.label}>Message</label>
          <textarea
            style={form.input}
            rows="3"
            name="message"
            onChange={e => setInput(e.target.value)}
            value={input}
            required
          />
        </div>
        {error && <Error error={error} />}
        <div>
          <button style={form.button} type="submit">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
