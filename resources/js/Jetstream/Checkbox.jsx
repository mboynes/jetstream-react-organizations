import * as React from 'react';
import { bool, func, string } from 'prop-types';

const Checkbox = ({ checked, onChange, ...props }) => (
  <input
    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    {...props}
  />
);

Checkbox.propTypes = {
  checked: bool.isRequired,
  onChange: func.isRequired,
};

export default Checkbox;
