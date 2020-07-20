import React from 'react';
import styles from '../assets/style/Login.module.scss';

const Input = props => (
  <input
    className={styles.input}
    {...props}
  />
)

export default Input;
