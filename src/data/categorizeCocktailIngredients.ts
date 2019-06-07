import {
  Cocktail,
  CategorizedCocktailLookup,
  CategorizedCocktail,
  CategorizedIngredients,
  IngredientCategory,
} from '../../types';

/** returns lookup of cocktails which  */
export default function categorizeCocktailIngredients({
  categories,
  cocktailsArray,
}: {
  categories: IngredientCategory[];
  cocktailsArray: Cocktail[];
}) {
  const cocktails: CategorizedCocktailLookup = {};

  for (let i = 0; i < cocktailsArray.length; i += 1) {
    const ingredients = Object.values(cocktailsArray[i]); // eslint-disable-line compat/compat

    if (ingredients.length) {
      // create loo array for each category
      const categorizedIngredients: CategorizedIngredients = categories.reduce((ret, curr) => {
        ret[curr] = []; // eslint-disable-line

        return ret;
      }, {});

      // add ingredients to categories
      for (let j = 0; j < ingredients.length; j += 1) {
        const ingredient = ingredients[j];

        if (ingredient.category === 'alcohol') ingredient.category = 'liqueur';

        // clean up: `liqueur (orange)` => `orange`
        // eslint-disable-next-line no-useless-escape
        const match = ingredient.simple_ingredient.match(`${ingredient.category} \((.*)\)$`);
        if (match) ingredient.simple_ingredient = match[1].replace(/[())]/g, '');

        categorizedIngredients[ingredient.category].push(ingredient);
      }

      // sort each category array by ingredient quantity (highest first)
      for (let k = 0; k < categories.length; k += 1) {
        const category = categories[k];
        categorizedIngredients[category].sort((a, b) => b.quantity - a.quantity);
      }

      const { cocktail } = ingredients[0];
      const categorizedCocktail: CategorizedCocktail = {
        cocktail,
        ingredients: categorizedIngredients,
      };

      cocktails[cocktail] = categorizedCocktail;
    }
  }

  return cocktails;
}
