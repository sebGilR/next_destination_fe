import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../assets/style/Item.module.scss';

const Item = ({ destination, length, index }) => (
  <div className={styles.container}>
    <Link to={`/${destination.id}`}>
      <article className={styles.content}>
        <img src={destination.img_url} alt={destination.name} />
        <div className={styles.info}>
          <h3>{destination.name}</h3>
          <p>
            <i className={`fas fa-star ${styles.icon}`}> </i>
            {destination.favorites_count}
          </p>
        </div>
      </article>

    </Link>
    <p className={styles.index}>{`${index + 1} / ${length}`}</p>
  </div>

);

Item.propTypes = {
  destination: PropTypes.objectOf(Object).isRequired,
  length: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Item;
