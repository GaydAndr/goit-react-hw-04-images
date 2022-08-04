import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export const ImagesGallaryItem = ({
  webformatURL,
  largeImageURL,
  handlerOpenModal,
}) => {
  return (
    <>
      <li
        className={s.ImageGalleryItem}
        onClick={() => handlerOpenModal(largeImageURL)}
      >
        <img
          src={webformatURL}
          alt="img"
          className={s.ImageGalleryItem__image}
        />
      </li>
    </>
  );
};

ImagesGallaryItem.propsTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
