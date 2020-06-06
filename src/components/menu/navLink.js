import React from 'react';
import { Link } from '@reach/router';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        // style: isCurrent ? 'color: red' : 'color: blue',
        className: isCurrent
          ? 'navbar-item has-text-dark is-active'
          : 'navbar-item has-text-white',
      };
    }}
  />
);

export default NavLink;
