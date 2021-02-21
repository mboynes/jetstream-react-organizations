import * as React from 'react';
import { node, string } from 'prop-types';
import classnames from 'classnames';
import SectionTitle from './SectionTitle';

const ActionSection = ({
  title = '',
  description = '',
  content = '',
  className = '',
}) => (
  <div className={classnames('md:grid md:grid-cols-3 md:gap-6', className)}>
    <SectionTitle title={title} description={description} />

    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
        {content}
      </div>
    </div>
  </div>
);

ActionSection.propTypes = {
  title: node,
  description: node,
  content: node,
  className: string,
};

export default ActionSection;
