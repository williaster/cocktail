import React from 'react';
import ParentSize from '@vx/responsive/build/components/ParentSize';

import DataProvider from '../../../src/components/DataProvider';
import mungeData from '../../../src/data/mungeData';
import { DATA_URL } from '../../../src/constants';
import Sankey from '../../../src/components/Sankey';
import RadialSankey from '../../../src/components/RadialSankey';

const separator = '  ------------------------------  ';

export default {
  examples: [
    {
      renderStory: () => (
        <DataProvider parser={mungeData} url={DATA_URL}>
          {() => <div>Hello, world</div>}
        </DataProvider>
      ),
      storyName: 'Parse',
      storyPath: 'Data',
    },
    {
      renderStory: () => (
        <DataProvider parser={mungeData} url={DATA_URL}>
          {({ graphs, categories }) => (
            <>
              {`root${separator}${categories.join(`${separator}`)}`}
              <ParentSize>
                {({ width, height }) =>
                  width > 50 &&
                  height > 50 && (
                    <Sankey width={width - 20} height={height - 50} rawGraph={graphs.main} />
                  )
                }
              </ParentSize>
            </>
          )}
        </DataProvider>
      ),
      storyName: 'Sankey',
      storyPath: 'Data',
    },
    {
      renderStory: () => (
        <DataProvider parser={mungeData} url={DATA_URL}>
          {({ graphs, categories }) => (
            <>
              <ParentSize>
                {({ width, height }) =>
                  width > 50 &&
                  height > 50 && (
                    <RadialSankey width={width - 20} height={height - 50} rawGraph={graphs.main} />
                  )
                }
              </ParentSize>
            </>
          )}
        </DataProvider>
      ),
      storyName: 'RadialSankey',
      storyPath: 'Data',
    },
  ],
};
