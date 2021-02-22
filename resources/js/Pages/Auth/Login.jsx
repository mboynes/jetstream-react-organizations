/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { bool, node } from 'prop-types';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Input from '@/Jetstream/Input';
import Label from '@/Jetstream/Label';
import Button from '@/Jetstream/Button';
import Checkbox from '@/Jetstream/Checkbox';
import useForm from '@/hooks/useForm';

const Login = ({ status = '', canResetPassword }) => {
  const {
    data,
    useField,
    status: formStatus,
    submit,
    reset,
  } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const isProcessing = formStatus === 'processing';
  const [email, setEmail] = useField('email');
  const [password, setPassword] = useField('password');
  const [remember, setRemember] = useField('remember');

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('login'), {
        ...data,
        remember: remember ? 'on' : '',
      }, {
        onError: () => {
          resolve();
          reset('password');
        },
      });
    }));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <ValidationErrors className="mb-4" />

      {status ? (
        <div className="mb-4 font-medium text-sm text-green-600">
          {status}
        </div>
      ) : null}

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

        <div className="mt-4">
          <Label htmlFor="password" value="Password" />
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={password}
            onChange={(value) => setPassword(value)}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox name="remember" checked={remember} onChange={(value) => setRemember(value)} />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword ? (
            <>
              <InertiaLink href={route('password.request')} className="underline text-sm text-gray-600 hover:text-gray-900">
                Forgot your password?
              </InertiaLink>
              {' '}
            </>
          ) : null}
          <Button
            className={classnames('ml-4', { 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Log in
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

Login.propTypes = {
  canResetPassword: bool.isRequired,
  status: node,
};

export default Login;
