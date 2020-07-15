import React from 'react';
import { useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

const Details = props => {
  const { id } = useParams();
  const destination = useSelector(state =>
    state.destinations.find(e => e.id === parseInt(id))
  )
  console.log(destination)
  return (
    <>
      <section>
        <div>
          <img src="https://picsum.photos/300/280" alt="Img" />
          <span>{destination.favorites_count}</span>
        </div>
        <div>
          <h2>About this destination</h2>
          <p>{destination.description}</p>
        </div>
        <button>Save to favorites</button>
      </section>
    </>
  )
};

export default Details;
