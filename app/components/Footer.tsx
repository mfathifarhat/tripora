export function Footer() {
	return (
		<footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-8 md:px-12 text-center relative z-20">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Tripora — All in One
					Travel Ecosystem. All rights reserved.
				</p>
				<div className="flex gap-4 text-lg justify-center">
					<a href="#" className="hover:text-white transition">
						<i className="ri-instagram-line"></i>
					</a>
					<a href="#" className="hover:text-white transition">
						<i className="ri-facebook-box-line"></i>
					</a>
					<a href="#" className="hover:text-white transition">
						<i className="ri-twitter-x-line"></i>
					</a>
				</div>
			</div>
		</footer>
	);
}
