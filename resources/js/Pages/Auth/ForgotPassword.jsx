import * as React from 'react';
import { node } from 'prop-types';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Input from '@/Jetstream/Input';
import Label from '@/Jetstream/Label';
import Button from '@/Jetstream/Button';
import useForm from '@/hooks/useForm';

const ForgotPassword = ({ status = '' }) => {
  const {
    data, useField, status: formStatus, submit,
  } = useForm({ email: '' });
  const isProcessing = formStatus === 'processing';
  const [email, setEmail] = useField('email');

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('password.email'), data, {
        onFinish: () => {
          resolve();
        },
      });
    }));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status ? (
        <div className="mb-4 font-medium text-sm text-green-600">
          {status}
        </div>
      ) : null}

      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        <div>
          <Label htmlFor="email" value="Email" />
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={email}
            onChange={(value) => setEmail(value)}
            required
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button
            className={classnames({ 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

ForgotPassword.propTypes = {
  status: node,
};

export default ForgotPassword;
