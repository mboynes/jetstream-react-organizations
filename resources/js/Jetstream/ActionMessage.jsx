import * as React from 'react';
import { bool, node } from 'prop-types';
import { Transition } from '@headlessui/react'

const ActionMessage = ({ on = false, children }) => (
  <div>
    <Transition
      show={on}
      leave="transition ease-in duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="text-sm text-gray-600">
          {children}
      </div>
    </Transition>
  </div>
);

ActionMessage.propTypes = {
  children: node.isRequired,
  on: bool,
};

export default ActionMessage;
