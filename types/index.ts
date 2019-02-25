export enum IngredientCategory {
  Spirit = 'spirit',
  Liqueur = 'liqueur',
  Alcohol = 'alcohol',
  Misc = 'other',
  Sweet = 'sweet',
  Garnish = 'garnish',
}
export type CocktailCategories = IngredientCategory[];

export interface CocktailIngredient {
  cocktail: string;
  simple_ingredient: string;
  quantity: number;
  cateogry: IngredientCategoryType;
}

export interface Cocktail {
  [ingredient: string]: CocktailIngredient;
}

export interface CocktailLookup {
  [cocktail: string]: Cocktail;
}

export interface CategorizedCocktail {
  name: string;
  // @TODO could make this more concise by saying key in IngredientCategory
  ingredients: {
    spirit: CocktailIngredient[];
    liqueur: CocktailIngredient[];
    alcohol: CocktailIngredient[];
    other: CocktailIngredient[];
    sweet: CocktailIngredient[];
    garnish: CocktailIngredient[];
  };
}

export interface CategorizedCocktailLookup {
  [k: string]: CategorizedCocktail;
}
