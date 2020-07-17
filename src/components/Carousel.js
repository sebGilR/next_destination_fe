import React from 'react';
import Item from './Item';
import styles from '../assets/style/Carousel.module.scss';
import { useState } from 'react';
import $ from 'jquery';
import 'jquery-mousewheel';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = ({ destinations, menu }) => {

  $(document).ready(function () {
    $(`.${styles.slider}`).mousewheel(function (e, delta) {
      this.scrollLeft -= (delta * 30);
    });
  });

  return (
    <div className={`${styles.container} ${menu && styles.moved}`.trim()}>
      <div className={styles.slider}>
        {
          destinations.map((dest, i) =>
            <Item
              key={dest.id}
              destination={dest}
              length={destinations.length}
              index={i}
            />
          )
        }
      </div>
    </div>
  )
};

export default Carousel;
