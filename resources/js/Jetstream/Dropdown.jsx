import * as React from 'react';
import { arrayOf, node, string } from 'prop-types';
import classnames from 'classnames';
import { Transition } from '@headlessui/react';

const Dropdown = ({
  align = 'right',
  content,
  contentClasses = ['py-1', 'bg-white'],
  trigger,
  width = '48',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const closeOnEscape = (e) => {
      if (isOpen && e.keyCode === 27) {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const widthClass = React.useMemo(() => {
    switch (width) {
      case '48':
        return 'w-48';
    }
    return '';
  }, [width]);

  const alignmentClasses = React.useMemo(() => {
    if (align === 'left') {
      return 'origin-top-left left-0';
    } else if (align === 'right') {
      return 'origin-top-right right-0';
    }
    return 'origin-top';
  }, [align]);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen((open) => !open)}>
        {trigger}
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      ) : null}

      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={classnames('absolute z-50 mt-2 rounded-md shadow-lg', widthClass, alignmentClasses)}
          onClick={() => setIsOpen(false)}
        >
          <div className={classnames('rounded-md ring-1 ring-black ring-opacity-5', contentClasses)}>
            {content}
          </div>
        </div>
      </Transition>
    </div>
  );
};

Dropdown.propTypes = {
  align: string,
  content: node,
  contentClasses: arrayOf(string),
  trigger: node,
  width: string,
};

export default Dropdown;
