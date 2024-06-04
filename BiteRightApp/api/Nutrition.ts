import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_NUTRITIONIX_API_URL!;

interface Ingredient {
  text: string;
  vegan: string | null;
  vegetarian: string | null;
}

interface Nutriments {
  [key: string]: string | number;
}

interface Product {
  image_url: string;
  ingredients?: Ingredient[];
  nutriments: Nutriments;
  product_name: string;
  quantity?: string;
}

interface fetchNutrientsParams {
  query: string;
  num_servings?: number;
  aggregate?: string;
  line_delimited?: boolean;
  use_raw_foods?: boolean;
  include_subrecipe?: boolean;
  timezone?: string;
  consumed_at?: string;
  use_branded_foods?: boolean;
  taxonomy?: boolean;
  ingredient_statement?: boolean;
  last_modified?: boolean;
}

export async function fetchItemsByName(query: string) {
  const url = `${baseURL}/v2/search/instant/?query=${query}`;
  const headers = {
    "Content-Type": "application/json",
    "x-app-id": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_ID,
    "x-app-key": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_KEY,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchItemById(queryType: 'upc' | 'nix_item_id', id: string) {
  const url = `${baseURL}/v2/search/item/?${queryType}=${id}`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-app-id": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_ID!,
    "x-app-key": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_KEY!,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function fetchNutrients(params: fetchNutrientsParams) {
  const url = `${baseURL}/v2/natural/nutrients`;
  const headers = {
    "Content-Type": "application/json",
    "x-app-id": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_ID,
    "x-app-key": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_KEY,
  };
  const body = {
    query: params.query,
    num_servings: params.num_servings ?? 1,
    aggregate: params.aggregate ?? null,
    line_delimited: params.line_delimited ?? false,
    use_raw_foods: params.use_raw_foods ?? false,
    include_subrecipe: params.include_subrecipe ?? false,
    timezone: params.timezone ?? 'US/Eastern',
    consumed_at: params.consumed_at ?? null,
    use_branded_foods: params.use_branded_foods ?? false,
    taxonomy: params.taxonomy ?? false,
    ingredient_statement: params.ingredient_statement ?? false,
    last_modified: params.last_modified ?? false
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchItemsByEAN(code: string) {
  try {
    const response = await axios.get(`https://en.openfoodfacts.net/api/v2/product/${code}?fields=product_name,ingredients,nutriments,image_url,quantity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}