export interface Common {
  nix_item_id: string;
  __typename: string;
  food_name: string;
  photo: {
    thumb: string;
  };
  serving_qty: number;
  serving_unit: string;
}

export interface Branded {
  __typename: string;
  food_name: string;
  nf_calories: number;
  nix_item_id: string;
  photo: {
    thumb: string;
  };
  serving_qty: number;
  serving_unit: string;
}

export interface UserParams {
  user_id?: number;
  email: string;
  password: string;
  isOAuth: number;
  created_at?: string;
};

export interface ProfileParams {
  id?: number;
  user_id?: number;
  name: string;
  date_of_birth: string;
  gender: string;
  height: number;
  weight: number;
  updated_at?: string;
};

export interface DietParams {
  id?: number;
  user_id?: number;
  activity_level: string;
  health_goal: string;
  updated_at?: string;
};

export interface IntakeParams {
  id?: number;
  user_id?: number;
  calories: number;
  carbohydrates: number;
  sugar: number;
  fats: number;
  protein: number;
  updated_at?: string;
};

export interface ConsumptionParams {
  history_id?: number;
  user_id: number;
  consumed_at?: string;
  food_id: string;
  food_image: string;
  food_name: string;
  calories: number;
  carbohydrates: number;
  sugar: number;
  fats: number;
  protein: number;
};