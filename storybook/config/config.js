import { configure } from '@storybook/react';

function loadStorybook() {
  require('./storybook.css');
  require('./storybookInfo'); // this customizes the UI (labels, etc.)
  require('../stories'); // all of the stories
}

configure(loadStorybook, module);
