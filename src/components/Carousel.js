import React from 'react';
import Item from './Item';

const Carousel = ({ destinations }) => {
  console.log(destinations)
  return (
    <div>
      <div>
        {
          destinations.map(dest => <Item key={dest.id} destination={dest} />)
        }
      </div>
      <p>nth/n</p>
    </div>
  )
};

export default Carousel;
