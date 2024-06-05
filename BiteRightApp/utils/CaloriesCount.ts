export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very active" | "extra active";
export type Goal = "lose" | "maintain" | "gain";

interface User {
  dateOfBirth: string;
  gender: string;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  healthGoal: Goal;
}

export interface Macronutrients {
  carbohydrates: number;
  sugar: number;
  fat: number;
  protein: number;
}

const calculateBMR = (age: number, gender: Gender, height: number, weight: number): number => {
  if (gender === "male") {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

const activityMultipliers: Record<ActivityLevel, number> = {
  "sedentary": 1.2,
  "light": 1.375,
  "moderate": 1.55,
  "active": 1.725,
  "very active": 1.9,
  "extra active": 2.0,
};

const adjustForActivityLevel = (bmr: number, activityLevel: ActivityLevel): number => {
  return bmr * activityMultipliers[activityLevel];
};

const adjustForGoal = (tdee: number, goal: Goal): number => {
  if (goal === "lose") {
    return tdee - 500;
  } else if (goal === "gain") {
    return tdee + 500;
  } else {
    return tdee;
  }
};

export const calculateCalories = (user: User): number => {
  const { dateOfBirth, gender, height, weight, activityLevel, healthGoal } = user;

  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  const bmr = calculateBMR(age, gender as Gender, height, weight);
  const tdee = adjustForActivityLevel(bmr, activityLevel);

  return Math.round(adjustForGoal(tdee, healthGoal));
}

export const calculateMacronutrients = (calories: number): Macronutrients => {
  const carbsGrams = {
    min: 0.45 * calories / 4,
    max: 0.65 * calories / 4,
  }

  const sugarGrams = 0.10 * calories / 4;

  const fatGrams = {
    min: 0.20 * calories / 9,
    max: 0.35 * calories / 9,
  }

  const proteinGrams = {
    min: 0.10 * calories / 4,
    max: 0.35 * calories / 4,
  }

  return {
    carbohydrates: Math.ceil((carbsGrams.min + carbsGrams.max) / 2),
    sugar: Math.ceil(sugarGrams),
    fat: Math.ceil((fatGrams.min + fatGrams.max) / 2),
    protein: Math.ceil((proteinGrams.min + proteinGrams.max) / 2),
  }
}
