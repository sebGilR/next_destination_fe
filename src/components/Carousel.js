import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Item from './Item';
import styles from '../assets/style/Carousel.module.scss';
import 'jquery-mousewheel';

const Carousel = ({ destinations, menu, toggleMenu }) => {
  $(document).ready(() => {
    $(`.${styles.slider}`).mousewheel(function Mousewheel(e, delta) {
      let spacing;
      const docWidth = $(document).width();
      if (docWidth < 800) {
        spacing = (destinations.length * 25) + 50;
      } else if (docWidth >= 800 && docWidth < 1000) {
        spacing = (destinations.length * 25) + 100;
      } else if (docWidth >= 1000 && docWidth < 1300) {
        spacing = (destinations.length * 25) + 200;
      } else {
        spacing = (destinations.length * 25) + 500;
      }
      const width = ($(`.${styles.container}`).width() / destinations.length) + spacing;
      // Next line rule disabled since "this" is required for this code snippet
      this.scrollLeft -= (delta * width); // eslint-disable-line
    });
  });

  const handleMenu = () => {
    if (menu) toggleMenu();
  };

  return (
    <div
      id="dad"
      className={`${styles.container} ${menu && styles.moved}`.trim()}
      onClick={handleMenu}
      onKeyPress={handleMenu}
      role="presentation"
    >
      <div className={styles.slider}>
        {
          destinations.map((dest, i) => (
            <Item
              key={dest.id}
              destination={dest}
              length={destinations.length}
              index={i}
            />
          ))
        }
      </div>
    </div>
  );
};

Carousel.defaultProps = {
  destinations: [],
};

Carousel.propTypes = {
  destinations: PropTypes.arrayOf(Object),
  menu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Carousel;
