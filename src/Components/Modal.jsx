import React from "react";
import styles from "../styles.module.css";
import { useEvent, useStore } from "effector-react";
import { $storeModal, modalClose } from "../store";

export const Modal = ({ children }) => {
  const modalStatus = useStore($storeModal);
  const onCloseModal = useEvent(modalClose);
  return (
    <>
      <dialog open={modalStatus} className={styles.overlay}>
        <div className={styles.modal}>
          <header className={styles.modalHeader}>
            <button
              className={styles.closeButton}
              onClick={onCloseModal}
            ></button>
          </header>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </dialog>
    </>
  );
};
