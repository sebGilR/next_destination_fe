import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../assets/style/DestForm.module.scss';

const DestinationForm = ({
  dest, newD, handleClose, handleSubmit,
}) => {
  const [name, setName] = useState(newD ? '' : dest.name);
  const [description, setDescription] = useState(newD ? '' : dest.description);
  const [image, setImage] = useState(newD ? '' : dest.img_url);

  const handleChange = e => {
    const { name } = e.target;
    if (name === 'name') {
      setName(e.target.value);
    } else if (name === 'description') {
      setDescription(e.target.value);
    } else {
      setImage(e.target.value);
    }
  };

  return (
    <form
      onSubmit={() => handleSubmit(name, description, image, newD ? null : dest.id)}
      className={styles.form}
    >
      <i
        className={`fas fa-times ${styles.close}`.trim()}
        onClick={handleClose}
        onKeyPress={handleClose}
        role="presentation"
      />
      <h3>{newD ? 'New destination' : 'Edit destination'}</h3>
      <input
        className={styles.input}
        onChange={handleChange}
        type="text"
        placeholder="Name"
        name="name"
        value={name}
      />
      <textarea
        className={styles.text}
        onChange={handleChange}
        placeholder="Write a description for this destination"
        name="description"
        value={description}
      />
      <input
        className={styles.input}
        onChange={handleChange}
        type="url"
        placeholder="https://imageurl.com/example.png"
        name="image"
        value={image}
      />
      <button type="submit" className={styles.button}>Save</button>
    </form>
  );
};

DestinationForm.propTypes = {
  dest: PropTypes.objectOf(Object).isRequired,
  newD: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default DestinationForm;
