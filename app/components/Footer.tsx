import { useState } from "react";

const exploreLinks = [
	{ label: "Destinations", href: "#" },
	{ label: "Itinerary Builder", href: "#" },
	{ label: "Group Trips", href: "#" },
	{ label: "Community Reviews", href: "#" },
];

const companyLinks = [
	{ label: "About Tripora", href: "#" },
	{ label: "Careers", href: "#" },
	{ label: "Travel Journal", href: "#" },
	{ label: "Contact Us", href: "#" },
];

const legalLinks = [
	{ label: "Privacy Policy", href: "#" },
	{ label: "Terms of Service", href: "#" },
	{ label: "Cookie Settings", href: "#" },
];

const socialLinks = [
	{ label: "Instagram", icon: "ri-instagram-line", href: "#" },
	{ label: "Facebook", icon: "ri-facebook-box-line", href: "#" },
	{ label: "X (Twitter)", icon: "ri-twitter-x-line", href: "#" },
];

export function Footer() {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	function handleSubscribe(e: React.FormEvent) {
		e.preventDefault();
		if (!email.trim()) return;
		setSubscribed(true);
		setEmail("");
	}

	return (
		<footer className="bg-slate-900 border-t border-slate-800 text-slate-400 relative z-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-16 pb-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-12 lg:gap-8">
					{/* Brand column */}
					<div className="space-y-4">
						<div className="flex items-center gap-1.5 text-white">
							<div className="relative inline-flex items-center">
								<i
									id="rocketIcon"
									className="ri-rocket-fill text-3xl text-transparent bg-gradient-to-b from-white via-white to-white bg-clip-text relative z-10 animate-pulse-glow rocket-icon"
								></i>
								<div className="absolute inset-0 blur-2xl bg-blue-500/30 rounded-full -z-0 animate-pulse-slow rocket-glow"></div>
								<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 rocket-fire">
									<div className="w-1 h-3 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full animate-flicker-1"></div>
									<div className="w-1.5 h-4 bg-gradient-to-t from-yellow-300 via-orange-500 to-red-500 rounded-full animate-flicker-2"></div>
									<div className="w-1 h-3 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full animate-flicker-3"></div>
								</div>
							</div>
							<h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent logo-text">
								Tripora
								<span className="text-yellow-500 logo-dot">.</span>
							</h2>
						</div>

						<p className="text-sm leading-relaxed max-w-xs">
							Your all-in-one travel ecosystem — plan
							itineraries, discover destinations, and travel
							smarter with a community of 90K+ explorers.
						</p>

						<div className="flex gap-3 pt-1">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-800 bg-[#f4f5f8] text-emerald-600  font-medium transition"
								>
									<i className={`${social.icon} text-base`}></i>
								</a>
							))}
						</div>
					</div>

					{/* Explore links */}
					<nav aria-label="Explore">
						<h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
							Explore
						</h3>
						<ul className="space-y-3 text-sm">
							{exploreLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="hover:text-emerald-400 transition"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Company links */}
					<nav aria-label="Company">
						<h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
							Company
						</h3>
						<ul className="space-y-3 text-sm">
							{companyLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="hover:text-emerald-400 transition"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Newsletter */}
					<div>
						<h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
							Stay in the loop
						</h3>
						<p className="text-sm mb-4 max-w-xs">
							Trip ideas and deals, once a month. No spam,
							unsubscribe anytime.
						</p>

						{subscribed ? (
							<p className="text-sm text-emerald-400 flex items-center gap-2">
								<i className="ri-checkbox-circle-fill"></i>
								You're on the list — welcome aboard.
							</p>
						) : (
							<form
								onSubmit={handleSubscribe}
								className="flex items-center gap-2"
							>
								<label htmlFor="footer-email" className="sr-only">
									Email address
								</label>
								<input
									id="footer-email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@email.com"
									className="flex-1 min-w-0 bg-slate-800/60 border border-slate-700 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition"
								/>
								<button
									type="submit"
									aria-label="Subscribe"
									className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-400 text-slate-900 hover:bg-emerald-300 transition"
								>
									<i className="ri-arrow-right-line text-lg"></i>
								</button>
							</form>
						)}
					</div>
				</div>

				{/* Divider */}
				<div className="h-px bg-slate-800 my-10" />

				{/* Bottom bar */}
				<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
					<p>
						&copy; {new Date().getFullYear()} Tripora — All in One
						Travel Ecosystem. All rights reserved.
					</p>
					<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
						{legalLinks.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									className="hover:text-slate-300 transition"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}