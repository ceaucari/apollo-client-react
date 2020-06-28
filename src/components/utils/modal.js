import React from 'react';

const localStyles = {
  background: {
    background: '#00000080',
  },
};

const Modal = ({ isVisible, closeModal, title, children, footer }) => (
  <>
    {isVisible && (
      <div className={`modal ${isVisible && `is-active`}`}>
        <div className="modal-background" style={localStyles.background}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            />
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">{footer}</footer>
        </div>
      </div>
    )}
  </>
);

export default Modal;
