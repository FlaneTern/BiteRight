import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_NUTRITIONIX_API_URL!;

export interface fetchNutrientsParams {
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

export async function fetchItemById(queryType: "upc" | "nix_item_id", id: string) {
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
    "query": params.query,
    "num_servings": params.num_servings ?? 1,
    "include_subrecipe": true
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