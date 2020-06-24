import React from 'react';
import NavBar from '../layouts/navBar';
import DocsLayout from '../layouts/docsLayout';
import Docs from '../docs/docs';
// import MainLayout from '../layouts/mainLayout';

const DocsPage = () => {
  return (
    <>
      <DocsLayout>
        {/* <NavBar /> */}
        <Docs />
      </DocsLayout>
    </>
  );
};

export default DocsPage;

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
