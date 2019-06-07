import React from 'react';
import { sankey, sankeyCenter, sankeyLeft, sankeyJustify } from 'd3-sankey';
import { arc, linkRadial } from 'd3-shape';
import { ribbon } from 'd3-chord';
import { Graph } from '../../types';
import inverseRibbon from '../inverseRibbon';

const arcGen = arc().cornerRadius(8);
const ribbonGen = inverseRibbon; //ribbon();
const linkGen = linkRadial();

export type Props = {
  width: number;
  height: number;
  rawGraph: Graph;
  startAngle?: number;
  endAngle?: number;
};

type State = {
  graph: Graph | null;
};

const defaultProps = {
  startAngle: 0.44 * Math.PI,
  endAngle: 0.56 * Math.PI,
};

export default class RadialSankey extends React.Component<Props, State> {
  static defaultProps: Partial<Props>;

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
      // .nodeSort(null)
      // .linkSort(null)
      .nodeAlign(sankeyLeft)
      .nodeWidth(16)
      .nodePadding(6)
      .extent([[0, 5], [width, height - 5]]);

    const graph = sankeyGenerator({
      nodes: rawGraph.nodes.map(d => ({ ...d })),
      links: rawGraph.links.map(d => ({ ...d })),
    });

    this.setState({ graph });
  }

  render() {
    const { width, height, startAngle, endAngle } = this.props;
    const { graph } = this.state;
    const totalRadians = endAngle - startAngle;

    const radius = width - 150;
    const radiusBaseline = height;

    return graph && width > 50 && height > 50 ? (
      <>
        <svg width={width} height={height}>
          <g transform={`translate(${width * -0.55}, ${height * 0.5})`}>
            {graph.links.map(
              (link, i) =>
                // !link.source.ingredient.startsWith('no-') &&
                // !link.target.ingredient.startsWith('no-') &&
                i < 1000 && (
                  <g key={i} className="link">
                    <path
                      d={ribbonGen({
                        source: {
                          startAngle: startAngle + (link.source.y0 / height) * totalRadians,
                          endAngle: startAngle + (link.source.y1 / height) * totalRadians,
                          radius: radiusBaseline + (link.source.x1 / width) * radius,
                        },
                        target: {
                          startAngle: startAngle + (link.target.y0 / height) * totalRadians,
                          endAngle: startAngle + (link.target.y1 / height) * totalRadians,
                          radius: radiusBaseline + (link.target.x0 / width) * radius,
                        },
                      })}
                      // stroke="violet"
                      // strokeOpacity={
                      //   link.source.ingredient.startsWith('no-') ||
                      //   link.target.ingredient.startsWith('no-')
                      //     ? 0
                      //     : 0.2
                      // }
                      fillOpacity={
                        link.source.ingredient.startsWith('no-') ||
                        link.target.ingredient.startsWith('no-')
                          ? 0.05
                          : 0.2
                      }
                      fill={
                        link.source.ingredient.startsWith('no-') ||
                        link.target.ingredient.startsWith('no-')
                          ? 'violet'
                          : 'blueviolet'
                      }
                      // mixBlendMode="multiply"
                      // fill="none"
                    />
                  </g>
                ),
            )}

            {graph.nodes.map((node, i) => (
              <g key={i} className="node">
                <path
                  d={arcGen({
                    innerRadius: radiusBaseline + (node.x0 / width) * radius,
                    outerRadius: radiusBaseline + (node.x1 / width) * radius,
                    startAngle: startAngle + (node.y0 / height) * totalRadians,
                    endAngle: startAngle + (node.y1 / height) * totalRadians,
                  })}
                  stroke={node.ingredient.startsWith('no-') ? 'violet' : 'none'}
                  strokeOpacity={0.4}
                  strokeWidth={2}
                  fill={node.ingredient.startsWith('no-') ? 'violet' : 'blueviolet'}
                  fillOpacity={node.ingredient.startsWith('no-') ? 0.4 : 1}
                />

                {/* <text
                x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
                y={(node.y1 + node.y0) / 2}
                dy="0.35em"
                textAnchor={node.x0 < width / 2 ? 'start' : 'end'}
                fill="#484848"
                fontSize={12}
              >
                <strong>{node.category}</strong>
                {` ${node.ingredient}`}
              </text> */}
              </g>
            ))}
          </g>
        </svg>
      </>
    ) : (
      'Building graph ...'
    );
  }
}

RadialSankey.defaultProps = defaultProps;
