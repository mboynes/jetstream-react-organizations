import * as React from 'react';
import classnames from 'classnames';
import { usePage } from '@inertiajs/inertia-react';

import useForm from '@/hooks/useForm';
import withPreventDefault from '@/util/withPreventDefault';

import FormSection from '@/Jetstream/FormSection';
import ActionMessage from '@/Jetstream/ActionMessage';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Button from '@/Jetstream/Button';
import SecondaryButton from '@/Jetstream/SecondaryButton';

const UpdateProfileInformationForm = ({ user }) => {
  const [photoPreview, setPhotoPreview] = React.useState(null);
  const photoRef = React.useRef(null);

  const { jetstream } = usePage().props;

  const { isProcessing, status, submit, useField, errors } = useForm({
    name: user.name,
    email: user.email,
    photo: null,
  });
  const [name, setName] = useField('name');
  const [email, setEmail] = useField('email');
  const [, setPhoto] = useField('photo');

  const updateProfileInformation = () => {
    if (photoRef.current) {
      setPhoto(photoRef.current.files[0]);
    }

    submit(new Promise((resolve) => {
      Inertia.post(route('user-profile-information.update'), data, {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => {
          resolve('success');
        },
        onFinish: () => {
          // TODO: what happens if this is resolved twice?
          resolve();
        },
      });
    }));
  };

  const selectNewPhoto = () => {
    photoRef.current.click();
  };

  const updatePhotoPreview = () => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };

    reader.readAsDataURL(photoRef.current.files[0]);
  };

  const deletePhoto = () => {
      Inertia.delete(route('current-user-photo.destroy'), {
          preserveScroll: true,
          onSuccess: () => setPhotoPreview(null),
      });
  };


  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title="Profile Information"
      description="Update your account's profile information and email address."
      form={(
        <>
          {/* Profile Photo */}
          {jetstream.managesProfilePhotos ? (
            <div className="col-span-6 sm:col-span-4">
              {/* Profile Photo File Input */}
              <input id="photo" type="file" className="hidden" ref={photoRef} onChange={updatePhotoPreview} />

              <Label htmlFor="photo" value="Photo" />

              {!photoPreview ? (
                <div className="mt-2">
                  {/* Current Profile Photo */}
                  <img src={user.profile_photo_url} alt={user.name} className="rounded-full h-20 w-20 object-cover" />
                </div>
              ) : (
                <div className={classnames('mt-2', { hidden: !!photoPreview })}>
                  {/* New Profile Photo Preview */}
                  <span
                    className="block rounded-full w-20 h-20"
                    style={{
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundImage: `url('${photoPreview}')`,
                    }}
                  />
                </div>
              )}

              <SecondaryButton className="mt-2 mr-2" type="button" onClick={withPreventDefault(selectNewPhoto)}>
                Select A New Photo
              </SecondaryButton>

              {user.profile_photo_path ? (
                <SecondaryButton type="button" className="mt-2" onClick={withPreventDefault(deletePhoto)}>
                  Remove Photo
                </SecondaryButton>
              ) : null}

              <InputError message={errors?.updateProfileInformation?.photo} className="mt-2" />
            </div>
          ) : null}

          {/* Name */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="name" value="Name" />
            <Input
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={name}
              onChange={(value) => setName(value)}
              autoComplete="name"
            />
            <InputError message={errors?.updateProfileInformation?.name} className="mt-2" />
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="email" value="Email" />
            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <InputError message={errors?.updateProfileInformation?.email} className="mt-2" />
          </div>
        </>
      )}
      actions={(
        <>
          <ActionMessage on={status === 'recentlySuccessful'} className="mr-3">
            Saved.
          </ActionMessage>
          {' '}
          <Button
            className={classnames({ 'opacity-25': isProcessing })}
            disabled={isProcessing}
          >
            Save
          </Button>
        </>
      )}
    />
  );
};

export default UpdateProfileInformationForm;
