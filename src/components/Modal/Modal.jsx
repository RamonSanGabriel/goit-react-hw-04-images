import Modal from 'react-modal';
import styles from './Modal.module.css';
Modal.setAppElement('#root');

const ImageModal = ({ modalClose, modalOpen, image }) => {
  return (
    <Modal
      onRequestClose={modalClose}
      isOpen={modalOpen}
      contentLabel="Image Modal"
    >
      <div className={styles.overlay}>
        <img src={image} alt="" />
      </div>
    </Modal>
  );
};

export default ImageModal;
