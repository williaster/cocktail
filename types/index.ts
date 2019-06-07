export type IngredientCategory = 'spirit' | 'liqueur' | 'alcohol' | 'other' | 'sweet' | 'garnish';

export interface CocktailIngredient {
  /** Name of cocktail. */
  cocktail: string;
  /** Simplified / common ingredient name. */
  simple_ingredient: string; // eslint-disable-line camelcase
  /** Quantity of ingrdient. */
  quantity: number;
  /** Category of ingredient. */
  category: IngredientCategory;
}

/** A Cocktail is an object of CocktailIngredient */
export interface Cocktail {
  [ingredient: string]: CocktailIngredient;
}

export interface CocktailLookup {
  [cocktail: string]: Cocktail;
}

export type CategorizedIngredients = Partial<{ [key in IngredientCategory]: CocktailIngredient[] }>;

export type CategorizedCocktail = {
  cocktail: string;
  ingredients: CategorizedIngredients;
};

export interface CategorizedCocktailLookup {
  [k: string]: CategorizedCocktail;
}

// ----------------------------------------------------------------------------
/** Graph types */
export interface Node {
  ingredient: string;
  category: IngredientCategory | 'root';
  cocktails: string[];
}

export interface Link {
  source: string;
  target: string;
  cocktails: string[];
  value: number; // matches cocktail length
}

export interface Graph {
  nodes: Node[];
  links: Link[];
  idToNode: { [ingredient: string]: Node };
  idToLink: { [srcTarget: string]: Link };
}

export interface GraphLookup {
  [categoryOrMain: string]: Graph;
}
