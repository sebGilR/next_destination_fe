import React from 'react';
import PropTypes from 'prop-types';
import styles from '../assets/style/Login.module.scss';

const Input = ({
  type, name, value, placeholder, onChange,
}) => (
  <input
    className={styles.input}
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
