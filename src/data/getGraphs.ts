/* eslint complexity: 'off' */
import {
  CategorizedCocktailLookup,
  IngredientCategory,
  Node,
  Link,
  Graph,
  GraphLookup,
} from '../../types';

const EMPTY_GRAPH: Graph = {
  nodes: [],
  links: [],
  idToNode: {
    root: {
      ingredient: 'root',
      category: 'root',
      cocktails: [],
    },
  },
  idToLink: {},
};

export default function getGraphs({
  categories,
  categorizedCocktails,
}: {
  categories: IngredientCategory[];
  categorizedCocktails: CategorizedCocktailLookup;
}) {
  // below we create multiple graphs. one _between_ categories, one for _within_ each category
  const graphs: GraphLookup = {};

  // initialize all graphs
  ['main', ...categories].forEach(cat => {
    graphs[cat] = {
      nodes: [],
      links: [],
      idToNode: {
        root: {
          ingredient: 'root',
          category: 'root',
          cocktails: [],
        },
      },
      idToLink: {},
    };
  });

  const mainGraph = graphs.main;

  let prevNode = mainGraph.idToNode.root as Node;
  mainGraph.nodes.push(prevNode);

  Object.entries(categorizedCocktails).forEach(([, cocktailObj]) => {
    const { cocktail, ingredients } = cocktailObj;
    prevNode = mainGraph.idToNode.root as Node; // start at root for each cocktail

    categories.forEach(category => {
      let ingredient;

      if (ingredients[category] && ingredients[category].length > 0) {
        // cocktail has 1+ ingredients in this category
        const { simple_ingredient: primaryIngredient } = ingredients[category][0];
        ingredient = primaryIngredient;

        // create nodes + links for ingredients _within_ each category
        const categoryGraph = graphs[category];

        for (let i = 0; i < ingredients[category].length; i += 1) {
          const { simple_ingredient: simpleIngredient } = ingredients[category][i];
          const connectedIngredient = simpleIngredient; // `${i === 0 ? '' : '--'}${simpleIngredient}`;

          if (!categoryGraph.idToNode[connectedIngredient]) {
            categoryGraph.idToNode[connectedIngredient] = {
              ingredient: connectedIngredient,
              category,
              cocktails: [],
            } as Node;

            categoryGraph.nodes.push(categoryGraph.idToNode[connectedIngredient]);
          }

          if (i > 0 && primaryIngredient !== connectedIngredient) {
            // non-primary ingredient
            const linkId = `${primaryIngredient}--${connectedIngredient}`;

            if (!categoryGraph.idToLink[linkId]) {
              categoryGraph.idToLink[linkId] = {
                source: primaryIngredient,
                target: connectedIngredient,
                cocktails: [],
                value: 0,
              };

              categoryGraph.links.push(categoryGraph.idToLink[linkId]);
            }

            const link = categoryGraph.idToLink[linkId] as Link;
            link.cocktails.push(cocktail);
            link.value = link.cocktails.length;
          }
        }
      } else {
        // cocktail does _not_ have ingredient in this category, capture with 'no-xxx' node
        ingredient = `no-${category}`;
      }

      // skip "no"
      if (!ingredient) return;

      if (!mainGraph.idToNode[ingredient]) {
        // create node
        mainGraph.idToNode[ingredient] = {
          ingredient,
          category,
          cocktails: [],
        } as Node;

        // push it into the nodes
        mainGraph.nodes.push(mainGraph.idToNode[ingredient]);
      }

      const node = mainGraph.idToNode[ingredient] as Node;
      node.cocktails.push(cocktail);

      // create link
      const linkId = `${prevNode.ingredient}--${node.ingredient}`;

      if (!mainGraph.idToLink[linkId]) {
        mainGraph.idToLink[linkId] = {
          source: prevNode.ingredient,
          target: node.ingredient,
          cocktails: [],
          value: 0,
        };

        mainGraph.links.push(mainGraph.idToLink[linkId]);
      }

      const link = mainGraph.idToLink[linkId] as Link;
      link.cocktails.push(cocktail);
      link.value = link.cocktails.length;

      prevNode = node;
    });
  });

  return graphs;
}
