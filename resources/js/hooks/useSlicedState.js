import * as React from 'react';

export default (initialState) => {
  const [state, setState] = React.useState(initialState);
  const updateState = (patch) => setState((oldState) => ({ ...oldState, ...patch }));

  return {
    state,
    setState,
    updateState,
  };
};
