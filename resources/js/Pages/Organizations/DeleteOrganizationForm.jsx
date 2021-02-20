import * as React from 'react';
import classnames from 'classnames';
import ActionSection from '@/Jetstream/ActionSection';
import ConfirmationModal from '@/Jetstream/ConfirmationModal';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';

const DeleteOrganizationForm = ({ organization }) => {
  const [confirmingOrganizationDeletion, setConfirmingOrganizationDeletion] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const deleteOrganization = () => {
    setIsProcessing(true);
    Inertia.delete(route('organizations.destroy', organization), {
      errorBag: 'deleteOrganization',
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <ActionSection
      title="Delete Organization"
      description="Permanently delete this organization."
      content={(
        <>
          <div className="max-w-xl text-sm text-gray-600">
            Once a organization is deleted, all of its resources and data will be permanently deleted. Before deleting this organization, please download any data or information regarding this organization that you wish to retain.
          </div>

          <div className="mt-5">
            <DangerButton onClick={() => setConfirmingOrganizationDeletion(true)}>
              Delete Organization
            </DangerButton>
          </div>

          {/* Delete Organization Confirmation Modal */}
          <ConfirmationModal
            show={confirmingOrganizationDeletion}
            close={() => setConfirmingOrganizationDeletion(false)}
            title="Delete Organization"
            content="Are you sure you want to delete this organization? Once a organization is deleted, all of its resources and data will be permanently deleted."
            footer={(
              <>
                <SecondaryButton onClick={setConfirmingOrganizationDeletion(false)}>
                  Never mind
                </SecondaryButton>
                {' '}
                <DangerButton
                  className={classnames('ml-2', { 'opacity-25': isProcessing })}
                  onClick={deleteOrganization}
                  disabled={isProcessing}
                >
                  Delete Organization
                </DangerButton>
              </>
            )}
          />
        </>
      )}
    />
  );
};

export default DeleteOrganizationForm;