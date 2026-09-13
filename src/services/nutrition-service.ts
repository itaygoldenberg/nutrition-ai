import { MealPlanModel } from "../models/meal-plan-model";
import { gptService } from "./gpt";

class NutritionService {

    public async getMealPlan(
        age: number,
        height: number,
        weight: number,
        dietType: string
    ): Promise<MealPlanModel> {

        const systemPrompt = `
You are an expert registered clinical nutritionist.

Generate realistic, practical and healthy daily meal plans.

Always return ONLY valid JSON.

Never use markdown.

Never wrap the JSON inside code fences.

Never add explanations before or after the JSON.
`;

        const userPrompt = `
Generate a personalized daily nutrition plan.

User Details:

Age: ${age}
Height: ${height} cm
Weight: ${weight} kg
Diet Type: ${dietType}

Return ONLY this JSON:

{
    "title_en": "",
    "title_he": "",

    "breakfast_en": [],
    "breakfast_he": [],

    "lunch_en": [],
    "lunch_he": [],

    "dinner_en": [],
    "dinner_he": [],

    "hydration_en": [],
    "hydration_he": [],

    "tips_en": [],
    "tips_he": [],

    "warnings_en": [],
    "warnings_he": []
}

Rules:

- English fields must contain English only.
- Hebrew fields must contain Hebrew only.

- title_en should be a short title like:
  "Balanced Daily Meal Plan"

- title_he should be the Hebrew equivalent.

- Each meal array must contain between 4 and 7 items.

- Every item should describe ONE food or ONE recommendation only.

- Use realistic serving sizes such as:
  grams, cups, tablespoons, slices or pieces.

- Tailor the recommendations to the user's:
  age, height, weight and diet type.

- Do not repeat the same foods across multiple meals unless necessary.

- Hydration, tips and warnings must also be arrays.

- Do NOT write paragraphs.

- Do NOT use markdown.

- Do NOT use numbering.

- Keep every array item under 12 words.

Example:

"breakfast_en": [
    "250 g Greek yogurt",
    "40 g oats",
    "1 banana",
    "1 tbsp chia seeds",
    "10 almonds"
]

Return ONLY valid JSON.
`;

        const completion = await gptService.getCompletion(
            systemPrompt,
            userPrompt
        );

        return JSON.parse(completion) as MealPlanModel;

    }

}

export const nutritionService = new NutritionService();