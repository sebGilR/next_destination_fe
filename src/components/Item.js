import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ destination }) => {

  return (
    <Link to={`/${destination.id}`}>
      <article>
        <img src="https://picsum.photos/300/450" alt="Img" />
        <h3>{destination.name}</h3>
        <p>{destination.favorites_count}</p>
      </article>
    </Link>
  )
};

export default Item;
