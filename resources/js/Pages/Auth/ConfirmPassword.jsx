import * as React from 'react';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Input from '@/Jetstream/Input';
import Label from '@/Jetstream/Label';
import Button from '@/Jetstream/Button';
import useForm from '@/hooks/useForm';

const ConfirmPassword = () => {
  const {
    data, useField, status, submit,
  } = useForm({ password: '' });
  const isProcessing = status === 'processing';
  const [password, setPassword] = useField('password');

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('password.confirm'), data, {
        onFinish: () => resolve('reset'),
      });
    }));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        <div>
          <Label htmlFor="password" value="Password" />
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={password}
            onChange={(value) => setPassword(value)}
            required
            autoComplete="current-password"
            autoFocus
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className={classnames('ml-4', { 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Confirm
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default ConfirmPassword;
