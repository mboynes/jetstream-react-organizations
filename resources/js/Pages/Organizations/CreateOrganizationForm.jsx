import * as React from 'react';
import classnames from 'classnames';
import { usePage } from '@inertiajs/inertia-react';
import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Button from '@/Jetstream/Button';
import useForm from '@/hooks/useForm';
import { Inertia } from '@inertiajs/inertia';

const CreateOrganizationForm = () => {
  const { user, errors } = usePage().props;
  const {
    data, status, submit, useField,
  } = useForm({
    name: '',
  });
  const isProcessing = status === 'processing';
  const [name, setName] = useField('name');

  const createOrganization = () => {
    submit(new Promise((resolve) => {
      Inertia.post(route('organizations.store'), data, {
        errorBag: 'createOrganization',
        preserveScroll: true,
        onError: () => resolve(),
      });
    }));
  };

  return (
    <FormSection
      onSubmit={createOrganization}
      title="Organization Details"
      description="Create a new organization to collaborate with others on projects."
      form={(
        <>
          <div className="col-span-6">
            <span className="block font-medium text-sm text-gray-700">
              Organization Owner
            </span>

            <div className="flex items-center mt-2">
              <img className="w-12 h-12 rounded-full object-cover" src={user.profile_photo_url} alt="" />

              <div className="ml-4 leading-tight">
                <div>{user.name}</div>
                <div className="text-gray-700 text-sm">{user.email}</div>
              </div>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="name" value="Organization Name" />
            <Input
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={name}
              onChange={(value) => setName(value)}
              autoFocus
            />
            <InputError message={errors?.createOrganization?.name} className="mt-2" />
          </div>
        </>
      )}
      actions={(
        <Button
          className={classnames({ 'opacity-25': isProcessing })}
          disabled={isProcessing}
        >
          Create
        </Button>
      )}
    />
  );
};

export default CreateOrganizationForm;
