export default function getCategoriesFromCocktails(cocktails) {
  const categories = new Set();

  for (let i = 0; i < cocktails.length; i += 1) {
    const ingredients = Object.values(cocktails[i]);

    for (let j = 0; j < ingredients.length; j += 1) {
      const { category, cocktail, ingredient } = ingredients[j];
      if (category) {
        categories.add(category);
      } else {
        console.warn(`No ingredientt cateogry for ${cocktail} — ${ingredient}`);
      }
    }
  }

  return [...categories];
}
