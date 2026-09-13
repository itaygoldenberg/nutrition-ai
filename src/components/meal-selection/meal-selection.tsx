import "./meal-selection.css";

interface MealSectionProps {
    icon: string;
    title: string;
    content: string[];
}

export function MealSection({
    icon,
    title,
    content
}: MealSectionProps) {

    return (

        <div className="MealSection">

            <h3>

                <span>{icon}</span>

                {title}

            </h3>

            <ul>

                {content.map((item, index) => (

                    <li key={index}>

                        {item}

                    </li>

                ))}

            </ul>

        </div>

    );

}