import * as React from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia'
import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Input from '@/Jetstream/Input';
import Label from '@/Jetstream/Label';
import Button from '@/Jetstream/Button';
import useForm from '@/hooks/useForm';

const ResetPassword = ({ email, token }) => {
  const { formRef, data, useField, status: formStatus, submit } = useForm({
    email,
    token,
    password: '',
    password_confirmation: '',
});
  const isProcessing = formStatus === 'processing';
  const [formEmail, setFormEmail] = useField('email');
  const [password, setPassword] = useField('password');
  const [passwordConfirmation, setPasswordConfirmation] = useField('password_confirmation');

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('password.update'), data, {
        onFinish: () => {
          resolve();
        },
      });
    }));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <ValidationErrors className="mb-4" />

      <form ref={formRef} onSubmit={formHandler}>
        <div>
          <Label htmlFor="email" value="Email" />
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={formEmail}
            onChange={(value) => setFormEmail(value)}
            required
            autoFocus
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password" value="Password" />
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={password}
            onChange={(value) => setPassword(value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation" value="Confirm Password" />
          <Input
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={passwordConfirmation}
            onChange={(value) => setPasswordConfirmation(value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button
            className={classnames('ml-4', { 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}

ResetPassword.propTypes = {
  email: string.isRequired,
  token: string.isRequired,
};

export default ResetPassword;
