import * as React from 'react';
import classnames from 'classnames';
import ActionSection from '@/Jetstream/ActionSection';
import ActionMessage from '@/Jetstream/ActionMessage';
import DialogModal from '@/Jetstream/ConfirmationModal';
import Button from '@/Jetstream/Button';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import handleKeyPress from '@/util/handleKeyPress';

const LogoutOtherBrowserSessionsForm = ({ sessions, ...props }) => {
  const [confirmingLogout, setConfirmingLogout] = React.useState(false);
  const { data, useField, isProcessing, submit, errors } = useForm({ password: '' });
  const [password, setPassword] = useField('password');
  const passwordRef = React.useRef(null);

  const confirmLogout = () => {
    setConfirmingLogout(true);
    setTimeout(() => passwordRef.current.focus(), 250);
  }

  const closeModal = () => {
    setConfirmingLogout(false);
    passwordRef.current.reset();
  }

  const logoutOtherBrowserSessions = () => {
    submit(new Promise((resolve) => {
      Inertia.delete(route('other-browser-sessions.destroy'), data, {
        preserveScroll: true,
        errorBag: 'logoutOtherBrowserSessions',
        onSuccess: () => closeModal(),
        onError: () => passwordRef.current.focus(),
        onFinish: () => resolve(),
      });
    }));
  };

  return (
    <ActionSection
      {...props}
      title="Browser Sessions"
      description="Manage and log out your active sessions on other browsers and devices."
      content={(
        <>
          <div className="max-w-xl text-sm text-gray-600">
            If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
          </div>

          {/* Other Browser Sessions */}
          {sessions.length > 0 ? (
            <div className="mt-5 space-y-6">
              {sessions.map((session, i) => (
                <div className="flex items-center" key={i}>
                  <div>
                    {session.agent.is_desktop ? (
                      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-500">
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gray-500">
                        <path d="M0 0h24v24H0z" stroke="none"></path><rect x="7" y="4" width="10" height="16" rx="1"></rect><path d="M11 5h2M12 17v.01"></path>
                      </svg>
                    )}
                  </div>

                  <div className="ml-3">
                    <div className="text-sm text-gray-600">
                      {`${session.agent.platform} - ${session.agent.browser}`}
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">
                        {session.ip_address},
                        {' '}
                        {session.is_current_device ? (
                          <span className="text-green-500 font-semibold">This device</span>
                        ) : (
                          <span>{`Last active ${session.last_active}`}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex items-center mt-5">
            <Button onClick={confirmLogout}>
              Log Out Other Browser Sessions
            </Button>

            <ActionMessage on={form.recentlySuccessful} className="ml-3">
              Done.
            </ActionMessage>
          </div>

          {/* Log Out Other Devices Confirmation Modal */}
          <DialogModal
            show={confirmingLogout}
            close={closeModal}
            title="Log Out Other Browser Sessions"
            content={(
              <>
                Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices.

                <div className="mt-4">
                  <Input
                    type="password"
                    ref={passwordRef}
                    className="mt-1 block w-3/4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress('Enter', logoutOtherBrowserSessions)}
                  />

                  <InputError message={errors?.logoutOtherBrowserSessions?.password} className="mt-2" />
                </div>
              </>
            )}
            footer={(
              <>
                <SecondaryButton onClick={closeModal}>
                  Never Mind
                </SecondaryButton>
                {' '}
                <Button
                  className={classnames('ml-2', { 'opacity-25': isProcessing })}
                  onClick={logoutOtherBrowserSessions}
                  disabled={isProcessing}
                >
                  Log Out Other Browser Sessions
                </Button>
              </>
            )}
          />
        </>
      )}
    />
  );
};

export default LogoutOtherBrowserSessionsForm;
