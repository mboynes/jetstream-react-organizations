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

const TwoFactorChallenge = () => {
  const {
    data, useField, status: formStatus, submit,
  } = useForm({
    code: '',
    recovery_code: '',
  });
  const isProcessing = formStatus === 'processing';
  const [code, setCode] = useField('code');
  const [recoveryCode, setRecoveryCode] = useField('recovery_code');
  const [recovery, setRecovery] = React.useState(false);

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('two-factor.login'), data, {
        onFinish: () => {
          resolve();
        },
      });
    }));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        {!recovery ? (
          'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
        ) : (
          'Please confirm access to your account by entering one of your emergency recovery codes.'
        )}
      </div>

      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        {!recovery ? (
          <div>
            <Label htmlFor="code" value="Code" />
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              className="mt-1 block w-full"
              value={code}
              onChange={(value) => setCode(value)}
              autoFocus
              autoComplete="one-time-code"
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="recovery_code" value="Recovery Code" />
            <Input
              id="recovery_code"
              type="text"
              className="mt-1 block w-full"
              value={recoveryCode}
              onChange={(value) => setRecoveryCode(value)}
              autoComplete="one-time-code"
            />
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
            onClick={() => setRecovery(!recovery)}
          >
            {!recovery ? 'Use a recovery code' : 'Use an authentication code'}
          </button>
          {' '}
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

export default TwoFactorChallenge;
