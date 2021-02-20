import * as React from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default ({
  errorBag = null,
  ...initialData
} = {}) => {
  const [data, setData] = React.useState(initialData);
  const [status, setStatus] = React.useState('idle');
  const formRef = React.useRef(null);
  const errors = usePage().props;

  const submit = React.useCallback(
    (promise) => {
      if (!promise) {
        return;
      }

      setStatus('processing');
      promise.then((newStatus = null) => {
        if (newStatus === 'success') {
          setStatus('recentlySuccessful');
          setTimeout(() => {
            setStatus((oldStatus) => oldStatus === 'recentlySuccessful' ? 'idle' : oldStatus);
          }, 2000);
        } else {
          setStatus('idle');
        }

        // Reset the form if the status is not "error".
        if (newStatus !== 'error') {
          if (formRef.current) {
            formRef.current.reset();
          }
        }
      })
    },
    [formRef, setStatus]
  );

  const setField = (field, value) => setData(
    (oldData) => ({
      ...oldData,
      [field]: typeof value === 'function' ? value(oldData[field]) : value,
    })
  );

  const useField = (field) => [
    data[field],
    (value) => setField(field, value),
  ];

  return {
    formRef,
    useField,
    setField,
    data,
    setData,
    status,
    isProcessing: status === 'processing',
    setStatus,
    submit,
    errors: (errorBag ? errors?.[errorBag] : errors) || {},
  };
};
