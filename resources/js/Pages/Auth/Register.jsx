import * as React from 'react';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Input from '@/Jetstream/Input';
import Label from '@/Jetstream/Label';
import Button from '@/Jetstream/Button';
import Checkbox from '@/Jetstream/Checkbox';
import useForm from '@/hooks/useForm';

const Register = () => {
  const { formRef, data, useField, status: formStatus, submit } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});
  const isProcessing = formStatus === 'processing';
  const [name, setName] = useField('name');
  const [email, setEmail] = useField('email');
  const [password, setPassword] = useField('password');
  const [passwordConfirmation, setPasswordConfirmation] = useField('password_confirmation');
  const [terms, setTerms] = useField('terms');
  const { jetstream } = usePage().props;

  const formHandler = (e) => {
    e.preventDefault();

    submit(new Promise((resolve) => {
      Inertia.post(route('register'), data, {
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
          <Label htmlFor="name" value="Name" />
          <Input
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={name}
            onChange={(value) => setName(value)}
            required
            autoFocus
            autoComplete="name"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="email" value="Email" />
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={email}
            onChange={(value) => setEmail(value)}
            required
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

        {jetstream.hasTermsAndPrivacyPolicyFeature ? (
          <div className="mt-4">
            <Label htmlFor="terms">
              <div className="flex items-center">
                <Checkbox name="terms" id="terms" checked={terms} onChange={(value) => setTerms(value)} />
                <div className="ml-2">
                  I agree to the <a target="_blank" href={route('terms.show')} className="underline text-sm text-gray-600 hover:text-gray-900">Terms of Service</a> and <a target="_blank" href={route('policy.show')} className="underline text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                </div>
              </div>
            </Label>
          </div>
        ) : null}

        <div className="flex items-center justify-end mt-4">
          <InertiaLink href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
            Already registered?
          </InertiaLink>
          {' '}
          <Button
            className={classnames('ml-4', { 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Register
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}

export default Register;
