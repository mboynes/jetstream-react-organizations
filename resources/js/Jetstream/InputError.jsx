import * as React from 'react';
import { node, string } from 'prop-types';

const InputError = ({ className = '', message = '' }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={className}>
      <p className="text-sm text-red-600">
        { message }
      </p>
    </div>
  );
};

InputError.propTypes = {
  className: string,
  message: node,
};

export default InputError;
