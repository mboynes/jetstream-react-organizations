import * as React from 'react';
import { bool, func, node, string } from 'prop-types';
import { Transition } from '@headlessui/react';

const Modal = ({
  show = false,
  maxWidth = '2xl',
  closeable = true,
  children,
  close = () => null,
}) => {
  const maxWidthClass = React.useMemo(() => (
    {
      'sm': 'sm:max-w-sm',
      'md': 'sm:max-w-md',
      'lg': 'sm:max-w-lg',
      'xl': 'sm:max-w-xl',
      '2xl': 'sm:max-w-2xl',
    }[maxWidth]
  ), [maxWidth]);

  return (
    <Transition leave="duration-200" show={show}>
      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {show ? (
          <div className="fixed inset-0 transform transition-all" onClick={() => (closeable && close())}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        ) : null}
      </Transition.Child>

      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        {show ? (
          <div className={`${maxWidthClass} mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto`}>
            {children}
          </div>
        ) : null}
      </Transition.Child>
    </Transition>
  );
};

Modal.propTypes = {
  show: bool,
  maxWidth: string,
  closeable: bool,
  children: node.isRequired,
  close: func,
};

export default Modal;
