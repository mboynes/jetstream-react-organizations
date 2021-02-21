import * as React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { string } from 'prop-types';

const ValidationErrors = ({ className = '' }) => {
  const { errors } = usePage().props;
  if (!errors || !Object.keys(errors).length) {
    return null;
  }

  return (
    <div className={className}>
      <div className="font-medium text-red-600">Whoops! Something went wrong.</div>

      <ul className="mt-3 list-disc list-inside text-sm text-red-600">
        {Object.keys(errors).map((key) => (
          <li key={key}>{errors[key]}</li>
        ))}
      </ul>
    </div>
  );
};

ValidationErrors.propTypes = {
  className: string,
};

export default ValidationErrors;
