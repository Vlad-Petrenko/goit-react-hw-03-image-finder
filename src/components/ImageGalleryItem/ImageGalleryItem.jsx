import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webSrc, alt, toggleModal }) => {
  return (
    <li className={styles.galleryItem}>
      <img
        onClick={toggleModal}
        className={styles.galleryItemImage}
        src={webSrc}
        alt={alt}
        width="200"
      />
    </li>
  );
};
