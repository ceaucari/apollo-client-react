import React from 'react';
import './docs.css';
import Collapsible from '../utils/collapsible';
import DocsSidebarCollapsible from './docsSidebarCollapsible';
import DocsTopNav from './docsTopNav';
import RightSideBar from './rightSideBar';

const Docs = props => (
  <div className="container">
    {/* <DocsTopNav /> */}
    <div className="main">
      <section className="section-left">
        <DocsSidebarCollapsible>
          <SideBarContent />
        </DocsSidebarCollapsible>
      </section>

      <section className="section-center">
        {/* <DocsTopNav /> */}
        <div className="main-content">
          <CenterContent />
        </div>
      </section>

      <section className="section-right">
        <RightSideBar>
          <SideBarContent />
        </RightSideBar>
      </section>
    </div>
  </div>
);

export default Docs;

// ___________________________________

const SideBarContent = () => {
  return (
    <ul>
      <li>
        <a href="#">
          {/* <span className="icon">
            <i className="fa fa-book" aria-hidden="true"></i>
          </span> */}
          <span>Books</span>
        </a>
      </li>
      <li>
        <a href="#">
          {/* <span className="icon">
            <i className="fa fa-file-video" aria-hidden="true"></i>
          </span> */}
          <span>Movies</span>
        </a>
      </li>
    </ul>
  );
};

const CenterContent = () => {
  return (
    <>
      <h1 className="title">Lorem ipsum dolor sit</h1>
      <p>
        Amet consectetur adipisicing elit. Molestiae deleniti, laudantium nobis
        suscipit dignissimos velit alias quaerat deserunt dolorem illo! Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Molestiae deleniti,
        laudantium nobis suscipit dignissimos velit alias quaerat deserunt
        dolorem illo! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Molestiae deleniti, laudantium nobis suscipit dignissimos velit alias
        quaerat deserunt dolorem illo! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Molestiae deleniti, laudantium nobis suscipit
        dignissimos velit alias quaerat deserunt dolorem illo!
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
        deleniti, laudantium nobis suscipit dignissimos velit alias quaerat
        deserunt dolorem illo!
      </p>
      <h2 className="subtitle is-3">Subtitle</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
        deleniti, laudantium nobis suscipit dignissimos velit alias quaerat
        deserunt dolorem illo! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Molestiae deleniti, laudantium nobis suscipit
        dignissimos velit alias quaerat deserunt dolorem illo! Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Molestiae deleniti, laudantium
        nobis suscipit dignissimos velit alias quaerat deserunt dolorem illo!
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
        deleniti, laudantium nobis suscipit dignissimos velit alias quaerat
        deserunt dolorem illo!
      </p>
    </>
  );
};
