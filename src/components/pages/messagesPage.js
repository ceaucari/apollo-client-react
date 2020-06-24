import React from 'react';
import NavBar from '../layouts/navBar';
import DocsLayout from '../layouts/docsLayout';
import Messages from '../messages/messages';

const MessagesPage = () => {
  return (
    <>
      <DocsLayout>
        <Messages />
      </DocsLayout>
    </>
  );
};

export default MessagesPage;

// import React from 'react';
// import NavBar from './navBar';

// const DocsLayout = (props) => (
//   <>
//     <NavBar />
//     <section>
//       <div className="container-x">{props.children}</div>
//     </section>
//   </>
// );

// export default DocsLayout;
