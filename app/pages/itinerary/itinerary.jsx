import * as React from "react";
import { useNavigate } from "react-router";
import { Layout } from "../../components/Layout";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	CalendarDays,
	CircleDollarSign,
	DollarSign,
	LocateFixed,
	MapPin,
	MapPinned,
	Trash,
	User,
	X,
	BookOpen,
	ShieldAlert,
	Lightbulb,
	Sparkles,
	Send,
	Globe,
	Check,
	Link as LinkIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePickerSimple } from "@/components/DatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
	Map,
	MapMarker,
	MarkerContent,
	MarkerPopup,
	MarkerTooltip,
} from "@/components/ui/map";
import { Input } from "@/components/ui/input";

const items = [
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
	{ label: "System", value: "system" },
];

const locations = [
	{
		id: 1,
		name: "Beratan Lake",
		lng: 115.17178688796352,
		lat: -8.273771536934301,
		color: "bg-yellow-500",
	},
	{
		id: 2,
		name: "Mount Bromo",
		lng: 112.95309798404486,
		lat: -7.941983278979867,
		color: "bg-yellow-500",
	},
	{
		id: 3,
		name: "Borobudur Temple",
		lng: 110.20384785952001,
		lat: -7.60794824074962,
		color: "bg-green-500!",
	},
	{
		id: 4,
		name: "Dieng Plateau",
		lng: 109.91587990220384,
		lat: -7.20316829334937,
		color: "bg-green-500!",
	},
];

