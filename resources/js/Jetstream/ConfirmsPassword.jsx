/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { func, node } from 'prop-types';
import classnames from 'classnames';
import handleKeyPress from '@/util/handleKeyPress';
import DialogModal from './DialogModal';
import Input from './Input';
import InputError from './InputError';
import Button from './Button';
import SecondaryButton from './SecondaryButton';

const initialState = {
  confirmingPassword: false,
  password: '',
  error: '',
  processing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return initialState;

    case 'CONFIRMING_PASSWORD':
      return {
        ...state,
        confirmingPassword: true,
      };

    case 'PROCESSING':
      return {
        ...state,
        processing: true,
      };

    case 'ERROR':
      return {
        ...state,
        processing: false,
        error: action.error,
      };

    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.value,
      };

    default:
      return state;
  }
}

const ConfirmsPassword = ({
  children,
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  onConfirm,
}) => {
  const passwordRef = React.useRef(null);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    confirmingPassword,
    password,
    error: formError,
    processing: formProcessing,
  } = state;

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const startConfirmingPassword = () => {
    axios.get(route('password.confirmation')).then(({ data }) => {
      if (data.confirmed) {
        onConfirm();
      } else {
        dispatch({ type: 'CONFIRMING_PASSWORD' });

        setTimeout(() => passwordRef.current.focus(), 250);
      }
    });
  };

  const confirmPassword = () => {
    dispatch({ type: 'PROCESSING' });

    axios.post(route('password.confirm'), { password }).then(() => {
      closeModal();
      onConfirm();
    }).catch((error) => {
      dispatch({ type: 'ERROR', error: error.response.data.errors.password[0] });
      passwordRef.current.focus();
    });
  };

  const setPassword = (value) => dispatch({
    type: 'SET_PASSWORD',
    value,
  });

  const modalContent = (
    <>
      {content}

      <div className="mt-4">
        <Input
          fieldRef={passwordRef}
          type="password"
          className="mt-1 block w-3/4"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          onKeyPress={handleKeyPress('Enter', confirmPassword)}
        />
        <InputError message={formError} className="mt-2" />
      </div>
    </>
  );

  const modalFooter = (
    <>
      <SecondaryButton onClick={closeModal}>
        Never Mind
      </SecondaryButton>
      {' '}
      <Button
        className={classnames('ml-2', { 'opacity-25': formProcessing })}
        onClick={confirmPassword}
        disabled={formProcessing}
      >
        {button}
      </Button>
    </>
  );

  return (
    <div>
      <span onClick={startConfirmingPassword}>
        {children}
      </span>

      <DialogModal
        show={confirmingPassword}
        close={closeModal}
        title={title}
        content={modalContent}
        footer={modalFooter}
      />
    </div>
  );
};

ConfirmsPassword.propTypes = {
  button: node,
  children: node.isRequired,
  content: node,
  onConfirm: func.isRequired,
  title: node,
};

export default ConfirmsPassword;
