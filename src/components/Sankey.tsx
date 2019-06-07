import React from 'react';
import { sankey, sankeyLinkHorizontal, sankeyLeft, sankeyCenter } from 'd3-sankey';
import { Graph } from '../../types';

export type Props = {
  width: number;
  height: number;
  rawGraph: Graph;
};

type State = {
  graph: Graph | null;
};

export default class Sankey extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { graph: null };
  }

  componentDidMount() {
    this.buildSankey();
  }

  buildSankey() {
    const { rawGraph, width, height } = this.props;

    const sankeyGenerator = sankey()
      .nodeId(d => d.ingredient)
      .nodeSort(null)
      .linkSort(null)
      .nodeAlign(sankeyLeft)
      .nodeWidth(10)
      .nodePadding(5)
      .extent([[0, 5], [width, height - 5]]);

    const graph = sankeyGenerator({
      nodes: rawGraph.nodes.map(d => ({ ...d })),
      links: rawGraph.links.map(d => ({ ...d })),
    });

    console.log(graph);

    this.setState({ graph });
  }

  render() {
    const { width, height } = this.props;
    const { graph } = this.state;
    const linkGen = sankeyLinkHorizontal();

    return graph && width > 50 && height > 50 ? (
      <>
        <svg width={width} height={height}>
          {graph.links.map((link, i) => (
            <g key={i} className="link">
              <path
                d={linkGen(link)}
                stroke="violet"
                strokeOpacity={0.4}
                strokeWidth={link.width}
                fill="none"
              />
            </g>
          ))}

          {graph.nodes.map((node, i) => (
            <g key={i} className="node">
              <rect
                x={node.x0}
                y={node.y0}
                height={node.y1 - node.y0}
                width={node.x1 - node.x0}
                fill={node.ingredient.startsWith('no-') ? 'violet' : 'blueviolet'}
                fillOpacity={node.ingredient.startsWith('no-') ? 0.4 : 1}
                stroke={node.ingredient.startsWith('no-') ? 'violet' : 'none'}
              />
              <text
                x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
                y={(node.y1 + node.y0) / 2}
                dy="0.35em"
                textAnchor={node.x0 < width / 2 ? 'start' : 'end'}
                fill="#484848"
                fontSize={12}
              >
                <strong>{node.category}</strong>
                {` ${node.ingredient}`}
              </text>
            </g>
          ))}
        </svg>
        <style jsx>
          {`
            .node > text: {
              opacity: 0;
            }

            .node:hover > text: {
              opacity: 1;
            }
          `}
        </style>
      </>
    ) : (
      'Building graph ...'
    );
  }
}
