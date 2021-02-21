import * as React from 'react';
import {
  bool, func, node, string,
} from 'prop-types';
import Modal from './Modal';

const DialogModal = ({
  show = false,
  maxWidth = '2xl',
  closeable = true,
  title = '',
  content = '',
  footer = '',
  close = () => null,
}) => (
  <Modal show={show} maxWidth={maxWidth} closeable={closeable} close={close}>
    <div className="px-6 py-4">
      <div className="text-lg">
        {title}
      </div>

      <div className="mt-4">
        {content}
      </div>
    </div>

    <div className="px-6 py-4 bg-gray-100 text-right">
      {footer}
    </div>
  </Modal>
);

DialogModal.propTypes = {
  show: bool,
  maxWidth: string,
  closeable: bool,
  title: node,
  content: node,
  footer: node,
  close: func,
};

export default DialogModal;
