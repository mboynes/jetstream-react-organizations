import * as React from 'react';
import PropTypes, { node, string } from 'prop-types';
import classnames from 'classnames';

const Label = ({
  value = '',
  children = '',
  className = '',
  ...props
}) => {
  const mergedClasses = React.useMemo(
    () => classnames(
      'block font-medium text-sm text-gray-700',
      className
    ),
    [className]
  );

  return (
    <label className={mergedClasses} {...props}>
      <span>
        {!!value ? value : children}
      </span>
    </label>
  );
};

Label.propTypes = {
  value: string,
  children: node,
  className: string,
};

export default Label;
