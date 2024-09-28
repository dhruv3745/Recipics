export interface RecipeData {
  id: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  time: string;
  tags: string[];
  calories: number;
}
