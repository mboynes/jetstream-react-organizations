import * as React from 'react';
import { node, string } from 'prop-types';
import classnames from 'classnames';

const Label = ({
  htmlFor,
  value = '',
  children = '',
  className = '',
  ...props
}) => {
  const mergedClasses = React.useMemo(
    () => classnames(
      'block font-medium text-sm text-gray-700',
      className,
    ),
    [className],
  );

  return (
    <label htmlFor={htmlFor} className={mergedClasses} {...props}>
      <span>
        {value || children}
      </span>
    </label>
  );
};

Label.propTypes = {
  htmlFor: string.isRequired,
  value: string,
  children: node,
  className: string,
};

export default Label;
