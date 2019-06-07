import { addParameters, configure } from '@storybook/react';

addParameters({
  options: {
    enableShortcuts: false,
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\//,
    isFullScreen: false,
    panelPosition: 'bottom',
    // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'.
    // The first panel will be opened by default as you run Storybook
    selectedAddonPanel: undefined,
    showPanel: false,
    showSearchBox: true,
    showNav: true,
    sidebarAnimations: true,
    sortStoriesByKind: false,
  },
  theme: {
    brandTitle: '🍹 Cocktail Vis',
  },
});

function loadStorybook() {
  require('./storybook.css');
  require('../stories');
}

configure(loadStorybook, module);
