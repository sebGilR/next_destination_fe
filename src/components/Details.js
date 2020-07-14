import React from 'react';

const Details = props => {

  return (
    <>
      <section>
        <div>
          <img src="https://picsum.photos/300/280" alt="Img" />
          <span>Favorites count</span>
        </div>
        <div>
          <h2>About this destination</h2>
          <p>Descrition goes here.</p>
        </div>
        <button>Save to favorites</button>
      </section>
    </>
  )
};

export default Details;
