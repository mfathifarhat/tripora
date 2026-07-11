import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("itinerary", "routes/itinerary.jsx"),
	route("payment", "routes/payment.tsx"),
	route("about", "routes/about.tsx"),
	route("social", "routes/sosmed.tsx"),
	route("reward", "routes/reward.tsx"),
] satisfies RouteConfig;
