import React from 'react';

const localStyles = {
  modalBg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#00000080',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: '999',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: '5px',
    zIndex: '9999',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    // display: 'inline-block',
  },
  iconButton: {
    height: 25,
  },
};

const Modal = ({ isVisible, closeModal, children, title }) => (
  <>
    {isVisible && (
      <div style={localStyles.modalBg}>
        <div style={localStyles.modalContainer}>
          <div style={localStyles.header}>
            <h4 className="title is-4">{title}</h4>
            <button className="delete" onClick={closeModal} />
          </div>
          {children}
        </div>
      </div>
    )}
  </>
);

export default Modal;
