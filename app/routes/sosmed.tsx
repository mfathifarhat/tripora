import type { Route } from "./+types/home";
import Sosmed from "../pages/welcome/sosmed";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Social Media - Tripora" },
        { name: "description", content: "Connect with Tripora on social media" },
    ];
}

export default function Home() {
    return <Sosmed />;
}