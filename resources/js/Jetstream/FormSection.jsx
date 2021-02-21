import * as React from 'react';
import { func, node, string } from 'prop-types';
import classnames from 'classnames';
import SectionTitle from './SectionTitle';

const FormSection = ({
  title = '',
  description = '',
  form,
  actions = '',
  onSubmit,
  className = '',
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={classnames('md:grid md:grid-cols-3 md:gap-6', className)}>
      <SectionTitle title={title} description={description} />

      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={submitHandler}>
          <div
            className={classnames(
              'px-4 py-5 bg-white sm:p-6 shadow',
              actions === '' ? 'sm:rounded-md' : 'sm:rounded-tl-md sm:rounded-tr-md',
            )}
          >
            <div className="grid grid-cols-6 gap-6">
              {form}
            </div>
          </div>

          {actions ? (
            <div className="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
              {actions}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

FormSection.propTypes = {
  title: node,
  description: node,
  form: node.isRequired,
  actions: node,
  onSubmit: func.isRequired,
  className: string,
};

export default FormSection;
