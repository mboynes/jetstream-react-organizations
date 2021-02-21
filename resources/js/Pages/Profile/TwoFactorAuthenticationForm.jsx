import * as React from 'react';
import classnames from 'classnames';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import ActionSection from '@/Jetstream/ActionSection';
import Button from '@/Jetstream/Button';
import ConfirmsPassword from '@/Jetstream/ConfirmsPassword';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';

const TwoFactorAuthenticationForm = (props) => {
  const [enabling, setEnabling] = React.useState(false);
  const [disabling, setDisabling] = React.useState(false);
  const [qrCode, setQrCode] = React.useState(null);
  const [recoveryCodes, setRecoveryCodes] = React.useState([]);
  const { user } = usePage().props;

  const twoFactorEnabled = !enabling && user.two_factor_enabled;

  const showQrCode = () => (
    axios.get('/user/two-factor-qr-code')
      .then((response) => setQrCode(response.data.svg))
  );

  const showRecoveryCodes = () => (
    axios.get('/user/two-factor-recovery-codes')
      .then((response) => setRecoveryCodes(response.data))
  );

  const enableTwoFactorAuthentication = () => {
    setEnabling(true);

    Inertia.post('/user/two-factor-authentication', {}, {
      preserveScroll: true,
      onSuccess: () => Promise.all([
        showQrCode(),
        showRecoveryCodes(),
      ]),
      onFinish: () => setEnabling(false),
    });
  };

  const regenerateRecoveryCodes = () => (
    axios.post('/user/two-factor-recovery-codes')
      .then(() => showRecoveryCodes())
  );

  const disableTwoFactorAuthentication = () => {
    setDisabling(true);

    Inertia.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess: () => setDisabling(false),
    });
  };

  return (
    <ActionSection
      {...props}
      title="Two Factor Authentication"
      description="Add additional security to your account using two factor authentication."
      content={(
        <>
          {twoFactorEnabled ? (
            <h3 className="text-lg font-medium text-gray-900">
              You have enabled two factor authentication.
            </h3>
          ) : (
            <h3 className="text-lg font-medium text-gray-900">
              You have not enabled two factor authentication.
            </h3>
          )}

          <div className="mt-3 max-w-xl text-sm text-gray-600">
            <p>
              When two factor authentication is enabled, you will be prompted
              for a secure, random token during authentication. You may retrieve
              this token from your phone&apos;s Google Authenticator application.
            </p>
          </div>

          {twoFactorEnabled ? (
            <div>
              {qrCode ? (
                <div>
                  <div className="mt-4 max-w-xl text-sm text-gray-600">
                    <p className="font-semibold">
                      Two factor authentication is now enabled. Scan the
                      following QR code using your phone&apos;s authenticator
                      application.
                    </p>
                  </div>

                  <div className="mt-4 dark:p-4 dark:w-56 dark:bg-white" dangerouslySetInnerHTML={{ __html: qrCode }} />
                </div>
              ) : null}

              {recoveryCodes.length > 0 ? (
                <div>
                  <div className="mt-4 max-w-xl text-sm text-gray-600">
                    <p className="font-semibold">
                      Store these recovery codes in a secure password manager.
                      They can be used to recover access to your account if your
                      two factor authentication device is lost.
                    </p>
                  </div>

                  <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
                    {recoveryCodes.map((code) => (
                      <div key={code}>
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5">
            {!twoFactorEnabled ? (
              <div>
                <ConfirmsPassword onConfirm={enableTwoFactorAuthentication}>
                  <Button type="button" className={classnames({ 'opacity-25': enabling })} disabled={enabling}>
                    Enable
                  </Button>
                </ConfirmsPassword>
              </div>
            ) : (
              <div>
                {recoveryCodes.length > 0 ? (
                  <ConfirmsPassword onConfirm={regenerateRecoveryCodes}>
                    <SecondaryButton className="mr-3">
                      Regenerate Recovery Codes
                    </SecondaryButton>
                  </ConfirmsPassword>
                ) : (
                  <ConfirmsPassword onConfirm={showRecoveryCodes}>
                    <SecondaryButton className="mr-3">
                      Show Recovery Codes
                    </SecondaryButton>
                  </ConfirmsPassword>
                )}

                <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                  <DangerButton className={classnames({ 'opacity-25': disabling })} disabled={disabling}>
                    Disable
                  </DangerButton>
                </ConfirmsPassword>
              </div>
            )}
          </div>
        </>
      )}
    />
  );
};

export default TwoFactorAuthenticationForm;
