import * as React from 'react';
import { func, object, string } from 'prop-types';

const Input = ({
  value = '', onChange, fieldRef: ref = null, ...props
}) => (
  <input
    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...(ref ? { ref } : {})}
    {...props}
  />
);

Input.propTypes = {
  value: string,
  onChange: func.isRequired,
  fieldRef: object,
};

export default Input;
