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

export interface ParsedData {
  code: string;
  product: Product;
  status: number,
  status_verbose: string;
}

export const parseData = (data: any): any[] => {
  return [
    { code: data.code || "" },
    {
      product: {
        image_url: data.product?.image_url || "",
        ingredients: data.product?.ingredients?.map((ingredient: Ingredient) => ({
          text: ingredient.text,
          vegan: ingredient.vegan || null,
          vegetarian: ingredient.vegetarian || null
        })) || [],
        nutriments: Object.keys(data.product?.nutriments || {}).reduce((acc: Nutriments, key: string) => {
          if (/_unit$|_100g$/.test(key)) {
            acc[key] = data.product.nutriments[key];
          }
          return acc;
        }, {} as Nutriments),
        product_name: data.product?.product_name || "",
        quantity: data.product?.quantity || ""
      }
    },
    { status: data.status || 0 },
    { status_verbose: data.status_verbose || "" }
  ];
}