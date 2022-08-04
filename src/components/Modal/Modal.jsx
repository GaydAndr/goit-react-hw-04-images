import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export const Modal = ({ onClose, largeIMG }) => {
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape' || event.target.id === 'Overlay') {
        onClose();
      }
    });

    return window.removeEventListener('keydown', event => {
      if (event.code === 'Escape') {
        onClose();
      }
    });
  }, [onClose]);

  const handelCloseModal = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <div className={s.Overlay} id="Overlay" onClick={handelCloseModal}>
      <div className={s.Modal}>
        <img src={largeIMG.img} alt={largeIMG.tag} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeIMG: PropTypes.shape({
    img: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }),
};

/*
import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeIMG: PropTypes.shape({
      img: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handelCloseModal);
    window.addEventListener('click', this.handelCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelCloseModal);
    window.removeEventListener('click', this.handelCloseModal);
  }

  handelCloseModal = event => {
    if (event.code === 'Escape' || event.target.id === 'Overlay') {
      this.props.onClose();
    }
  };
  render() {
    const { largeIMG } = this.props;
    return (
      <div className={s.Overlay} id="Overlay">
        <div className={s.Modal}>
          <img src={largeIMG.img} alt={largeIMG.tag} />
        </div>
      </div>
    );
  }
}

*/
