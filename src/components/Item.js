import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/style/Item.module.scss';

const Item = ({ destination, length, index }) => {

  return (
    <Link className={styles.container} to={`/${destination.id}`}>
      <article className={styles.content}>
        <img src={destination.img_url} alt={destination.name} />
        <div className={styles.info}>
          <h3>{destination.name}</h3>
          <p><i className={`fas fa-star ${styles.icon}`}> </i>{destination.favorites_count}</p>
        </div>
      </article>
      <p className={styles.index}>{`${index + 1} / ${length}`}</p>
    </Link>
  )
};

export default Item;
