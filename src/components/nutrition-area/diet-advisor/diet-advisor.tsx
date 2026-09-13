
import "./diet-advisor.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarDays, Ruler, Weight, Sprout, Sparkle, type LucideIcon } from "lucide-react";
import { UserDetails } from "../../../models/user-details";
import { MealPlanModel } from "../../../models/meal-plan-model";
import { nutritionService } from "../../../services/nutrition-service";
import { MealSection } from "../../meal-selection/meal-selection";
type Field =
    | { name: "age" | "height" | "weight"; label: string; placeholder: string; min: number; max: number; Icon: LucideIcon }
    | { name: "dietType"; label: string; Icon: LucideIcon; options: UserDetails["dietType"][] };
const fields: Field[] = [
    { name: "age", label: "Age", placeholder: "Enter age", min: 1, max: 120, Icon: CalendarDays },
    { name: "height", label: "Height (cm)", placeholder: "Enter height", min: 50, max: 250, Icon: Ruler },
    { name: "weight", label: "Weight (kg)", placeholder: "Enter weight", min: 3, max: 300, Icon: Weight },
    { name: "dietType", label: "Diet Type", Icon: Sprout, options: ["Regular", "Vegetarian", "Vegan", "Keto"] }
];
export function DietAdvisor() {
    const { register, handleSubmit } = useForm<UserDetails>();
    const [mealPlan, setMealPlan] = useState<MealPlanModel | null>(null);
    const [lang, setLang] = useState<"en" | "he">("en");
    const [isLoading, setIsLoading] = useState(false);
    const isEnglish = lang === "en";
async function send(user: UserDetails) {
    try {
        setIsLoading(true);
        const plan = await nutritionService.getMealPlan(user.age, user.height, user.weight, user.dietType);
        setMealPlan(plan);
        setLang("en");
    }
    catch (err) {
        console.error(err);
    }
    finally {
        setIsLoading(false);
    }
}

const sections = mealPlan ? [
    { icon: "🍳", en: "Breakfast", he: "ארוחת בוקר", enText: mealPlan.breakfast_en, heText: mealPlan.breakfast_he },
    { icon: "🥗", en: "Lunch", he: "ארוחת צהריים", enText: mealPlan.lunch_en, heText: mealPlan.lunch_he },
    { icon: "🍽️", en: "Dinner", he: "ארוחת ערב", enText: mealPlan.dinner_en, heText: mealPlan.dinner_he },
    { icon: "💧", en: "Hydration", he: "שתייה", enText: mealPlan.hydration_en, heText: mealPlan.hydration_he },
    { icon: "💡", en: "Healthy Tips", he: "טיפים", enText: mealPlan.tips_en, heText: mealPlan.tips_he },
    { icon: "⚠️", en: "Foods to Limit", he: "ממה להימנע", enText: mealPlan.warnings_en, heText: mealPlan.warnings_he }
] : [];

return (
    <div className={`DietAdvisor${mealPlan ? " DietAdvisor--has-result" : ""}`}>
        <main className="advisor-content">
            {!mealPlan && !isLoading && (
                <section className="recommendation-box">
                    <h3>Your AI Nutrition Coach</h3>
                    <p>
                        Build a personalized nutrition plan powered by AI.
                        Enter your age, height, weight and diet preference below,
                        then click Get Healthy Suggestions.
                    </p>
                </section>
            )}
        {isLoading && (

    <div className="loading-status">

        Generating your personalized nutrition plan...

    </div>

)}
            {mealPlan && !isLoading && (
                <section className="meal-plan-card" dir={isEnglish ? "ltr" : "rtl"} lang={lang} aria-labelledby="meal-plan-title">
                    <div className="meal-plan-toolbar">
                        <span className="meal-plan-badge"><Sparkle size={16} aria-hidden="true" />{isEnglish ? "Your daily plan" : "התוכנית היומית שלך"}</span>
                        <div className="language-toggle-container" role="group" aria-label={isEnglish ? "Plan language" : "שפת התוכנית"}>
                            <button type="button" lang="en" aria-pressed={isEnglish} className={`lang-btn ${isEnglish ? "active" : ""}`} onClick={() => setLang("en")}>
                                English
                            </button>
                            <button type="button" lang="he" aria-pressed={!isEnglish} className={`lang-btn ${!isEnglish ? "active" : ""}`} onClick={() => setLang("he")}>
                                עברית
                            </button>
                        </div>
                    </div>
                    <h2 id="meal-plan-title" className="meal-plan-title">{isEnglish ? mealPlan.title_en : mealPlan.title_he}</h2>
                    <div className="recommendation-content">
                        {sections.map(section => (
                            <MealSection
                                key={section.en}
                                icon={section.icon}
                                title={isEnglish ? section.en : section.he}
                                content={isEnglish ? section.enText : section.heText}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
        <form className="diet-form" onSubmit={handleSubmit(send)}>
            {fields.map(field => {
                const Icon = field.Icon;
                return (
                    <div className="field" key={field.name}>
                        <div className="field-icon"><Icon size={22} /></div>
                        <div className="field-content">
                            <label>{field.label}</label>
                            {"options" in field ? (
                                <select defaultValue="" {...register(field.name)} required>
                                    <option value="" disabled>Select one...</option>
                                    {field.options.map(option => <option value={option} key={option}>{option}</option>)}
                                </select>
                            ) : (
                                <input type="number" placeholder={field.placeholder} {...register(field.name)} min={field.min} max={field.max} required />
                            )}
                        </div>
                    </div>
                );
            })}
            <button type="submit" className="generate-btn" disabled={isLoading}>
                <Sparkle size={18} />
                <span>{isLoading ? "Generating..." : "Get Healthy Suggestions"}</span>
            </button>
        </form>
    </div>
);




 }




// import "./diet-advisor.css";
// import { useForm } from "react-hook-form";
// import { UserDetails } from "../../../models/user-details";
// import { gptService } from "../../../services/gpt";
// import { useState } from "react";

// export function DietAdvisor() {

//     const { register, handleSubmit } = useForm<UserDetails>();
//     const [recommendation, setRecommendation] = useState("");
//     const [isLoading, setIsLoading] = useState(false);


//    async function send(user: UserDetails) {
//         try {
//             setIsLoading(true);
//             setRecommendation("");
// const systemPrompt = "Act as a professional nutritionist. Provide a daily healthy diet meal plan based on the user's metrics. The recommendation must strictly include a detailed healthy menu divided into: Breakfast, Lunch, and Dinner.";

// const userPrompt = `Here are my details:
// - Age: ${user.age} years old
// - Height: ${user.height} cm
// - Weight: ${user.weight} kg
// - Diet Type: ${user.dietType}`;

// const completion = await gptService.getCompletion(systemPrompt, userPrompt);
//             setRecommendation(completion);
//         } catch (error) {
//             console.error(error);
//             setRecommendation("Sorry, we couldn't fetch your meal plan. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     }
//     return (
//         <div className="DietAdvisor">
         
//   <form onSubmit={handleSubmit(send)}>
               
//                 <label>Age: </label>
//                 <input type="number" {...register("age")} required min="1" max="120" />
                
//                 <label>Height (cm): </label>
//                 <input type="number" {...register("height")} required min="50" max="250" />

//                 <label>Weight (kg): </label>
//                 <input type="number" {...register("weight")} required min="3" max="300" />
 
 
//                 <label>Diet Type: </label>
//                 <select defaultValue="" {...register("dietType")} required>
//                     <option disabled value="">Select one...</option>
//                     <option>Regular</option>
//                     <option>Vegetarian</option>
//                     <option>Vegan</option>
//                     <option>Keto</option>
//                 </select>
 
//                <button disabled={isLoading}>
//                     {isLoading ? "Generating... ׳’ֲֲ³" : "Get Healthy Suggestions ׳ ֲֲֲ"}
//                 </button>
//             </form>
 
//             <hr />
 

//    {recommendation && !isLoading && (
//     <div className="recommendation-card">
//         <div className="advisor-badge">
//             <span className="ai-sparkle">׳’ֲֲ¨</span> AI Health Advisor
//         </div>
//         <div className="recommendation-content">
//             {recommendation}
//         </div>
//     </div>
// )}
//     </div>

//     );

// }

