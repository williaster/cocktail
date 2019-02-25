import React from 'react';

import DataProvider from '../../../src/components/DataProvider';
import parseJson from '../../../src/data/parseJson';
import { DATA_URL } from '../../../src/constants';

export default {
  examples: [
    {
      renderStory: () => (
        <DataProvider parser={parseJson} url={DATA_URL}>
          {() => <div>Hello, world</div>}
        </DataProvider>
      ),
      storyName: 'Parse',
      storyPath: 'Data',
    },
    {
      renderStory: () => <div>Hello, world</div>,
      storyName: 'Test',
      storyPath: 'test',
    },
  ],
};
