import * as React from 'react';
import { bool, shape } from 'prop-types';
import AppLayout from '@/Layouts/AppLayout';
import SectionBorder from '@/Jetstream/SectionBorder';
import DeleteOrganizationForm from './DeleteOrganizationForm';
import OrganizationMemberManager from './OrganizationMemberManager';
import UpdateOrganizationNameForm from './UpdateOrganizationNameForm';

const Show = ({
  organization,
  availableRoles,
  permissions,
}) => {
  return (
    <AppLayout
      header={(
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Organization Settings
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <UpdateOrganizationNameForm organization={organization} permissions={permissions} />

          <OrganizationMemberManager
            className="mt-10 sm:mt-0"
            organization={organization}
            availableRoles={availableRoles}
            userPermissions={permissions}
          />

          {permissions.canDeleteOrganization && ! organization.personal_organization ? (
            <>
              <SectionBorder />
              <DeleteOrganizationForm className="mt-10 smmt-0" organization={organization} />
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
};

Show.propTypes = {
  organization: shape({
    personal_organization: bool,
  }).isRequired,
  // availableRoles:
  permissions: shape({
    canDeleteOrganization: bool,
  }),
};

export default Show;
