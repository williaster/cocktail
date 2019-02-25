import getCategoriesFromCocktails from './getCategoriesFromCocktails';
import categorizeCocktailIngredients from './categorizeCocktailIngredients';
import createTreeGraph from './createTreeGraph';

export default function parseJson(cocktailLookup) {
  const cocktailsArray = Object.values(cocktailLookup);
  const categories = getCategoriesFromCocktails(cocktailsArray);
  const categorizedCocktails = categorizeCocktailIngredients({ categories, cocktailsArray });
  const treeGraph = createTreeGraph({ categories, categorizedCocktails });

  // need to create the tree from here
  console.log({ treeGraph, categories, categorizedCocktails });
}
