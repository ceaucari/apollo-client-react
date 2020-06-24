import React from 'react';
import NavBar from './navBar';

const DocsLayout = (props) => (
  <>
    <NavBar />
    <section>{props.children}</section>
  </>
);

export default DocsLayout;
