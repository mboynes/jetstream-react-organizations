import * as React from 'react';
import { node, string } from 'prop-types';
import { InertiaLink } from '@inertiajs/inertia-react';

const DropdownLink = ({ href, as = 'link', children }) => {
  return (
    <div>
      {as === 'button' ? (
        <button type="submit" className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
          {children}
        </button>
      ) : (
        <InertiaLink href={href} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
          {children}
        </InertiaLink>
      )}
    </div>
  );
};

DropdownLink.propTypes = {
  href: string.isRequired,
  as: string,
  children: node,
};

export default DropdownLink;
