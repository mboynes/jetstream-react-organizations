/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-filename-extension */
// Import modules...
import { App } from '@inertiajs/inertia-react';
import * as React from 'react';
import { render } from 'react-dom';

require('./bootstrap');

const el = document.getElementById('app');

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={(name) => require(`./Pages/${name}`).default}
  />,
  el
);
