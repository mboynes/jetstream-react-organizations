import * as React from 'react';
import { node, string } from 'prop-types';
import classnames from 'classnames';

const SecondaryButton = ({ type = 'button', className = '', ...props }) => {
  const mergedClasses = classnames(
    'inline-flex',
    'items-center',
    'px-4',
    'py-2',
    'bg-white',
    'border',
    'border-gray-300',
    'rounded-md',
    'font-semibold',
    'text-xs',
    'text-gray-700',
    'uppercase',
    'tracking-widest',
    'shadow-sm',
    'hover:text-gray-500',
    'focus:outline-none',
    'focus:border-blue-300',
    'focus:shadow-outline-blue',
    'active:text-gray-800',
    'active:bg-gray-50',
    'transition',
    'ease-in-out',
    'duration-150',
    className
  );

  return (
    <button type={type} className={mergedClasses} {...props} />
  );
};

SecondaryButton.propTypes = {
  type: string,
  className: string,
};

export default SecondaryButton;
