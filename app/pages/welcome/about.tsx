import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

const stats = [
    { value: "90K+", label: "Happy Travelers" },
    { value: "2.5K+", label: "Itineraries Created" },
    { value: "120+", label: "Destinations Covered" },
    { value: "4.8/5", label: "Average Rating" },
];
const storySlides = [
    {
        img: "/images/img-1about.jpg",
        title: "Exhausting Manual Research",
        desc: "Hours spent juggling dozens of tabs, comparing prices, and coordinating group schedules. Miscommunication was inevitable with information scattered everywhere.",
    },
    {
        img: "/images/img-2about.jpg",
        title: "Disconnected Booking Systems",
        desc: "Hotels from one site, flights from another, transport from a different app. Budgets spiraled out of control due to hidden costs and fragmented booking processes.",
    },
];

const partners = [
    { name: "Booking.com", logo: "https://cdn.simpleicons.org/bookingdotcom/003580" },
    { name: "Gojek", logo: "https://cdn.simpleicons.org/gojek/00AA13" },
    { name: "Grab", logo: "https://cdn.simpleicons.org/grab/00B14F" },
];

function About() {
    const [storyIndex, setStoryIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStoryIndex((prev) => (prev + 1) % storySlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans overflow-x-hidden">
            {/* ============ NAVBAR - STICKY ============ */}
            <Navbar />

            {/* ============ HERO ============ */}
            <section className="relative overflow-hidden px-4 sm:px-8 md:px-12 pt-36 pb-20 sm:pb-28">
                {/* Background collage */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 grid grid-cols-3 opacity-25">
                        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/images/bali.jpg')" }}></div>
                        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/images/bromo.jpg')" }}></div>
                        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/images/pantai.jpg')" }}></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-[#47BB8E]/15 text-[#47BB8E] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 border border-[#47BB8E]/30">
                        About Tripora
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-blue-200/80 to-white bg-clip-text text-transparent mb-6">
                        Your Entire Trip, All in One Web
                    </h1>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Tripora was born from a simple frustration — planning a trip meant
                        juggling ten different tabs. So we built one place to plan, book,
                        and share every journey, from a weekend escape to a month-long
                        adventure.
                    </p>
                </div>
            </section>

            {/* ============ STATS ============ */}
            <section className="relative z-10 mb-20 px-4 sm:px-8 md:px-12 -mt-10 sm:-mt-14 mb-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 text-center shadow-xl"
                        >
                            <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                            <p className="text-white/60 text-xs sm:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ OUR STORY ============ */}
            <section className="relative z-10 overflow-hidden bg-[#f4f5f8] py-20 sm:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                <h2 className="pointer-events-none mt-20 select-none absolute inset-x-0 -top-6 sm:-top-10 md:-top-14 text-center text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-slate-900/[0.04] leading-none tracking-tight whitespace-nowrap">
                    Our Story
                </h2>

                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="relative">
                        <div className="pointer-events-none absolute -top-8 -left-6 h-40 w-40 rounded-full bg-yellow-300/40 blur-3xl"></div>
                        <div className="pointer-events-none absolute -bottom-6 -right-8 h-48 w-48 rounded-full bg-blue-400/30 blur-3xl"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 h-[320px] sm:h-[400px]">
                            {storySlides.map((slide, idx) => (
                                <div
                                    key={slide.title}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${storyIndex === idx ? "opacity-100" : "opacity-0"}`}
                                >
                                    <img
                                        src={slide.img}
                                        alt={slide.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 card-fade"></div>
                                    <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                                        <h2 className="font-bold text-lg sm:text-xl mb-1">{slide.title}</h2>
                                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{slide.desc}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Slide indicators */}
                            <div className="absolute top-4 right-4 z-10 flex gap-1.5">
                                {storySlides.map((slide, idx) => (
                                    <span
                                        key={slide.title}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${storyIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-left">
                        <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
                            Our Mission
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                            Making travel planning feel effortless again
                        </h3>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6">
                            The problem begins when many people are confused about where to travel within their budget, often opening dozens of tabs but not finding the right one, coordinating with groups but resulting in miscommunication. Therefore, we innovate to help you create automated itineraries according to your needs, group bookings, you can learn about the history and rules of tourist attractions, connect with other travelers with Tripora Social, all on one platform called Tripora.
                        </p>
                        <NavLink
                            to="/itinerary"
                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white transition rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-500/30"
                        >
                            Start Planning Your Trip
                            <i className="ri-arrow-right-line"></i>
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* ============ PARTNERS MARQUEE ============ */}
            <section id="partners-section" className="relative z-10 overflow-hidden bg-[#f4f5f8] py-20 sm:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                <h2 className="pointer-events-none select-none absolute inset-x-0 top-6 sm:top-10 md:top-14 text-center text-[3rem] sm:text-[5rem] md:text-[5rem] font-extrabold text-slate-900/[0.04] leading-none tracking-tight whitespace-nowrap">
                    Our Partners
                </h2>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
                            Trusted Ecosystem
                        </span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-2xl mx-auto">
                            Tools and Platforms We Integrate
                        </h3>

                    </div>

                    <div id="partners-marquee" className="relative overflow-hidden">
                        <div id="partners-track" className="flex items-center gap-10 sm:gap-14 w-max">
                            {[...partners, ...partners].map((partner, idx) => (
                                <div
                                    key={`${partner.name}-${idx}`}
                                    className="partner-logo shrink-0 flex items-center justify-center h-20 w-36 sm:h-24 sm:w-44 bg-white rounded-2xl border border-slate-100 shadow-md"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="partner-img max-h-8 sm:max-h-10 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
					#partners-marquee {
						mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
						-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
					}
					#partners-track {
						animation: partnersScroll 32s linear infinite;
					}
					#partners-marquee:hover #partners-track {
						animation-play-state: paused;
					}
					@keyframes partnersScroll {
						0% { transform: translateX(0); }
						100% { transform: translateX(-50%); }
					}
					.partner-img {
						filter: grayscale(1) opacity(0.45);
						transition: filter 0.35s ease, transform 0.35s ease;
					}
					.partner-logo:hover .partner-img {
						filter: grayscale(0) opacity(1);
						transform: scale(1.12);
					}
					#partners-track:has(.partner-logo:hover) .partner-logo:not(:hover) .partner-img {
						filter: grayscale(1) blur(2.5px) opacity(0.3);
					}
					.partner-logo {
						transition: transform 0.35s ease;
					}
					.partner-logo:hover {
						transform: translateY(-2px);
					}
				`}</style>
            </section>

            {/* ============ CTA ============ */}
            <section className="relative z-10 overflow-hidden py-24 sm:py-32 px-4 sm:px-8 md:px-12">
                {/* Background photo + overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/pantai.jpg"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/85"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/40"></div>
                </div>

                {/* Decorative glow accents */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#47BB8E]/10 blur-3xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-[#47BB8E]/15 text-[#47BB8E] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 border border-[#47BB8E]/30">
                        Let's Go
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-white via-blue-200/80 to-white bg-clip-text text-transparent">
                        Ready to plan your next trip?
                    </h2>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
                        Join thousands of travelers who trust Tripora to keep every detail
                        of their journey in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">

                        <NavLink
                            to="/itinerary"
                            className="border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition rounded-full px-6 py-3 text-sm font-semibold"
                        >
                            Made Itenerary Now
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* ============ FOOTER ============ */}
            <Footer />
        </div>
    );
}

export default About;