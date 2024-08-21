import { useState } from 'react';
import ImageModal from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = () => {
    setSelectedImage(this.props.largeImageURL);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <li className={styles.galleryItem} onClick={handleOpenModal}>
      <img src={webformatURL} alt={tags} />
      <ImageModal
        modalClose={handleCloseModal}
        modalOpen={selectedImage !== null}
        image={selectedImage}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
