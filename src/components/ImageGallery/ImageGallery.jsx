import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

import { PixabayAPI } from 'servises/PixabayAPI';
import { ImagesGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
};

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [tags, setTag] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [largeIMG, setLargeIMG] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  useEffect(() => {
    if (!query) {
      return;
    }
    if (query !== tags) {
      setImages([]);
    }

    setStatus(STATUS.loading);
    setTag(query);

    PixabayAPI(query, page)
      .then(({ data }) => {
        if (data.total === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setStatus(STATUS.error);
          setImages([]);
          setTotalHits(null);
          return;
        }
        setImages(ps => [...ps, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(STATUS.success);
      })
      .catch(error => {
        toast.error(error.message);
        this.setState({ status: STATUS.error });
      });
  }, [page, query]);

  const handlerLoadMore = () => {
    setPage(ps => ps + 1);
  };

  const handlerOpenModal = img => {
    setLargeIMG(img);
  };

  const handlerCloseModal = () => {
    setLargeIMG(null);
  };

  return (
    <>
      {status === STATUS.loading && <Loader />}
      <ul className={s.ImageGallery}>
        {images.length > 0 &&
          images.map(el => {
            return (
              <ImagesGallaryItem
                key={el.id}
                webformatURL={el.webformatURL}
                tags={el.tags}
                largeImageURL={el.largeImageURL}
                handlerOpenModal={handlerOpenModal}
              />
            );
          })}
        {largeIMG && <Modal largeIMG={largeIMG} onClose={handlerCloseModal} />}
      </ul>
      {totalHits >= 12 * page && status === STATUS.success && (
        <Button onClick={handlerLoadMore} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
