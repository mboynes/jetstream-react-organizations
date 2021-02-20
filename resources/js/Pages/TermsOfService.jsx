import * as React from 'react';
import { string } from 'prop-types';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';

const TermsOfService = ({ terms }) => {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="pt-4 bg-gray-100">
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
          <div>
            <AuthenticationCardLogo />
          </div>

          <div
            className="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        </div>
      </div>
    </div>
  );
};

TermsOfService.propTypes = {
  terms: string,
};

export default TermsOfService;