const placeDetails = {
	"Beratan Lake": {
		name: "Beratan Lake",
		fullName: "Pura Ulun Danu Bratan",
		location: "Bedugul, Candikuning, Baturiti, Tabanan Regency, Bali",
		category: "Lake • Temple • Cultural",
		image: "/images/bali.jpg",
		story: "Pura Ulun Danu Bratan, or often called the Water Temple, is one of the most iconic Hindu temples in Bali, founded in 1633. Situated on the shores of Lake Bratan in the foggy Bedugul highlands, this temple is dedicated to Dewi Danu, the goddess of water, rivers, and lakes, who is essential for Bali's traditional subak irrigation system. The multi-tiered temple towers appearing to float on the water against a mountain backdrop create a mystical and sacred landscape for Balinese Hindus.",
		rules: [
			{
				text: "It is mandatory to wear respectful clothing covering shoulders and knees. Sarongs or sashes are usually provided near the entrance.",
				type: "mandatory",
			},
			{
				text: "Entering the main sacred area of the temple (Utamaning Mandala) is prohibited except for worship/prayer purposes.",
				type: "prohibited",
			},
			{
				text: "Littering in the lake or temple gardens is prohibited to maintain the sanctity of the place.",
				type: "prohibited",
			},
			{
				text: "Flying drones over the temple area requires written permission from the local management.",
				type: "caution",
			},
		],
		tips: [
			{
				title: "Visit in the Morning",
				desc: "Arrive between 07:00 - 09:00 AM when the air is cool, the sunlight is soft, and the lake surface is calm to capture a perfect reflection of the temple before the midday fog descends.",
			},
			{
				title: "Rent a Traditional Jukung",
				desc: "Rent a jukung (traditional wooden boat) or speedboat around the lake to view the floating temple from a unique perspective on the water.",
			},
			{
				title: "Prepare Warm Clothes",
				desc: "Since it is located at an altitude of 1,200 meters above sea level, the temperature in the Bedugul area is quite cold and rain can drop suddenly in the afternoon. Bring a jacket or umbrella.",
			},
		],
	},
	"Mount Bromo": {
		name: "Mount Bromo",
		fullName: "Gunung Bromo",
		location:
			"Tengger Caldera Area, Pasuruan & Probolinggo Regency, East Java",
		category: "Volcano • Adventure • Hiking",
		image: "/images/bromo.jpg",
		story: "Mount Bromo is an active volcano standing at 2,329 meters, famous in East Java for its moon-like landscape. The name Bromo is derived from the Javanese pronunciation of 'Brahma', the Hindu creator god. For the Tengger tribe (local Hindus), this mountain is highly sacred. Every year, they hold the Yadnya Kasada ceremony, offering fruits, vegetables, livestock, and money into the active crater to pray for safety and blessings.",
		rules: [
			{
				text: "It is mandatory to comply with the minimum safe distance set by PVMBG and prohibited to cross the crater boundary fence.",
				type: "mandatory",
			},
			{
				text: "Respect the sanctity of Pura Luhur Poten at the foot of the mountain; any acts of vandalism or disrespectful behavior are prohibited.",
				type: "prohibited",
			},
			{
				text: "Driving private motorcycles or cars without a licensed local guide/jeep in the Sea of Sand area is prohibited for safety reasons.",
				type: "prohibited",
			},
			{
				text: "Wearing a protective mask is mandatory as fine sand dust and sulfur gases from the crater are often very dense.",
				type: "mandatory",
			},
		],
		tips: [
			{
				title: "Sunrise at Penanjakan",
				desc: "Rent a 4x4 jeep the day before and depart at 03:00 AM to Penanjakan 1 or King Kong Hill to witness one of the most beautiful sunrises in the world with the majestic Mount Semeru in the background.",
			},
			{
				title: "Dress in Layers",
				desc: "Temperatures before dawn at the viewpoints can drop to 5°C - 10°C. Wear warm layered clothing (thick jacket, scarf, beanie, gloves) to easily adjust as the day warms up.",
			},
			{
				title: "Protect Eyes and Breathing",
				desc: "Bring sunglasses and spare masks. Strong winds in the Sea of Sand can blow volcanic dust, which is highly irritating to the eyes and respiratory system.",
			},
		],
	},
	"Borobudur Temple": {
		name: "Borobudur Temple",
		fullName: "Candi Borobudur",
		location: "Magelang Regency, Central Java, Indonesia",
		category: "Temple • Historical • UNESCO Heritage",
		image: "/images/borobudur.jpg",
		story: "Borobudur Temple is the largest Buddhist temple in the world, built in the 9th century during the Sailendra Dynasty. The temple structure is shaped like a giant mandala symbolizing Buddhist cosmology, consisting of 9 stacked platforms (6 square and 3 circular) and a main stupa at the top. The walls are decorated with 2,672 detailed relief panels and 504 Buddha statues. The temple lay abandoned for centuries under layers of Mount Merapi's volcanic ash and dense jungle before being rediscovered in 1814.",
		rules: [
			{
				text: "It is mandatory to wear the special 'Upanat' sandals provided to minimize wear on the temple stones.",
				type: "mandatory",
			},
			{
				text: "Touching the relief panels, climbing the stupas, or sitting on the Buddha statues is strictly prohibited.",
				type: "prohibited",
			},
			{
				text: "It is mandatory to be accompanied by a certified local guide when climbing up the temple structure.",
				type: "mandatory",
			},
			{
				text: "Maintain quiet, respect, and do not litter throughout the temple complex.",
				type: "mandatory",
			},
		],
		tips: [
			{
				title: "Book Tickets Well in Advance",
				desc: "Daily quotas to climb the temple structure are strictly limited (around 1,200 visitors per day). Make sure to book 'Naik Candi' category tickets online weeks before departure.",
			},
			{
				title: "Visit the Morning Slot",
				desc: "Choose the first visit slot (08:30 AM) to enjoy the quiet temple atmosphere before the hot midday sun sets in.",
			},
			{
				title: "Prepare Sun Protection",
				desc: "The temple area is very open with few shade trees. Bring an umbrella, hat, sunglasses, and sunscreen to ensure a comfortable visit.",
			},
		],
	},
	"Dieng Plateau": {
		name: "Dieng Plateau",
		fullName: "Dataran Tinggi Dieng",
		location:
			"Kejajar District, Wonosobo & Banjarnegara Regency, Central Java",
		category: "Plateau • Geothermal • Ancient Temples",
		image: "/images/dieng.jpg",
		story: "Often referred to as the 'Land Above the Clouds', the Dieng Plateau is an ancient volcanic caldera located at an altitude of approximately 2,000 meters above sea level. Dieng holds some of the oldest Hindu temples in Java dating back to the 8th century. The area is famous for its natural panoramas shrouded in mystical mist, active bubbling sulfur craters like Sikidang Crater, colorful volcanic lakes (Telaga Warna), and local Carica fruit farms.",
		rules: [
			{
				text: "It is mandatory to stay on the wooden boardwalk path when exploring Sikidang Crater to avoid hot mud splatters and toxic gas vents.",
				type: "mandatory",
			},
			{
				text: "Climbing the temple stones or damaging archaeological sites in the Arjuna Temple complex is prohibited.",
				type: "prohibited",
			},
			{
				text: "Always stay alert to extreme weather changes and sudden thick fog descending on the mountain roads.",
				type: "caution",
			},
		],
		tips: [
			{
				title: "Golden Sunrise at Sikunir Hill",
				desc: "Wake up at 04:00 AM and hike for 30-45 minutes to the peak of Sikunir Hill to enjoy the breathtaking 'Golden Sunrise' view over a sea of clouds.",
			},
			{
				title: "Taste Mie Ongklok & Carica",
				desc: "Warm your body by eating Mie Ongklok, a local Wonosobo thick-gravy noodle, and try the sweet Carica (mountain papaya) which only grows in Dieng.",
			},
			{
				title: "Frost Phenomenon (Embun Upas)",
				desc: "If visiting during the dry season peak (July - August), wake up before sunrise to see the frost looking like snow covering agricultural fields around Arjuna Temple.",
			},
		],
	},
};

