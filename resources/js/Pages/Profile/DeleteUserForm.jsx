import * as React from 'react';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';

import handleKeyPress from '@/util/handleKeyPress';
import useForm from '@/hooks/useForm';

import ActionSection from '@/Jetstream/ActionSection';
import DialogModal from '@/Jetstream/ConfirmationModal';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';

const DeleteUserForm = (props) => {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = React.useState(false);
  const {
    data,
    useField,
    isProcessing,
    submit,
    errors,
    reset,
  } = useForm({ password: '' });
  const [password, setPassword] = useField('password');
  const passwordRef = React.useRef(null);

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  const deleteUser = () => {
    submit(new Promise((resolve) => {
      Inertia.delete(route('current-user.destroy'), {
        data,
        errorBag: 'deleteUser',
        onSuccess: () => closeModal(),
        onError: () => passwordRef.current.focus(),
        onFinish: () => resolve('reset'),
      });
    }));
  };

  return (
    <ActionSection
      {...props}
      title="Delete Account"
      description="Permanently delete your account."
      content={(
        <>
          <div className="max-w-xl text-sm text-gray-600">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </div>

          <div className="mt-5">
            <DangerButton onClick={() => setConfirmingUserDeletion(true)}>
              Delete Account
            </DangerButton>
          </div>

          {/* Delete Account Confirmation Modal */}
          <DialogModal
            show={confirmingUserDeletion}
            close={closeModal}
            title="Delete Account"
            content={(
              <>
                Are you sure you want to delete your account? Once your account
                is deleted, all of its resources and data will be permanently
                deleted. Please enter your password to confirm you would like to
                permanently delete your account.

                <div className="mt-4">
                  <Input
                    type="password"
                    fieldRef={passwordRef}
                    className="mt-1 block w-3/4"
                    placeholder="Password"
                    value={password}
                    onChange={(value) => setPassword(value)}
                    onKeyPress={handleKeyPress('Enter', deleteUser)}
                  />

                  <InputError message={errors?.deleteUser?.password} className="mt-2" />
                </div>
              </>
            )}
            footer={(
              <>
                <SecondaryButton onClick={closeModal}>
                  Never mind
                </SecondaryButton>
                {' '}
                <DangerButton
                  className={classnames('ml-2', { 'opacity-25': isProcessing })}
                  onClick={deleteUser}
                  disabled={isProcessing}
                >
                  Delete Account
                </DangerButton>
              </>
            )}
          />
        </>
      )}
    />
  );
};

export default DeleteUserForm;
