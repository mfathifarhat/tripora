import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tripora — All in One Travel Ecosystem" },
    { name: "description", content: "Your entire trip, all in one web. Tripora keeps travel simple and connected." },
  ];
}

export default function Home() {
  return <Welcome />;
}
