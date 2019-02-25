export default function categorizeCocktailIngredients({ categories, cocktailsArray }) {
  // { $name: { $category: [ { [ingredient] } ] }}
  const cocktails = {};

  for (let i = 0; i < cocktailsArray.length; i += 1) {
    const ingredients = Object.values(cocktailsArray[i]);

    if (ingredients.length) {
      const categorizedIngredients = categories.reduce((ret, curr) => {
        ret[curr] = []; // eslint-disable-line

        return ret;
      }, {});

      for (let j = 0; j < ingredients.length; j += 1) {
        const ingredient = ingredients[j];
        categorizedIngredients[ingredient.category].push(ingredient);
      }

      // sort each category array by ingredient quantity
      for (let k = 0; k < categories.length; k += 1) {
        const category = categories[k];
        categorizedIngredients[category].sort((a, b) => b.quantity - a.quantity);
      }

      const name = ingredients[0].cocktail;

      cocktails[name] = {
        name: ingredients[0].cocktail,
        ingredients: categorizedIngredients,
      };
    }
  }

  return cocktails;
}
