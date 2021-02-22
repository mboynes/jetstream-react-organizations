import * as React from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';
import Button from '@/Jetstream/Button';
import useForm from '@/hooks/useForm';

const VerifyEmail = ({ status = '' }) => {
  const { status: formStatus, submit } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const isProcessing = formStatus === 'processing';

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('verification.send'), {}, {
        onFinish: () => {
          resolve();
        },
      });
    }));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' ? (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      ) : null}

      <form onSubmit={formHandler}>
        <div className="mt-4 flex items-center justify-between">
          <Button
            className={classnames('ml-4', { 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Resend Verification Email
          </Button>
          {' '}
          <InertiaLink
            href={route('logout')}
            className="underline text-sm text-gray-600 hover:text-gray-900"
            method="post"
            as="button"
          >
            Log Out
          </InertiaLink>
        </div>
      </form>
    </AuthenticationCard>
  );
};

VerifyEmail.propTypes = {
  status: string,
};

export default VerifyEmail;
