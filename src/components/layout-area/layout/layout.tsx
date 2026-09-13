import { DietAdvisor } from "../../nutrition-area/diet-advisor/diet-advisor";
import { Header } from "../header/header";
import "./layout.css";

export function Layout() {

    return (

        <div className="Layout">

            <header>

                <Header />

            </header>

            <main className="layout-main">

                <DietAdvisor />

            </main>

        </div>

    );

}