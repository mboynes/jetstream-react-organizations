import * as React from 'react';
import { func, string } from 'prop-types';

const Input = ({ value = '', onChange, ...props }) => (
  <input
    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
);

Input.propTypes = {
  value: string,
  onChange: func.isRequired,
};

export default Input;
