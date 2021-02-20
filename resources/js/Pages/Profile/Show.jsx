import * as React from 'react';
import { arrayOf } from 'prop-types';
import { usePage } from '@inertiajs/inertia-react';

import AppLayout from '@/Layouts/AppLayout'
import SectionBorder from '@/Jetstream/SectionBorder'
import DeleteUserForm from './DeleteUserForm'
import LogoutOtherBrowserSessionsForm from './LogoutOtherBrowserSessionsForm'
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateProfileInformationForm from './UpdateProfileInformationForm'

const Show = ({ sessions }) => {
  const { jetstream, user } = usePage().props;
  return (
    <AppLayout
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {jetstream.canUpdateProfileInformation ? (
            <div>
                <UpdateProfileInformationForm user={user} />

                <SectionBorder />
            </div>
          ) : null}

          {jetstream.canUpdatePassword ? (
            <div>
                <UpdatePasswordForm className="mt-10 sm:mt-0" />

                <SectionBorder />
            </div>
          ) : null}

          {jetstream.canManageTwoFactorAuthentication ? (
            <div>
                <TwoFactorAuthenticationForm className="mt-10 sm:mt-0" />

                <SectionBorder />
            </div>
          ) : null}

          <LogoutOtherBrowserSessionsForm sessions={sessions} className="mt-10 sm:mt-0" />

          {jetstream.hasAccountDeletionFeatures ? (
            <>
              <SectionBorder />

              <DeleteUserForm className="mt-10 sm:mt-0" />
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
};

Show.propTypes = {
  sessions: arrayOf().isRequired,
};

export default Show;
