import * as React from 'react';
import { bool, shape, string } from 'prop-types';
import classnames from 'classnames';
import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Button from '@/Jetstream/Button';
import useForm from '@/hooks/useForm';

const UpdateOrganizationNameForm = ({
  organization,
  permissions,
}) => {
  const { status, submit, useField, errors } = useForm({
    name: organization.name,
  });
  const isProcessing = status === 'processing';
  const [name, setName] = useField('name');

  const updateOrganizationName = () => {
    submit(new Promise((resolve) => {
      Inertia.post(route('organizations.update', organization), data, {
        errorBag: 'updateOrganizationName',
        preserveScroll: true,
        onSuccess: () => {
          resolve('success');
        },
        onFinish: () => {
          // TODO: what happens if this is resolved twice?
          resolve();
        },
      });
    }));
  };

  return (
    <FormSection
      onSubmit={updateOrganizationName}
      title="Organization Name"
      description="The organization's name and owner information."
      form={(
        <>
          {/* Organization Owner Information */}
          <div className="col-span-6">
            <Label value="Organization Owner" />

            <div className="flex items-center mt-2">
              <img className="w-12 h-12 rounded-full object-cover" src={organization.owner.profile_photo_url} alt="" />

              <div className="ml-4 leading-tight">
                <div>{organization.owner.name}</div>
                <div className="text-gray-700 text-sm">{organization.owner.email}</div>
              </div>
            </div>
          </div>

          {/* Organization Name */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="name" value="Organization Name" />
            <Input
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={name}
              onChange={(value) => setName(value)}
              disabled={!permissions.canUpdateOrganization}
            />
            <InputError message={errors?.updateOrganizationName?.name} className="mt-2" />
          </div>
        </>
      )}
      actions={permissions.canUpdateOrganization ? (
        <>
          <ActionMessage on={status === 'recentlySuccessful'} className="mr-3">
            Saved.
          </ActionMessage>
          {' '}
          <Button
            className={classnames({ 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Save
          </Button>
        </>
      ) : null}
    />
  );
};

UpdateOrganizationNameForm.propTypes = {
  organization: shape({
    name: string,
    owner: shape({
      name: string,
      email: string,
      profile_photo_url: string,
    }),
  }),
  permissions: shape({
    canUpdateOrganization: bool,
  }),
};

export default UpdateOrganizationNameForm;
