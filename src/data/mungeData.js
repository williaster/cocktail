/* eslint compat/compat: 'off' */
import categorizeCocktailIngredients from './categorizeCocktailIngredients';
import getGraphs from './getGraphs';
import { categories } from '../constants';

export default function mungeData(cocktailLookup) {
  const cocktailsArray = Object.values(cocktailLookup);
  const categorizedCocktails = categorizeCocktailIngredients({ categories, cocktailsArray });
  const graphs = getGraphs({ categories, categorizedCocktails });

  console.log({ graphs, categories, categorizedCocktails });

  return { graphs, categories, categorizedCocktails };
}
