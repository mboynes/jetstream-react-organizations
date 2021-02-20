require('./bootstrap');

// Import modules...
import { App } from '@inertiajs/inertia-react';
import * as React from 'react';
import { render } from 'react-dom';

const el = document.getElementById('app');

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={name => require(`./Pages/${name}`).default}
  />,
  el
);
