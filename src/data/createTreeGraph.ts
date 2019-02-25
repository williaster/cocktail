import { sankey } from 'd3';

type categories = ['spirit', 'liqueur', 'alcohol', 'other', 'sweet', 'garnish'];

type ingredient = {
  cocktail: string;
  simple_ingredient: string;
  quantity: number;
  cateogry: categor
};

interface categorizedCocktails {
  [k: string]: {
    [category: string]: ingredient[];
  }
};

function createTreeGraph({ 
  categories: string[];
  categorizedCocktails : 
}) {
  const nodes = [];
  const links = [];

  /**
   * @TODO
   *    update category parser to
   *        - cache values per category
   *        - cache cocktails in each category <> category-value <> cocktail
   *
   * @TODO
   *    create nodes, one for each category <> category-value
   *        id = category--value
   *        ?? this should include all past categories / will depend on category ordering
   *
   *    the last nodes should be cocktails themselves with id = cocktail-name
   *    ?? this will depend on category ordering
   *
   * @TODO
   *    create links
   *
   */
  //
  // const graph = sankey()

  return { nodes, links };
}
