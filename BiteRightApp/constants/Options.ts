import { ConsumptionParams } from "./Interfaces";

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const activityLevelOptions = [
  { label: "Sedentary (little to no exercise)", value: "sedentary" },
  {
    label: "Light (little exercise 1-3 days a week)",
    value: "light",
  },
  {
    label: "Moderate (moderate exercise 4-5 days a week)",
    value: "moderate",
  },
  {
    label: "Active (daily / intense exercise 3-4 days a week)",
    value: "active",
  },
  {
    label: "Very Active (intense exercise 6-7 days a week)",
    value: "very active",
  },
  {
    label: "Extra Active (intensive exercise daily / physical job)",
    value: "extra active",
  },
];

export const goalOptions = [
  { label: "Lose Weight", value: "lose" },
  { label: "Maintain Weight", value: "maintain" },
  { label: "Gain Weight", value: "gain" },
];

export const recommendedItem: ConsumptionParams[] = [
  {
    calories: 212,
    carbohydrates: 2.1,
    fats: 2.3,
    food_id: "5411188099154",
    food_name: "Simply plain - soya yogurt",
    food_image: "https://images.openfoodfacts.net/images/products/541/118/809/9154/front_en.107.400.jpg",
    protein: 4,
    sugar: 2.1,
  },
  {
    calories: 1727,
    carbohydrates: 61,
    fats: 18,
    food_id: "3175681105423",
    food_name: "Gerblé - Sugar Free Cocoa Chip Cookie, 130g (4.6oz)",
    food_image: "https://images.openfoodfacts.net/images/products/317/568/110/5423/front_en.80.400.jpg",
    protein: 8,
    sugar: 0,
  },
  {
    calories: 1979,
    carbohydrates: 61.5,
    fats: 19.8,
    food_id: "8410076801197",
    food_name: "Crunchy Granola Oats",
    food_image: "https://images.openfoodfacts.net/images/products/841/007/680/1197/front_en.29.400.jpg",
    protein: 8.7,
    sugar: 26.8,
  }
]