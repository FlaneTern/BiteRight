export interface ParsedData {
  food: string;
  quantity: string;
  weight?: string; // grams
  image: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  sugar: number;
  protein: number;
  ingredients: string[];
}

const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
};

const parseIngredients = (input: string) => {
  const ingredients: string[] = [];
  let buffer: string = "";
  let openBrackets: number = 0;

  for (const char of input) {
    if (char === "," && !openBrackets) {
      ingredients.push(titleCase(buffer.trim()));
      buffer = "";
    } else {
      if (char === "(") openBrackets++;
      if (char === ")") openBrackets--;
      buffer += char;
    }
  }

  if (buffer) {
    ingredients.push(titleCase(buffer.trim()));
  }

  return ingredients;
}

export function parseDataEAN(data: any): ParsedData[] {
  return [{
    food: data.product?.product_name || "",
    quantity: data.product?.quantity || "",
    image: data.product?.image_url || "",
    calories: data.product?.nutriments?.energy_100g || "",
    carbohydrates: data.product?.nutriments?.carbohydrates_100g || "",
    fat: data.product?.nutriments?.fat_100g || "",
    sugar: data.product?.nutriments?.sugars_100g || "",
    protein: data.product?.nutriments?.proteins_100g || "",
    ingredients: data.product?.ingredients?.map((ingredient: any) => ingredient.text) || []
  }];
}

export function parseDataNutritionix(data: any): ParsedData[] {
  return data.foods.map((food: any) => ({
    food: food.food_name || "",
    quantity: food.serving_qty ? `${food.serving_qty}${food.serving_unit}` : "",
    weight: food.serving_weight_grams ? `${food.serving_weight_grams}g` : "",
    image: food.photo?.highres || food.photo?.thumb || "",
    calories: food.nf_calories || "",
    carbohydrates: food.nf_total_carbohydrate || "",
    fat: food.nf_total_fat || "",
    sugar: food.nf_sugars || "",
    protein: food.nf_protein || "",
    ingredients: food.nf_ingredient_statement ? parseIngredients(food.nf_ingredient_statement) : []
  }));
}