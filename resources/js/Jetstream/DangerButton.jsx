import * as React from 'react';
import { node, string } from 'prop-types';
import classnames from 'classnames';

const Button = ({ type = 'button', className = '', ...props }) => {
  const mergedClasses = classnames(
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'py-2',
    'bg-red-600',
    'border',
    'border-transparent',
    'rounded-md',
    'font-semibold',
    'text-xs',
    'text-white',
    'uppercase',
    'tracking-widest',
    'hover:bg-red-500',
    'focus:outline-none',
    'focus:border-red-700',
    'focus:shadow-outline-red',
    'active:bg-red-600',
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
