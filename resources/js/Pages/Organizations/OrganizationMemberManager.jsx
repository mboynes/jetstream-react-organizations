/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import * as React from 'react';
import {
  arrayOf, bool, number, shape, string,
} from 'prop-types';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import ActionMessage from '@/Jetstream/ActionMessage';
import ActionSection from '@/Jetstream/ActionSection';
import Button from '@/Jetstream/Button';
import ConfirmationModal from '@/Jetstream/ConfirmationModal';
import DangerButton from '@/Jetstream/DangerButton';
import DialogModal from '@/Jetstream/DialogModal';
import FormSection from '@/Jetstream/FormSection';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Label from '@/Jetstream/Label';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import SectionBorder from '@/Jetstream/SectionBorder';
import useForm from '../../hooks/useForm';
import useSlicedState from '../../hooks/useSlicedState';

const OrganizationMemberManager = ({
  organization,
  availableRoles,
  userPermissions,
}) => {
  const { user: currentUser } = usePage().props;
  const addOrganizationMemberForm = useForm({
    errorBag: 'addOrganizationMember',
    email: '',
    role: null,
  });
  const updateRoleForm = useForm({
    role: null,
  });
  const leaveOrganizationForm = useForm();
  const removeOrganizationMemberForm = useForm();

  const { state, updateState } = useSlicedState({
    currentlyManagingRole: false,
    managingRoleFor: null,
    confirmingLeavingOrganization: false,
    organizationMemberBeingRemoved: null,
  });

  const addOrganizationMember = () => {
    addOrganizationMemberForm.submit(new Promise((resolve) => (
      Inertia.post(
        route('organization-members.store', organization),
        addOrganizationMemberForm.data,
        {
          errorBag: 'addOrganizationMember',
          preserveScroll: true,
          onSuccess: () => {
            resolve('success');
            addOrganizationMemberForm.reset();
          },
          onFinish: () => resolve(),
        }
      )
    )));
  };

  const cancelOrganizationInvitation = (invitation) => {
    Inertia.delete(route('organization-invitations.destroy', invitation), {
      preserveScroll: true,
    });
  };

  const manageRole = (organizationMember) => {
    updateState({
      managingRoleFor: organizationMember,
      currentlyManagingRole: true,
    });
    updateRoleForm.setField('role', organizationMember.membership.role);
  };

  const updateRole = () => {
    updateRoleForm.submit(new Promise((resolve) => (
      Inertia.put(
        route('organization-members.update', [organization, state.managingRoleFor]),
        updateRoleForm.data,
        {
          preserveScroll: true,
          onSuccess: () => updateState({ currentlyManagingRole: false }),
          onFinish: () => resolve(),
        }
      )
    )));
  };

  const confirmLeavingOrganization = () => (
    updateState({ confirmingLeavingOrganization: true })
  );

  const leaveOrganization = () => (
    leaveOrganizationForm.submit(new Promise((resolve) => (
      Inertia.delete(
        route('organization-members.destroy', [organization, currentUser]),
        { onFinish: () => resolve() }
      )
    )))
  );

  const confirmOrganizationMemberRemoval = (organizationMember) => (
    updateState({ organizationMemberBeingRemoved: organizationMember })
  );

  const removeOrganizationMember = () => {
    removeOrganizationMemberForm.submit(new Promise((resolve) => (
      Inertia.delete(
        route('organization-members.destroy', [organization, state.organizationMemberBeingRemoved]),
        {
          errorBag: 'removeOrganizationMember',
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => updateState({ organizationMemberBeingRemoved: null }),
          onFinish: () => resolve(),
        }
      )
    )));
  };

  const displayableRole = (role) => availableRoles.find((r) => r.key === role).name;

  return (
    <div>
      {userPermissions.canAddOrganizationMembers ? (
        <div>
          <SectionBorder />

          {/* Add Organization Member */}
          <FormSection
            onSubmit={addOrganizationMember}
            title="Add Organization Member"
            description="Add a new organization member to your organization, allowing them to collaborate with you."
            form={(
              <>
                <div className="col-span-6">
                  <div className="max-w-xl text-sm text-gray-600">
                    Please provide the email address of the person you would
                    like to add to this organization.
                  </div>
                </div>

                {/* Member Email */}
                <div className="col-span-6 sm:col-span-4">
                  <Label htmlFor="email" value="Email" />
                  <Input
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={addOrganizationMemberForm.data.email}
                    onChange={(value) => addOrganizationMemberForm.setField('email', value)}
                  />
                  <InputError message={addOrganizationMemberForm.errors.email} className="mt-2" />
                </div>

                {availableRoles.length > 0 ? (
                  <div className="col-span-6 lg:col-span-4">
                    {/* Role */}
                    <Label htmlFor="roles" value="Role" />
                    <InputError message={addOrganizationMemberForm.errors.role} className="mt-2" />

                    <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                      {availableRoles.map((role, i) => (
                        <button
                          key={role.key}
                          type="button"
                          className={classnames(
                            'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue',
                            { 'border-t border-gray-200 rounded-t-none': i > 0, 'rounded-b-none': i !== Object.keys(availableRoles).length - 1 }
                          )}
                          onClick={() => addOrganizationMemberForm.setField('role', role.key)}
                        >
                          <div className={classnames({ 'opacity-50': addOrganizationMemberForm.data.role && addOrganizationMemberForm.data.role !== role.key })}>
                            {/* Role Name */}
                            <div className="flex items-center">
                              <div className={classnames('text-sm text-gray-600', { 'font-semibold': addOrganizationMemberForm.data.role === role.key })}>
                                {role.name}
                              </div>

                              {addOrganizationMemberForm.data.role === role.key ? (
                                <svg className="ml-2 h-5 w-5 text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              ) : null}
                            </div>

                            {/* Role Description */}
                            <div className="mt-2 text-xs text-gray-600">
                              {role.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
            actions={(
              <>
                <ActionMessage on={addOrganizationMemberForm.status === 'recentlySuccessful'} className="mr-3">
                  Added.
                </ActionMessage>
                {' '}
                <Button className={classnames({ 'opacity-25': addOrganizationMemberForm.isProcessing })} disabled={addOrganizationMemberForm.isProcessing}>
                  Add
                </Button>
              </>
            )}
          />
        </div>
      ) : null}

      {organization.organization_invitations.length > 0 && userPermissions.canAddOrganizationMembers ? (
        <div>
          <SectionBorder />

          {/* Organization Member Invitations */}
          <ActionSection
            className="mt-10 sm:mt-0"
            title="Pending Organization Invitations"
            description="These people have been invited to your organization and have been sent an invitation email. They may join the organization by accepting the email invitation."
            content={(
              <div className="space-y-6">
                {/* Pending Organization Member Invitation List */}
                {organization.organization_invitations.map((invitation) => (
                  <div className="flex items-center justify-between" key={invitation.id}>
                    <div className="text-gray-600">{invitation.email}</div>

                    <div className="flex items-center">
                      {/* Cancel Organization Invitation */}
                      {userPermissions.canRemoveOrganizationMembers ? (
                        <button
                          type="button"
                          className="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"
                          onClick={() => cancelOrganizationInvitation(invitation)}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      ) : null}

      {organization.users.length > 0 ? (
        <div>
          <SectionBorder />

          {/* Manage Organization Members */}
          <ActionSection
            className="mt-10 sm:mt-0"
            title="Organization Members"
            description="All of the people that are part of this organization."
            content={(
              <div className="space-y-6">
                {organization.users.map((user) => (
                  <div className="flex items-center justify-between" key={user.id}>
                    <div className="flex items-center">
                      <img className="w-8 h-8 rounded-full" src={user.profile_photo_url} alt="" />
                      <div className="ml-4">{user.name}</div>
                    </div>

                    <div className="flex items-center">
                      {/* Manage Organization Member Role */}
                      {userPermissions.canAddOrganizationMembers && availableRoles.length ? (
                        <button
                          type="button"
                          className="ml-2 text-sm text-gray-400 underline"
                          onClick={() => manageRole(user)}
                        >
                          {displayableRole(user.membership.role)}
                        </button>
                      ) : availableRoles.length ? (
                        <div className="ml-2 text-sm text-gray-400">
                          {displayableRole(user.membership.role)}
                        </div>
                      ) : null}

                      {/* Leave Organization */}
                      {currentUser.id === user.id ? (
                        <button
                          type="button"
                          className="cursor-pointer ml-6 text-sm text-red-500"
                          onClick={confirmLeavingOrganization}
                        >
                          Leave
                        </button>
                      ) : null}

                      {/* Remove Organization Member */}
                      {userPermissions.canRemoveOrganizationMembers ? (
                        <button
                          type="button"
                          className="cursor-pointer ml-6 text-sm text-red-500"
                          onClick={() => confirmOrganizationMemberRemoval(user)}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      ) : null}

      {/* Role Management Modal */}
      <DialogModal
        show={state.currentlyManagingRole}
        close={() => updateState({ currentlyManagingRole: false })}
        title="Manage Role"
        content={(
          <>
            {state.managingRoleFor ? (
              <div>
                <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                  {availableRoles.map((role, i) => (
                    <button
                      type="button"
                      className={classnames(
                        'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue',
                        { 'border-t border-gray-200 rounded-t-none': i > 0, 'rounded-b-none': i !== Object.keys(availableRoles).length - 1 }
                      )}
                      onClick={() => updateRoleForm.setField('role', role.key)}
                      key={role.key}
                    >
                      <div className={classnames({ 'opacity-50': updateRoleForm.role && updateRoleForm.data.role !== role.key })}>
                        {/* Role Name */}
                        <div className="flex items-center">
                          <div className={classnames('text-sm text-gray-600', { 'font-semibold': updateRoleForm.data.role === role.key })}>
                            {role.name}
                          </div>

                          {updateRoleForm.data.role === role.key ? (
                            <svg className="ml-2 h-5 w-5 text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          ) : null}
                        </div>

                        {/* Role Description */}
                        <div className="mt-2 text-xs text-gray-600">
                          {role.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
        footer={(
          <>
            <SecondaryButton onClick={() => updateState({ currentlyManagingRole: false })}>
              Never Mind
            </SecondaryButton>
            {' '}
            <Button onClick={updateRole} className={classnames('ml-2', { 'opacity-25': updateRoleForm.isProcessing })} disabled={updateRoleForm.isProcessing}>
              Save
            </Button>
          </>
        )}
      />

      {/* Leave Organization Confirmation Modal */}
      <ConfirmationModal
        show={state.confirmingLeavingOrganization}
        close={() => updateState({ confirmingLeavingOrganization: false })}
        title="Leave Organization"
        content="Are you sure you would like to leave this organization?"
        footer={(
          <>
            <SecondaryButton onClick={() => updateState({ confirmingLeavingOrganization: false })}>
              Never Mind
            </SecondaryButton>
            {' '}
            <DangerButton
              onClick={leaveOrganization}
              className={classnames('ml-2', { 'opacity-25': leaveOrganizationForm.isProcessing })}
              disabled={leaveOrganizationForm.isProcessing}
            >
              Leave
            </DangerButton>
          </>
        )}
      />

      {/* Remove Organization Member Confirmation Modal */}
      <ConfirmationModal
        show={!!state.organizationMemberBeingRemoved}
        close={() => updateState({ organizationMemberBeingRemoved: null })}
        title="Remove Organization Member"
        content="Are you sure you would like to remove this person from the organization?"
        footer={(
          <>
            <SecondaryButton onClick={() => updateState({ organizationMemberBeingRemoved: null })}>
              Never Mind
            </SecondaryButton>

            <DangerButton
              onClick={removeOrganizationMember}
              className={classnames('ml-2', { 'opacity-25': removeOrganizationMemberForm.isProcessing })}
              disabled={removeOrganizationMemberForm.isProcessing}
            >
              Remove
            </DangerButton>
          </>
        )}
      />
    </div>
  );
};

OrganizationMemberManager.propTypes = {
  organization: shape({
    organization_invitations: arrayOf(shape({
      id: number,
      email: string,
    })),
    users: arrayOf(shape({
      id: number,
      name: string,
      profile_photo_url: string,
      membership: shape({
        role: string,
      }),
    })),
  }).isRequired,
  availableRoles: arrayOf(shape({
    key: string,
    name: string,
    description: string,
  })).isRequired,
  userPermissions: shape({
    canAddOrganizationMembers: bool,
    canRemoveOrganizationMembers: bool,
  }).isRequired,
};

export default OrganizationMemberManager;
