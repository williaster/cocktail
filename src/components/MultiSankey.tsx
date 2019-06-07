import React from 'react';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { GraphLookup, IngredientCategory } from '../../types';
import Sankey from './Sankey';

export type Props = {
  width: number;
  height: number;
  graphs: GraphLookup;
  categories: IngredientCategory[];
};

type State = {
  graph: Graph | null;
};

export default class MultiSankey extends React.Component<Props> {
  render() {
    const { width, height, graphs, categories } = this.props;
    const categroy = width / (categories.length + 1);

    return width > 50 && height > 50 ? (
      <>
        <svg width={width} height={height}>
          <Sankey width={width} height={height} rawGraph={graphs.main} />

          {categories.map(category => (
            <g key={category} transform={`translate(${categroy}px)`}>
              <Sankey width={categroy * 0.5} height={height} rawGraph={graphs[category]} />
            </g>
          ))}
        </svg>
      </>
    ) : (
      'Viewport too small'
    );
  }
}
