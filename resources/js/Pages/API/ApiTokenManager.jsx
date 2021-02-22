/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  arrayOf, number, shape, string,
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
import Checkbox from '@/Jetstream/Checkbox';
import InputError from '@/Jetstream/InputError';
import Label from '@/Jetstream/Label';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import SectionBorder from '@/Jetstream/SectionBorder';
import useForm from '@/hooks/useForm';
import useSlicedState from '@/hooks/useSlicedState';

const ApiTokenManager = ({
  tokens,
  availablePermissions,
  defaultPermissions,
}) => {
  const { jetstream } = usePage().props;

  const createApiTokenForm = useForm({
    errorBag: 'createApiToken',
    name: '',
    permissions: defaultPermissions,
  });

  const updateApiTokenForm = useForm({
    permissions: [],
  });

  const deleteApiTokenForm = useForm();

  const { state, updateState } = useSlicedState({
    displayingToken: false,
    managingPermissionsFor: null,
    apiTokenBeingDeleted: null,
  });

  const createApiToken = () => (
    createApiTokenForm.submit(new Promise((resolve) => (
      Inertia.post(
        route('api-tokens.store'),
        createApiTokenForm.data,
        {
          preserveScroll: true,
          errorBag: 'createApiToken',
          onSuccess: () => {
            updateState({ displayingToken: true });
            createApiTokenForm.reset();
          },
          onFinish: resolve,
        }
      )
    )))
  );

  const manageApiTokenPermissions = (token) => {
    updateApiTokenForm.setField('permissions', token.abilities);
    updateState({ managingPermissionsFor: token });
  };

  const updateApiToken = () => (
    updateApiTokenForm.submit(new Promise((resolve) => (
      Inertia.put(
        route('api-tokens.update', state.managingPermissionsFor),
        updateApiTokenForm.data,
        {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => updateState({ managingPermissionsFor: null }),
          onFinish: resolve,
        }
      )
    )))
  );

  const confirmApiTokenDeletion = (token) => (
    updateState({ apiTokenBeingDeleted: token })
  );

  const deleteApiToken = () => (
    deleteApiTokenForm.submit(new Promise((resolve) => (
      Inertia.delete(route('api-tokens.destroy', state.apiTokenBeingDeleted), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => updateState({ apiTokenBeingDeleted: null }),
        onFinish: resolve,
      })
    )))
  );

  const isChecked = (value, comparand) => {
    if (Array.isArray(comparand)) {
      return comparand.includes(value);
    }
    return comparand === value;
  };

  const checkboxArrayChangeHandler = (value, values, stateHandler) => (checked) => {
    if (checked) {
      stateHandler(values.includes(value) ? values : [...values, value]);
    } else {
      const index = values.indexOf(value);
      stateHandler(index === -1 ? values : [...values.slice(0, index), ...values.slice(index + 1)]);
    }
  };

  return (
    <div>
      {/* Generate API Token */}
      <FormSection
        onSubmit={createApiToken}
        title="Create API Token"
        description="API tokens allow third-party services to authenticate with our application on your behalf."
        form={(
          <>
            {/* Token Name */}
            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="name" value="Name" />
              <Input
                id="name"
                type="text"
                className="mt-1 block w-full"
                value={createApiTokenForm.data.name}
                onChange={(value) => createApiTokenForm.setField('name', value)}
                autoFocus
              />
              <InputError message={createApiTokenForm.errors.name} className="mt-2" />
            </div>

            {/* Token Permissions */}
            {availablePermissions.length > 0 ? (
              <div className="col-span-6">
                <Label htmlFor="permissions" value="Permissions" />

                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePermissions.map((permission) => (
                    <div key={permission}>
                      <label className="flex items-center">
                        <Checkbox
                          value={permission}
                          checked={isChecked(permission, createApiTokenForm.data.permissions)}
                          onChange={checkboxArrayChangeHandler(
                            permission,
                            createApiTokenForm.data.permissions,
                            (newValue) => createApiTokenForm.setField('permissions', newValue)
                          )}
                        />
                        <span className="ml-2 text-sm text-gray-600">{permission}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
        actions={(
          <>
            <ActionMessage on={createApiTokenForm.data.recentlySuccessful} className="mr-3">
              Created.
            </ActionMessage>
            {' '}
            <Button
              className={classnames({ 'opacity-25': createApiTokenForm.isProcessing })}
              disabled={createApiTokenForm.isProcessing}
            >
              Create
            </Button>
          </>
        )}
      />

      {tokens.length > 0 ? (
        <div>
          <SectionBorder />

          {/* Manage API Tokens */}
          <div className="mt-10 sm:mt-0">
            <ActionSection
              title="Manage API Tokens"
              description="You may delete any of your existing tokens if they are no longer needed."
              content={(
                <div className="space-y-6">
                  {/* API Token List */}
                  {tokens.map((token) => (
                    <div className="flex items-center justify-between" key={token.id}>
                      <div>
                        {token.name}
                      </div>

                      <div className="flex items-center">
                        {token.last_used_ago ? (
                          <div className="text-sm text-gray-400">
                            {`Last used ${token.last_used_ago}`}
                          </div>
                        ) : null}

                        {availablePermissions.length > 0 ? (
                          <button
                            type="button"
                            className="cursor-pointer ml-6 text-sm text-gray-400 underline"
                            onClick={() => manageApiTokenPermissions(token)}
                          >
                            Permissions
                          </button>
                        ) : null}

                        <button
                          type="button"
                          className="cursor-pointer ml-6 text-sm text-red-500"
                          onClick={() => confirmApiTokenDeletion(token)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      ) : null}

      {/* Token Value Modal */}
      <DialogModal
        show={state.displayingToken}
        close={() => updateState({ displayingToken: false })}
        title="API Token"
        content={(
          <>
            <div>
              Please copy your new API token. For your security, it won&apos;t be shown again.
            </div>

            {jetstream.flash.token ? (
              <div className="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500">
                {jetstream.flash.token}
              </div>
            ) : null}
          </>
        )}
        footer={(
          <SecondaryButton onClick={() => updateState({ displayingToken: false })}>
            Close
          </SecondaryButton>
        )}
      />

      {/* API Token Permissions Modal */}
      <DialogModal
        show={!!state.managingPermissionsFor}
        close={() => updateState({ managingPermissionsFor: null })}
        title="API Token Permissions"
        content={(
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map((permission) => (
              <div key={permission}>
                <label className="flex items-center">
                  <Checkbox
                    value={permission}
                    checked={isChecked(permission, updateApiTokenForm.data.permissions)}
                    onChange={checkboxArrayChangeHandler(
                      permission,
                      updateApiTokenForm.data.permissions,
                      (newValue) => updateApiTokenForm.setField('permissions', newValue)
                    )}
                  />
                  <span className="ml-2 text-sm text-gray-600">{permission}</span>
                </label>
              </div>
            ))}
          </div>
        )}
        footer={(
          <>
            <SecondaryButton onClick={() => updateState({ managingPermissionsFor: null })}>
              Never Mind
            </SecondaryButton>
            {' '}
            <Button
              onClick={updateApiToken}
              className={classnames('ml-2', { 'opacity-25': updateApiTokenForm.isProcessing })}
              disabled={updateApiTokenForm.isProcessing}
            >
              Save
            </Button>
          </>
        )}
      />

      {/* Delete Token Confirmation Modal */}
      <ConfirmationModal
        show={!!state.apiTokenBeingDeleted}
        close={() => updateState({ apiTokenBeingDeleted: null })}
        title="Delete API Token"
        content="Are you sure you would like to delete this API token?"
        footer={(
          <>
            <SecondaryButton onClick={() => updateState({ apiTokenBeingDeleted: null })}>
              Never Mind
            </SecondaryButton>
            {' '}
            <DangerButton
              onClick={deleteApiToken}
              className={classnames('ml-2', { 'opacity-25': deleteApiTokenForm.isProcessing })}
              disabled={deleteApiTokenForm.isProcessing}
            >
              Delete
            </DangerButton>
          </>
        )}
      />
    </div>
  );
};

ApiTokenManager.propTypes = {
  tokens: arrayOf(shape({
    id: number,
    name: string,
    last_used_ago: string,
    abilities: arrayOf(string),
  })),
  availablePermissions: arrayOf(string),
  defaultPermissions: arrayOf(string),
};

export default ApiTokenManager;
