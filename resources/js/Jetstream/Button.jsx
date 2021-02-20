import * as React from 'react';
import { node, string } from 'prop-types';
import classnames from 'classnames';

const Button = ({ type = 'submit', className = '', ...props }) => {
  const mergedClasses = classnames(
    'inline-flex',
    'items-center',
    'px-4',
    'py-2',
    'bg-gray-800',
    'border',
    'border-transparent',
    'rounded-md',
    'font-semibold',
    'text-xs',
    'text-white',
    'uppercase',
    'tracking-widest',
    'hover:bg-gray-700',
    'active:bg-gray-900',
    'focus:outline-none',
    'focus:border-gray-900',
    'focus:shadow-outline-gray',
    'transition',
    'ease-in-out',
    'duration-150',
    className
  );

  return (
    <button type={type} className={mergedClasses} {...props} />
  );
};

Button.propTypes = {
  type: string,
  className: string,
};

export default Button;
