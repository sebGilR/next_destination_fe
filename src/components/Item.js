import React from 'react';

const Item = ({ destination }) => {

  return (
    <article>
      <img src="https://picsum.photos/300/450" alt="Img" />
      <h3>{destination.name}</h3>
      <p>{destination.favorites_count}</p>
    </article>
  )
};

export default Item;