function LocalStoryModal({ isOpen, onClose, detail }) {
	React.useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.body.style.overflow = "unset";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen || !detail) return null;

	return (
		<div className="fixed inset-0 z-100 bg-slate-100 text-slate-800 flex flex-col md:flex-row h-screen w-screen overflow-hidden animate-in fade-in duration-300">
			{/* Left Pane - Hero Image (Full screen height on desktop, 40vh on mobile) */}
			<div className="relative w-full h-[40vh] md:w-5/12 md:h-full shrink-0 overflow-hidden">
				<img
					src={detail.image}
					alt={detail.fullName}
					className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10000ms] ease-out"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/35 md:bg-gradient-to-r md:from-transparent md:to-slate-950/70 z-10"></div>

				{/* Desktop bottom overlay for contrast */}
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 hidden md:block"></div>

				{/* Title overlay */}
				<div className="absolute bottom-6 left-6 right-6 z-20 md:bottom-12 md:left-12 md:right-12">
					<span className="inline-block bg-blue-650/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-500/30 mb-2">
						{detail.category}
					</span>
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
						{detail.fullName}
					</h2>
					<div className="flex items-center gap-1.5 text-slate-350 text-sm md:text-base mt-2">
						<MapPin className="size-4 text-red-400 shrink-0" />
						<span className="truncate text-white">
							{detail.location}
						</span>
					</div>
				</div>
			</div>

			{/* Right Pane - Scrollable Content */}
			<div className="flex-1 h-[60vh] md:h-full flex flex-col bg-white relative text-slate-800">
				{/* Floating Close Button */}
				<button
					onClick={onClose}
					className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-slate-100/90 text-slate-700 rounded-full border border-slate-200 shadow-md transition-all cursor-pointer z-30 flex items-center justify-center hover:scale-105 active:scale-95"
					aria-label="Close modal"
				>
					<X className="size-6" />
				</button>

				{/* Scrollable details wrapper */}
				<div className="flex-1 overflow-y-auto p-6 md:p-12 md:pt-24 space-y-10 custom-scrollbar">
					{/* Local Story */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold flex items-center gap-2.5 text-blue-600">
							<BookOpen className="size-6" />
							Local Story & History
						</h3>
						<p className="text-slate-650 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
							{detail.story}
						</p>
					</div>

					{/* Rules & Etiquette */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold flex items-center gap-2.5 text-amber-600">
							<ShieldAlert className="size-6" />
							Rules & Regulations
						</h3>
						<div className="grid gap-3.5">
							{detail.rules.map((rule, idx) => {
								let borderClass =
									"border-slate-100 bg-slate-50/50";
								let badgeClass =
									"bg-slate-105 text-slate-500 border border-slate-200";
								let badgeText = "Info";

								if (rule.type === "mandatory") {
									borderClass =
										"border-emerald-200 bg-emerald-50/30 text-slate-800";
									badgeClass =
										"bg-emerald-100 text-emerald-750 border border-emerald-200";
									badgeText = "Mandatory";
								} else if (rule.type === "prohibited") {
									borderClass =
										"border-rose-200 bg-rose-50/30 text-slate-800";
									badgeClass =
										"bg-rose-100 text-rose-750 border border-rose-200";
									badgeText = "Prohibited";
								} else if (rule.type === "caution") {
									borderClass =
										"border-amber-200 bg-amber-50/30 text-slate-800";
									badgeClass =
										"bg-amber-100 text-amber-750 border border-amber-200";
									badgeText = "Caution";
								}

								return (
									<div
										key={idx}
										className={`flex items-start gap-4 p-4 rounded-2xl border ${borderClass}`}
									>
										<span
											className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-md ${badgeClass} shrink-0 mt-0.5`}
										>
											{badgeText}
										</span>
										<p className="text-slate-700 text-sm md:text-base leading-relaxed">
											{rule.text}
										</p>
									</div>
								);
							})}
						</div>
					</div>

					{/* Tips & Tricks */}
					<div className="space-y-4 pb-8">
						<h3 className="text-xl font-bold flex items-center gap-2.5 text-emerald-600">
							<Lightbulb className="size-6" />
							Travel Tips & Tricks
						</h3>
						<div className="grid gap-4">
							{detail.tips.map((tip, idx) => (
								<div
									key={idx}
									className="flex gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 items-start"
								>
									<div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0">
										<Sparkles className="size-6" />
									</div>
									<div className="space-y-1">
										<h4 className="font-bold text-base text-slate-800">
											{tip.title}
										</h4>
										<p className="text-slate-650 text-sm leading-relaxed">
											{tip.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Modal Footer */}
				<div className="p-6 bg-white border-t border-slate-100 flex justify-end shrink-0">
					<button
						onClick={onClose}
						className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm md:text-base font-semibold rounded-full shadow-lg shadow-blue-600/10 transition-all cursor-pointer border-0 hover:scale-105 active:scale-95"
					>
						Done Reading
					</button>
				</div>
			</div>
		</div>
	);
}

function CollabModal({ isOpen, onClose }) {
	const [activeTab, setActiveTab] = React.useState("share");
	const [email, setEmail] = React.useState("");
	const [role, setRole] = React.useState("Can Edit");
	const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);
	const [isLinkRoleDropdownOpen, setIsLinkRoleDropdownOpen] = React.useState(false);
	const [linkRole, setLinkRole] = React.useState("Can Edit");
	const [collaborators, setCollaborators] = React.useState([
		{ name: "Delia Andini", email: "deliaandini32@gmail.com", role: "Owner", isOwner: true, initials: "DA", color: "bg-blue-50 text-blue-800 border-blue-100" }
	]);
	const [isCopied, setIsCopied] = React.useState(false);

	React.useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.body.style.overflow = "unset";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleAddCollaborator = (e) => {
		e.preventDefault();
		if (!email.trim()) return;
		const name = email.split("@")[0];
		const initials = name.substring(0, 2).toUpperCase();
		
		// Random colors for avatars
		const colors = [
			"bg-blue-50 text-blue-800 border-blue-100",
			"bg-emerald-50 text-emerald-800 border-emerald-100",
			"bg-purple-50 text-purple-800 border-purple-100",
			"bg-rose-50 text-rose-800 border-rose-100",
			"bg-teal-50 text-teal-800 border-teal-100"
		];
		const randomColor = colors[Math.floor(Math.random() * colors.length)];

		setCollaborators([
			...collaborators,
			{ name, email, role, isOwner: false, initials, color: randomColor }
		]);
		setEmail("");
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText("https://tripora.com/itinerary/bali-trip-2026");
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div className="fixed inset-0 z-110 flex items-center justify-center p-4 animate-in fade-in duration-200">
			{/* Backdrop overlay */}
			<div 
				onClick={onClose} 
				className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
			/>

			{/* Modal Box */}
			<div className="relative w-full max-w-lg bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-20 animate-in zoom-in-95 duration-250">
				
				{/* Top Nav & Close Button */}
				<div className="flex items-center justify-between border-b border-slate-100 px-8 pt-6 relative bg-white">
					<div className="flex gap-6">
						<button 
							type="button"
							onClick={() => setActiveTab("share")}
							className={`pb-4 text-base font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
								activeTab === "share" 
									? "border-blue-600 text-blue-600" 
									: "border-transparent text-slate-400 hover:text-slate-600"
							}`}
						>
							Share
						</button>
						<button 
							type="button"
							onClick={() => setActiveTab("publish")}
							className={`pb-4 text-base font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
								activeTab === "publish" 
									? "border-blue-600 text-blue-600" 
									: "border-transparent text-slate-400 hover:text-slate-600"
							}`}
						>
							Publish
						</button>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
						aria-label="Close modal"
					>
						<X className="size-5" />
					</button>
				</div>

				{activeTab === "share" ? (
					<div className="p-8 flex flex-col space-y-6">
						{/* Title */}
						<div className="text-left">
							<h3 className="text-xl font-bold tracking-tight text-slate-950">
								Share with people
							</h3>
						</div>

						{/* Form field */}
						<form onSubmit={handleAddCollaborator} className="flex gap-3">
							<div className="flex-1 flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 relative focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
								<input
									type="email"
									required
									placeholder="Invite by email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="flex-1 bg-transparent border-0 outline-none text-slate-800 placeholder-slate-400 text-sm"
								/>
								
								{/* Can Edit dropdown selector */}
								<div className="relative">
									<button
										type="button"
										onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
										className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors border-l border-slate-150 pl-3 ml-2 cursor-pointer h-5 bg-transparent border-t-0 border-b-0 border-r-0"
									>
										{role}
										<span className="text-[10px] transform rotate-90 inline-block font-mono">▸</span>
									</button>

									{isRoleDropdownOpen && (
										<div className="absolute right-0 top-7 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-28 z-30 animate-in fade-in duration-100">
											{["Can Edit", "Can View"].map((r) => (
												<button
													key={r}
													type="button"
													onClick={() => {
														setRole(r);
														setIsRoleDropdownOpen(false);
													}}
													className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer border-0 bg-transparent"
												>
													{r}
												</button>
											))}
										</div>
									)}
								</div>
							</div>

							<button
								type="submit"
								className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md shadow-blue-500/10 cursor-pointer shrink-0 border-0"
							>
								<Send className="size-4" />
								Send Invite
							</button>
						</form>

						{/* Collaborators list */}
						<div className="space-y-4 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
							{collaborators.map((c, idx) => (
								<div key={idx} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className={`size-10 rounded-full flex items-center justify-center font-bold border text-sm shadow-sm shrink-0 ${c.color}`}>
											{c.initials}
										</div>
										<div className="flex flex-col text-left">
											<span className="text-sm font-extrabold text-slate-900">
												{c.name}
											</span>
											<span className="text-xs text-slate-500">
												{c.email}
											</span>
										</div>
									</div>
									<div className="text-sm text-slate-500 pr-4 font-semibold">
										{c.isOwner ? "Owner" : c.role}
									</div>
								</div>
							))}
						</div>

						{/* Anyone with the link card */}
						<div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-white rounded-xl text-slate-600 border border-slate-100 shadow-sm shrink-0">
									<Globe className="size-5" />
								</div>
								<div className="flex flex-col text-left">
									<span className="text-sm font-bold text-slate-800">
										Anyone with the link
									</span>
								</div>
							</div>

							<div className="relative">
								<button
									type="button"
									onClick={() => setIsLinkRoleDropdownOpen(!isLinkRoleDropdownOpen)}
									className="flex items-center gap-1 text-xs font-extrabold text-slate-600 hover:text-slate-800 pr-3 cursor-pointer bg-transparent border-0"
								>
									{linkRole}
									<span className="text-[10px] transform rotate-90 inline-block font-mono">▸</span>
								</button>

								{isLinkRoleDropdownOpen && (
									<div className="absolute right-0 top-6 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-28 z-30 animate-in fade-in duration-100">
										{["Can Edit", "Can View"].map((r) => (
											<button
												key={r}
												type="button"
												onClick={() => {
													setLinkRole(r);
													setIsLinkRoleDropdownOpen(false);
												}}
												className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer border-0 bg-transparent"
											>
												{r}
											</button>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="p-8 flex flex-col space-y-5">
						<div className="text-left">
							<h3 className="text-xl font-bold tracking-tight text-slate-900">
								Publish itinerary
							</h3>
						</div>
						<p className="text-sm text-slate-600 leading-relaxed text-left">
							Publish this planner publicly so other travelers on Tripora can view, duplicate, and find inspiration from your beautiful itinerary.
						</p>
						<div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex items-center justify-between">
							<div className="text-left">
								<h4 className="text-sm font-bold text-slate-800">Visibility</h4>
								<p className="text-xs text-slate-500 mt-0.5">Currently: Private (only shared people can access)</p>
							</div>
							<button type="button" className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer border-0">
								Publish Now
							</button>
						</div>
					</div>
				)}

				{/* Copy link Footer */}
				<div className="border-t border-slate-100 p-6 bg-slate-50/50 flex items-center justify-between shrink-0">
					<button
						type="button"
						onClick={handleCopyLink}
						className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-all cursor-pointer bg-transparent border-0 outline-none"
					>
						{isCopied ? (
							<>
								<Check className="size-4 text-emerald-600 animate-bounce" />
								<span className="text-emerald-700 font-extrabold">Link copied!</span>
							</>
						) : (
							<>
								<LinkIcon className="size-4" />
								Copy planner link
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export function ItineraryPage() {
	const navigate = useNavigate();
	const [activeDetail, setActiveDetail] = React.useState(null);
	const [isCollabOpen, setIsCollabOpen] = React.useState(false);
	return (
		<Layout>
			<section
				className="relative flex flex-col items-center justify-center pt-52 pb-28 min-h-[60vh] px-4 bg-slate-900 sm:px-8 md:px-12 text-center text-white bg-cover bg-center"
				style={{ backgroundImage: `url('/images/bromo.jpg')` }}
			>
				{/* Overlays */}
				<div className="bg-overlay"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/70 z-[1] pointer-events-none"></div>

				{/* Hero copy */}
				<div className="relative z-10 flex flex-col items-center justify-center text-center w-full pt-24">
					<span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-500/20">
						Trip Planner
					</span>
					<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
						Plan Your Dream Trip
					</h1>
					<p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
						Create, customize, and collaborate on your dream travel
						schedule in one powerful dashboard.
					</p>
				</div>
			</section>

			<section className="pb-28 px-4 sm:px-8 md:px-12 text-center text-white flex items-center justify-center">
				<div className="grid md:grid-cols-5 w-full">
					<Card className="md:col-start-2 col-span-3 -mt-24 z-10 p-8 shadow-md">
						<CardContent className="p-0">
							<div className="grid md:grid-cols-3 gap-8 w-full">
								<div className="flex flex-col space-y-8">
									<div className="form-group flex items-center space-x-5">
										<LocateFixed />

										<div className="w-full">
											<Label className="mb-3">
												Your Location
											</Label>
											<Select items={items}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Theme" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{items.map((item) => (
															<SelectItem
																key={item.value}
																value={
																	item.value
																}
															>
																{item.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className="form-group flex items-center space-x-5">
										<MapPin />

										<div className="w-full">
											<Label className="mb-3">
												Destination
											</Label>
											<Select items={items}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Theme" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{items.map((item) => (
															<SelectItem
																key={item.value}
																value={
																	item.value
																}
															>
																{item.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>

								<div className="flex flex-col space-y-8">
									<div className="form-group flex items-center space-x-5">
										<CalendarDays />

										<div className="w-full">
											<Label className="mb-3">
												Start Date
											</Label>
											<DatePickerSimple />
										</div>
									</div>

									<div className="form-group flex items-center space-x-5">
										<CalendarDays />

										<div className="w-full">
											<Label className="mb-3">
												End Date
											</Label>
											<DatePickerSimple />
										</div>
									</div>
								</div>

								<div className="flex flex-col space-y-8">
									<div className="form-group flex items-center space-x-5">
										<User />

										<div className="w-full">
											<Label className="mb-3">
												Travelers
											</Label>
											<Input
												type="number"
												defaultValue={1}
											/>
										</div>
									</div>

									<div className="form-group flex items-center space-x-5">
										<CircleDollarSign />

										<div className="w-full">
											<Label className="mb-3">
												Budget (USD)
											</Label>
											<Input
												type="number"
												placeholder="Enter your budget"
											/>
										</div>
									</div>
								</div>
							</div>

							<hr className="my-8" />

							<div className="flex items-center justify-center">
								<Button className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
									Plan My Trip
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="px-4 pb-28 sm:px-8 md:px-12 flex flex-col items-center justify-center">
				<div className="mb-8">
					<h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent logo-text">
						Trip Plan from Bali to Central Java
						<span className="text-yellow-500 logo-dot">.</span>
					</h2>
				</div>

				<div className="max-w-7xl mx-auto w-full">
					<Card className="h-[400px] w-full p-0 overflow-hidden">
						<Map
							center={[112.95309798404486, -7.941983278979867]}
							zoom={7}
						>
							{locations.map((location) => (
								<MapMarker
									key={location.id}
									longitude={location.lng}
									latitude={location.lat}
								>
									<MarkerContent>
										<div
											className={`bg-primary size-7 rounded-full flex justify-center items-center font-semibold text-sm border-2 border-white text-white shadow-lg ${location.color}`}
										>
											{location.id}
										</div>
									</MarkerContent>
									<MarkerTooltip>
										{location.name}
									</MarkerTooltip>
									<MarkerPopup>
										<div className="space-y-1">
											<p className="text-foreground font-medium">
												{location.name}
											</p>
											<p className="text-muted-foreground text-xs">
												{location.lat.toFixed(4)},{" "}
												{location.lng.toFixed(4)}
											</p>
										</div>
									</MarkerPopup>
								</MapMarker>
							))}
						</Map>
					</Card>
				</div>

				<div className="max-w-7xl mx-auto w-full mt-8">
					<Tabs defaultValue="1">
						<div className=" flex justify-center">
							<TabsList className="py-5 mb-12">
								<TabsTrigger className="px-6 py-4" value="1">
									Day 1
								</TabsTrigger>
								<TabsTrigger className="px-6 py-4" value="2">
									Day 2
								</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="1">
							<div className="grid grid-cols-12 gap-4 md:gap-6 items-start mb-16">
								<div className="col-span-12 md:col-span-1 flex items-center justify-center pt-1.5">
									<div className="size-12 font-bold text-lg flex items-center justify-center bg-yellow-500 text-white rounded-full">
										1
									</div>
								</div>
								<div className="col-span-12 md:col-span-11">
									<h3 className="text-2xl font-bold mb-2 text-left">
										Beratan Lake
									</h3>
									<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
										<div className="flex-1 text-left">
											<p className="text-muted-foreground text-sm line-clamp-2">
												Pura Ulun Danu Beratan is a majestic Balinese Hindu water 
												temple complex located on the shores of Lake Bratan in Bedugul. 
												Famous for its floating temple views against a backdrop of 
												mist-shrouded mountains, making it one of Bali's tourism icons.
											</p>
										</div>
										<div className="shrink-0 text-left sm:text-end">
											<Button
												onClick={() =>
													setActiveDetail(
														placeDetails[
															"Beratan Lake"
														],
													)
												}
												className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30 w-fit"
											>
												Learn more
											</Button>
										</div>
									</div>
									<div className="flex w-full overflow-x-auto pb-4 gap-4 md:gap-0 md:-space-x-8 px-4 mb-16 custom-scrollbar scrollbar-none snap-x snap-mandatory py-6 ">
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-5deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 1"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bali.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[8deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 2"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bali.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-3deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 3"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bali.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[10deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 4"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bali.jpg"
												/>
											</div>
										</div>
									</div>
									<div className="w-full">
										<div className="flex flex-col md:flex-row h-auto md:h-5 items-start md:items-center gap-4 md:gap-6 text-sm text-left">
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Location
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													Bedugul, Tabanan Regency,
													Bali, Indonesia
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Best Hour to Visit
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													07:00 - 09:00{" "}
													<span className="text-amber-600">
														(Foggy in afternoon)
													</span>
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="flex flex-wrap gap-2 mt-1 md:mt-0">
												<span className="bg-blue-500/10 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-500/20">
													Lake
												</span>
												<span className="bg-amber-500/10 text-amber-600 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-500/20">
													Temple
												</span>
												<span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200">
													Scenery
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-end col-span-12 space-x-3">
									<p className="text-base text-center text-muted-foreground">
										Not interested?
									</p>
									<Button className="size-12 bg-red-500 hover:bg-red-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
										<Trash />
									</Button>
								</div>
							</div>
							<div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
								<div className="col-span-12 md:col-span-1 flex items-center justify-center pt-1.5">
									<div className="size-12 font-bold text-lg flex items-center justify-center bg-yellow-500 text-white rounded-full">
										2
									</div>
								</div>
								<div className="col-span-12 md:col-span-11">
									<h3 className="text-2xl font-bold mb-2 text-left">
										Mount Bromo
									</h3>
									<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
										<div className="flex-1 text-left">
											<p className="text-muted-foreground text-sm line-clamp-2">
												Mount Bromo is one of the most exotic active volcanoes in East Java, 
												famous for its vast sand caldera landscape, breathtaking active crater, 
												and spectacular sunrise panoramas that attract tourists from all over the world.
											</p>
										</div>
										<div className="shrink-0 text-left sm:text-end">
											<Button
												onClick={() =>
													setActiveDetail(
														placeDetails[
															"Mount Bromo"
														],
													)
												}
												className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30 w-fit"
											>
												Learn more
											</Button>
										</div>
									</div>
									<div className="flex w-full overflow-x-auto pb-4 gap-4 md:gap-0 md:-space-x-8 px-4 mb-16 custom-scrollbar scrollbar-none snap-x snap-mandatory py-6 ">
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-5deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 1"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bromo.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[8deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 2"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bromo.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-3deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 3"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bromo.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[10deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 4"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/bromo.jpg"
												/>
											</div>
										</div>
									</div>
									<div className="w-full">
										<div className="flex flex-col md:flex-row h-auto md:h-5 items-start md:items-center gap-4 md:gap-6 text-sm text-left">
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Location
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													Area Gn. Bromo, Podokoyo,
													Tosari, Pasuruan Regency,
													East Java
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Best Hour to Visit
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													04:00 - 06:00
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="flex flex-wrap gap-2 mt-1 md:mt-0">
												<span className="bg-red-500/10 text-red-650 text-xs font-medium px-3 py-1.5 rounded-full border border-red-500/20">
													Volcano
												</span>
												<span className="bg-amber-500/10 text-amber-600 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-500/20">
													Sunrise
												</span>
												<span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200">
													Adventure
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-end col-span-12 space-x-3">
									<p className="text-base text-center text-muted-foreground">
										Not interested?
									</p>
									<Button className="size-12 bg-red-500 hover:bg-red-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
										<Trash />
									</Button>
								</div>
							</div>

							<div className="flex items-center justify-center mt-18 space-x-5">
								<Button className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
									Add things to do (hotels, places, etc.)
								</Button>
								<Button 
									onClick={() => setIsCollabOpen(true)}
									className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30"
								>
									Collab with friends
								</Button>
							</div>
						</TabsContent>
						<TabsContent value="2">
							<div className="grid grid-cols-12 gap-4 md:gap-6 items-start mb-16">
								<div className="col-span-12 md:col-span-1 flex items-center justify-center pt-1.5">
									<div className="size-12 font-bold text-lg flex items-center justify-center bg-green-500 text-white rounded-full">
										1
									</div>
								</div>
								<div className="col-span-12 md:col-span-11">
									<h3 className="text-2xl font-bold mb-2 text-left">
										Borobudur Temple
									</h3>
									<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
										<div className="flex-1 text-left">
											<p className="text-muted-foreground text-sm line-clamp-2">
												Borobudur Temple is the largest Buddhist monument in the world and 
												a UNESCO World Heritage site. Located in Magelang, Central Java, 
												this 9th-century architectural masterpiece is decorated with thousands 
												of magnificent relief panels and beautiful stone stupas.
											</p>
										</div>
										<div className="shrink-0 text-left sm:text-end">
											<Button
												onClick={() =>
													setActiveDetail(
														placeDetails[
															"Borobudur Temple"
														],
													)
												}
												className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30 w-fit"
											>
												Learn more
											</Button>
										</div>
									</div>
									<div className="flex w-full overflow-x-auto pb-4 gap-4 md:gap-0 md:-space-x-8 px-4 mb-16 custom-scrollbar scrollbar-none snap-x snap-mandatory py-6 ">
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-5deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 1"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/borobudur.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[8deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 2"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/borobudur.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-3deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 3"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/borobudur.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[10deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 4"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/borobudur.jpg"
												/>
											</div>
										</div>
									</div>
									<div className="w-full">
										<div className="flex flex-col md:flex-row h-auto md:h-5 items-start md:items-center gap-4 md:gap-6 text-sm text-left">
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Location
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													Borobudur, Magelang Regency,
													Central Java, Indonesia
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Best Hour to Visit
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													08:30 - 10:30
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="flex flex-wrap gap-2 mt-1 md:mt-0">
												<span className="bg-amber-500/10 text-amber-600 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-500/20">
													Temple
												</span>
												<span className="bg-violet-500/10 text-violet-650 text-xs font-medium px-3 py-1.5 rounded-full border border-violet-500/20">
													History
												</span>
												<span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200">
													Heritage
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-end col-span-12 space-x-3">
									<p className="text-base text-center text-muted-foreground">
										Not interested?
									</p>
									<Button className="size-12 bg-red-500 hover:bg-red-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
										<Trash />
									</Button>
								</div>
							</div>
							<div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
								<div className="col-span-12 md:col-span-1 flex items-center justify-center pt-1.5">
									<div className="size-12 font-bold text-lg flex items-center justify-center bg-green-500 text-white rounded-full">
										2
									</div>
								</div>
								<div className="col-span-12 md:col-span-11">
									<h3 className="text-2xl font-bold mb-2 text-left">
										Dieng Plateau
									</h3>
									<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
										<div className="flex-1 text-left">
											<p className="text-muted-foreground text-sm line-clamp-2">
												Dieng Plateau is an active volcanic region in Central Java offering 
												mountainous natural beauty, unique sulfur craters, charming colorful 
												lakes, and a historical temple complex dating back to the 8th century.
											</p>
										</div>
										<div className="shrink-0 text-left sm:text-end">
											<Button
												onClick={() =>
													setActiveDetail(
														placeDetails[
															"Dieng Plateau"
														],
													)
												}
												className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30 w-fit"
											>
												Learn more
											</Button>
										</div>
									</div>
									<div className="flex w-full overflow-x-auto pb-4 gap-4 md:gap-0 md:-space-x-8 px-4 mb-16 custom-scrollbar scrollbar-none snap-x snap-mandatory py-6 ">
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-5deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 1"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/dieng.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[8deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 2"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/dieng.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[-3deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 3"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/dieng.jpg"
												/>
											</div>
										</div>
										<div className="shadow-md shrink-0 overflow-hidden rounded-[1px] hover:rotate-0 rotate-[10deg] transition-transform duration-200 snap-center">
											<div className="bg-card pb-5 shadow-sm text-card-foreground dark:bg-primary dark:text-primary-foreground flex h-fit flex-col items-center p-1 relative w-48 sm:w-52">
												<img
													alt="Image of place 4"
													aria-hidden="true"
													loading="lazy"
													width="1000"
													height="1000"
													decoding="async"
													className="aspect-square h-auto w-full object-cover"
													style={{
														color: "transparent",
													}}
													src="/images/dieng.jpg"
												/>
											</div>
										</div>
									</div>
									<div className="w-full">
										<div className="flex flex-col md:flex-row h-auto md:h-5 items-start md:items-center gap-4 md:gap-6 text-sm text-left">
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Location
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													Kejajar, Wonosobo Regency,
													Central Java
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="text-base">
												<h4 className="font-semibold text-muted-foreground text-xs md:text-sm">
													Best Hour to Visit
												</h4>
												<p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
													04:30 - 08:30
												</p>
											</div>
											<Separator
												className="hidden md:block"
												orientation="vertical"
											/>
											<div className="flex flex-wrap gap-2 mt-1 md:mt-0">
												<span className="bg-emerald-500/10 text-emerald-600 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/20">
													Hidden Gem
												</span>
												<span className="bg-teal-500/10 text-teal-650 text-xs font-medium px-3 py-1.5 rounded-full border border-teal-500/20">
													Plateau
												</span>
												<span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200">
													Nature
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-end col-span-12 space-x-3">
									<p className="text-base text-center text-muted-foreground">
										Not interested?
									</p>
									<Button className="size-12 bg-red-500 hover:bg-red-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
										<Trash />
									</Button>
								</div>
							</div>

							<div className="flex items-center justify-center mt-18 space-x-5">
								<Button className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30">
									Add things to do (hotels, places, etc.)
								</Button>
								<Button 
									onClick={() => setIsCollabOpen(true)}
									className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30"
								>
									Collab with friends
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</div>

				<div className="max-w-7xl w-full">
					<hr className="my-6 w-full" />
				</div>

				<div className="max-w-7xl w-full">
					<h5 className="text-center mb-3 text-base font-medium">Ready to go?</h5>
					<div className="flex items-center justify-center space-x-5">
						<Button 
							onClick={() => navigate("/payment")}
							className="py-6 px-8 bg-blue-500 hover:bg-blue-600 border-0 rounded-full shadow-lg shadow-blue-500/30"
						>
							Continue
						</Button>
					</div>
				</div>
			</section>

			<LocalStoryModal
				isOpen={activeDetail !== null}
				onClose={() => setActiveDetail(null)}
				detail={activeDetail}
			/>
			<CollabModal
				isOpen={isCollabOpen}
				onClose={() => setIsCollabOpen(false)}
			/>
		</Layout>
	);
}
