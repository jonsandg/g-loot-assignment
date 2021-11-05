import React from 'react';
import ReactModal from 'react-modal';

import styles from './Modal.module.scss';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onRequestClose?(): any;
  children: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
}

export const Modal = ({ 
  isOpen, 
  onRequestClose, 
  title,
  actions,
  children 
}: ModalProps) => {
  
  return(
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      {title && (
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </ReactModal>
  );
}