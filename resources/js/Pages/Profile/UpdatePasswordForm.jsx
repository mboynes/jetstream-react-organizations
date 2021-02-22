import * as React from 'react';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';

import useForm from '@/hooks/useForm';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Button from '@/Jetstream/Button';
import ActionMessage from '@/Jetstream/ActionMessage';

const UpdatePasswordForm = (props) => {
  const {
    data,
    isProcessing,
    status,
    submit,
    reset,
    useField,
    errors,
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [currentPassword, setCurrentPassword] = useField('current_password');
  const [password, setPassword] = useField('password');
  const [passwordConfirmation, setPasswordConfirmation] = useField('password_confirmation');
  const passwordRef = React.useRef(null);
  const currentPasswordRef = React.useRef(null);

  const updatePassword = () => {
    submit(new Promise((resolve) => {
      Inertia.put(route('user-password.update'), data, {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => {
          resolve('success');
          reset();
        },
        onError: () => {
          if (errors?.updatePassword?.password) {
            reset('password', 'password_confirmation');
            passwordRef.current.focus();
          }

          if (errors?.updatePassword?.current_password) {
            reset('current_password');
            currentPasswordRef.current.focus();
          }
        },
      });
    }));
  };

  return (
    <FormSection
      {...props}
      onSubmit={updatePassword}
      title="Update Password"
      description="Ensure your account is using a long, random password to stay secure."
      form={(
        <>
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="current_password" value="Current Password" />
            <Input
              fieldRef={currentPasswordRef}
              id="current_password"
              type="password"
              className="mt-1 block w-full"
              value={currentPassword}
              onChange={(value) => setCurrentPassword(value)}
              autoComplete="current-password"
            />
            <InputError message={errors?.updatePassword?.current_password} className="mt-2" />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="password" value="New Password" />
            <Input
              fieldRef={passwordRef}
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={password}
              onChange={(value) => setPassword(value)}
              autoComplete="new-password"
            />
            <InputError message={errors?.updatePassword?.password} className="mt-2" />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="password_confirmation" value="Confirm Password" />
            <Input
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full"
              value={passwordConfirmation}
              onChange={(value) => setPasswordConfirmation(value)}
              autoComplete="new-password"
            />
            <InputError message={errors?.updatePassword?.password_confirmation} className="mt-2" />
          </div>
        </>
      )}
      actions={(
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
      )}
    />
  );
};

export default UpdatePasswordForm;
