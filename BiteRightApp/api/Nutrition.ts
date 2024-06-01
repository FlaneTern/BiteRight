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

interface TransformedData {
  code: string;
  product: Product;
  status: number;
  status_verbose: string;
}

export async function searchItems(query: string) {
  const url = `${baseURL}/v2/search/instant/?query=${query}`;
  const headers = {
    "Content-Type": "application/json",
    "x-app-id": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_ID,
    "x-app-key": process.env.EXPO_PUBLIC_NUTRITIONIX_APP_KEY,
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

export async function searchByBarcodes(code: string) {
  try {
    const response = await axios.get<Partial<TransformedData>>(`https://en.openfoodfacts.net/api/v2/product/${code}?fields=product_name,ingredients,nutriments,image_url,quantity`);
    const data = response.data;

    const transformedData: TransformedData = {
      code: data.code || "",
      product: {
        image_url: data.product?.image_url || "",
        ingredients: data.product?.ingredients?.map((ingredient: Ingredient) => ({
          text: ingredient.text,
          vegan: ingredient.vegan || null,
          vegetarian: ingredient.vegetarian || null
        })) || [],
        nutriments: Object.keys(data.product?.nutriments || {}).reduce((acc: Nutriments, key: string) => {
          if (/_unit$|_100g$/.test(key)) {
            acc[key] = data.product!.nutriments[key];
          }
          return acc;
        }, {} as Nutriments),
        product_name: data.product?.product_name || "",
        quantity: data.product?.quantity || ""
      },
      status: data.status || 0,
      status_verbose: data.status_verbose || ""
    };

    console.log(JSON.stringify(transformedData, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}