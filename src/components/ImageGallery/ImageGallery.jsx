import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import styles from './ImageGallery.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    fullGallery: [],
    status: 'idle',
    showModal: false,
    imageSelected: null,
  };

  componentDidUpdate(prevProps) {
    const { imgName, page, fetchImg } = this.props;
    this.galleryClean(prevProps);

    if (prevProps !== this.props) {
      this.setState({ status: 'pending' });
      fetchImg(imgName, page).then(imgName =>
        this.setState(({ fullGallery }) => ({
          fullGallery: [...fullGallery, ...imgName.hits],
          status: 'resolved',
        }))
      );
    }
    this.scrollBottom();
  }

  galleryClean = prevProps => {
    const { imgName } = this.props;
    const prevImgName = prevProps.imgName;

    if (prevImgName !== imgName) {
      this.setState(() => ({
        fullGallery: [],
      }));
    }
  };

  scrollBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ imageSelected: img });
  };

  render() {
    const { onClick } = this.props;
    const { fullGallery, status, showModal, imageSelected } = this.state;
    return (
      <div className={styles.container}>
        <ul className={styles.gallery}>
          {fullGallery.map(img => {
            const { id, webformatURL, tags } = img;
            return (
              <ImageGalleryItem
                toggleModal={() => this.toggleModal(img)}
                key={id}
                webSrc={webformatURL}
                alt={tags}
              />
            );
          })}
        </ul>
        {showModal && (
          <Modal imageSelected={imageSelected} toggleModal={this.toggleModal} />
        )}
        {status === 'resolved' && <Button onClick={onClick} />}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}
