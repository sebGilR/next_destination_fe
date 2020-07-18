import React, { useState } from 'react';
import styles from '../assets/style/DestForm.module.scss';

const DestinationForm = ({ dest, newD, handleClose, handleSubmit }) => {
  const [name, setName] = useState(newD ? '' : dest.name);
  const [description, setDescription] = useState(newD ? '' : dest.description);
  const [image, setImage] = useState(newD ? '' : dest.img_url);

  const handleChange = e => {
    const name = e.target.name
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
      onSubmit={() =>
        handleSubmit(name, description, image, newD ? null : dest.id)
      }
      className={styles.form}
    >
      <i
        className={`fas fa-times ${styles.close}`.trim()}
        onClick={handleClose}
      ></i>
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
  )
}

export default DestinationForm;
