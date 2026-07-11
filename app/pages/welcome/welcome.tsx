import { useState, useEffect, useRef } from "react";

import { NavLink } from "react-router";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import Img1 from "../../../public/images/bali.jpg";

export function Welcome() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeLang, setActiveLang] = useState("IDN");

    // Handle navbar scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle clicking outside the profile modal
    const profileRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isProfileOpen &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileOpen]);

    // Slides data
    const slides = [
        {
            location: "Pulau Flores, NTT",
            title: "Unforgettable Labuan Bajo",
            subtitle: "Island Paradise Escape",
            description: "Explore the stunning islands of Labuan Bajo, home to the famous Komodo dragons, pristine pink beaches.",
            bgImage: "/images/pantai.jpg",
            cardTitle: "Labuan Bajo",
            cardDesc: "Explore the gateway to Komodo Island with stunning pink beaches and marine life."
        },
        {
            location: "Bedugul, Bali",
            title: "Serene Danau Beratan",
            subtitle: "Misty Temple Oasis",
            description: "Discover the serene Ulun Danu Temple floating on the misty lake in Bedugul, surrounded by mountain scenery.",
            bgImage: "/images/bali.jpg",
            cardTitle: "Danau Beratan",
            cardDesc: "Discover the serene Ulun Danu Temple floating on the misty lake in Bedugul."
        },
        {
            location: "Jawa Timur, Indonesia",
            title: "Majestic Mount Bromo",
            subtitle: "Volcanic Sunrise Adventure",
            description: "Witness the breathtaking sunrise over the active volcano of Mount Bromo, a sea of sand, and stunning ridges.",
            bgImage: "/images/bromo.jpg",
            cardTitle: "Mount Bromo",
            cardDesc: "Witness the breathtaking sunrise over the active volcano in East Java."
        }
    ];


    // Di dalam komponen Welcome, tambahkan state:
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqData = [
        {
            id: 1,
            question: "Is Tripora safe to use?",
            answer: "Yes, Tripora is completely safe to use. We use industry-leading data encryption and partner with trusted providers to keep your transactions and personal data secure."
        },
        {
            id: 2,
            question: "How do I book an itinerary?",
            answer: "Choose an available itinerary, click 'Create Itinerary', then follow the steps to pick your dates and number of travelers, and complete payment through one of the available methods."
        },
        {
            id: 3,
            question: "Can I get a refund if I cancel?",
            answer: "Yes, refunds are available according to our terms and conditions. Reach out to our customer support for more details."
        },
        {
            id: 4,
            question: "How long does the booking process take?",
            answer: "Booking usually takes about 5-10 minutes. Once payment is successful, you'll immediately receive a confirmation and your itinerary details by email."
        },
        {
            id: 5,
            question: "Are there discounts for groups?",
            answer: "Absolutely! We offer special discounts for groups of 5 or more. The more travelers you bring, the bigger the discount you can get."
        },
        {
            id: 6,
            question: "How do I become a partner?",
            answer: "You can register as a partner through the 'Be Partner' page. Our team will reach out to guide you through verification and onboarding."
        }
    ];

    // Handler toggle FAQ
    const toggleFaq = (id: number) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans overflow-x-hidden">
            {/* ============ NAVBAR - STICKY ============ */}
            <Navbar />

            {/* Profile Modal */}
            <div id="profileModal" ref={modalRef} className={`modal-overlay ${isProfileOpen ? "active" : ""}`} onClick={(e) => {
                if (e.target === e.currentTarget) setIsProfileOpen(false);
            }}>
                <div className="modal-box">
                    <div className="user-info">
                        <img src="/images/profile-user.png" alt="Profile" />
                        <div>
                            <div className="name">John Doe</div>
                            <div className="email">john.doe@email.com</div>
                        </div>
                    </div>

                    <div className="menu-item">
                        <i className="ri-wallet-3-line"></i>
                        <span>Wallet <span className="text-blue-500 text-xs ml-1">(1,250 TC)</span></span>
                    </div>

                    <div className="menu-item danger" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                        <i className="ri-logout-box-r-line"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            {/* ============ HERO SECTION ============ */}
            <section className="hero-section relative w-full min-h-[100svh] overflow-hidden" id="heroSection">
                {/* Background slides */}
                <div id="bgSlides" className="absolute inset-0 z-0">
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${activeIndex === idx ? "opacity-100" : "opacity-0"}`}
                            style={{ backgroundImage: `url('${slide.bgImage}')` }}
                        ></div>
                    ))}
                    <div className="bg-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/50 z-[1] pointer-events-none"></div>
                </div>

                {/* Hero copy */}
                <div
                    className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6"
                    style={{ paddingTop: 'clamp(4.5rem, 16vh, 9rem)' }}
                >
                    <span className="glass-light border border-white/20 text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-4 sm:mb-6">
                        <i className="ri-map-pin-2-fill mr-1 text-yellow-500"></i>
                        <span id="slideLocation">{slides[activeIndex].location}</span>
                    </span>
                    <h1
                        className="font-extrabold text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-normal lg:text-7xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all duration-700 bg-gradient-to-r from-white via-blue-200/80 to-white bg-clip-text text-transparent px-2"
                        id="slideTitle"
                    >
                        {slides[activeIndex].title}
                    </h1>
                    <h2
                        className="text-white/90 font-light tracking-wide text-lg leading-snug sm:text-2xl md:text-3xl lg:text-5xl mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-700 px-2"
                        id="slideSubtitle"
                    >
                        {slides[activeIndex].subtitle}
                    </h2>
                </div>

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-10 z-20 px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4 sm:gap-6">
                        {/* People joined glass card */}
                        <div className="glass border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 w-full lg:max-w-xs shadow-2xl shadow-black/30">
                            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                                <div className="pfp-stack flex">
                                    <img className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=11" alt="" />
                                    <img className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=22" alt="" />
                                    <img className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=32" alt="" />
                                    <img className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=44" alt="" />
                                </div>
                                <p className="text-white text-xs sm:text-sm">
                                    <strong className="text-sm sm:text-base font-bold">2.5k+</strong> People Joined
                                </p>
                            </div>
                            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none" id="slideDescription">
                                {slides[activeIndex].description}
                            </p>
                            <a href="#" className="flex items-center justify-center gap-2 w-full rounded-full bg-yellow-400 text-slate-900 text-xs sm:text-sm font-semibold py-2 sm:py-2.5 hover:bg-yellow-300 transition">
                                Made Itinerary Now
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-700">
                                    <i className="ri-arrow-right-up-line text-xs"></i>
                                </span>
                            </a>
                        </div>

                        {/* Card row */}
                        <div
                            className="flex gap-2.5 sm:gap-3 md:gap-4 w-full lg:w-auto overflow-x-auto lg:overflow-visible pb-1 card-row snap-x snap-mandatory lg:snap-none -mx-4 px-4 sm:mx-0 sm:px-0"
                            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                        >
                            {slides.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`card-item shrink-0 snap-start w-[68vw] max-w-[220px] sm:w-[200px] md:w-[220px] lg:w-[240px] ${activeIndex === idx ? "active" : ""}`}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <div className="relative w-full h-full">
                                        <img src={slide.bgImage} alt={slide.cardTitle} className="absolute inset-0 h-full w-full object-cover" />
                                        <div className="absolute inset-0 card-fade"></div>
                                        <div className="absolute bottom-0 left-0 right-0 card-content text-left">
                                            <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 sm:mb-1">{slide.cardTitle}</h3>
                                            <p className="text-white/70 text-xs sm:text-sm leading-snug">{slide.cardDesc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION: FEATURE ============ */}
            <section className="relative z-10 overflow-hidden bg-[#f4f5f8] py-20 sm:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                <div className="max-w-7xl mx-auto relative">
                    {/* Giant faded background heading */}
                    <h2 className="pointer-events-none select-none absolute inset-x-0 -top-6 sm:-top-10 md:-top-14 text-center text-[3rem] sm:text-[5rem] md:text-[6rem] font-extrabold text-slate-900/[0.04] leading-none tracking-tight whitespace-nowrap">
                        What's the Feature?
                    </h2>

                    <div className="relative z-10 text-left">
                        {/* Badge */}
                        <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
                            Feature
                        </span>

                        {/* Heading & Subtitle */}
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-2xl mb-4">
                            Planning, Booking and Sharing Your Trips
                        </h3>
                        <p className="text-slate-500 text-base md:text-lg max-w-xl mb-12">
                            Your entire trip, all in one web. Tripora keeps travel simple and connected.
                        </p>

                        {/* Content grid */}
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                            {/* Left: feature card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-900/5 flex flex-col">
                                <h4 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-1.5">
                                    Enjoy Trips with Tripora
                                    <span className="inline-block animate-sparkle-glow" style={{ filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))" }}>✨</span>
                                </h4>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-green-500 flex items-center justify-center">
                                            <i className="ri-check-line text-white text-xs"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-slate-800">Planning Your Vacation</h5>
                                            <p className="text-slate-400 text-sm">Personalize a trip that fits your style</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-green-500 flex items-center justify-center">
                                            <i className="ri-check-line text-white text-xs"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-slate-800">Book Everything in One Place</h5>
                                            <p className="text-slate-400 text-sm">Integration booking in your itinerary</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-green-500 flex items-center justify-center">
                                            <i className="ri-check-line text-white text-xs"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-slate-800">Share and Collaborate Trips</h5>
                                            <p className="text-slate-400 text-sm">Travel is better together with your people</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Smart Suggestions box */}
                                <div className="border border-slate-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
                                    <i className="ri-magic-line text-yellow-500 text-lg mt-0.5"></i>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Smart Suggestions</p>
                                        <p className="text-slate-400 text-xs leading-relaxed">
                                            Get tailored recommendations on what to book next with Tripora AI.
                                        </p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                    <NavLink to="/itinerary" className="bg-blue-500 hover:bg-blue-600 text-white transition rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/30">
                                        Buat Itinerary Sekarang
                                    </NavLink>
                                    <button className="border border-slate-200 text-slate-700 hover:bg-slate-50 transition rounded-full px-5 py-2.5 text-sm font-semibold">
                                        Kenali Lebih Lanjut
                                    </button>
                                </div>
                            </div>

                            {/* Right: image grid + decorative accents */}
                            <div className="relative pb-8 sm:pb-10">
                                {/* Soft color blobs behind the grid so the right side never reads as empty */}
                                <div className="pointer-events-none absolute -top-8 -right-6 h-40 w-40 rounded-full bg-yellow-300/40 blur-3xl"></div>
                                <div className="pointer-events-none absolute -bottom-6 -left-8 h-48 w-48 rounded-full bg-blue-400/30 blur-3xl"></div>

                                <div className="relative z-10 grid grid-cols-2 gap-4 h-full min-h-[300px] md:min-h-[420px]">
                                    <div className="row-span-2 relative rounded-3xl overflow-hidden group">
                                        <img src="/images/bali.jpg" alt="Hotels and Your Stays" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 card-fade"></div>
                                        <div className="absolute top-4 left-4 h-9 w-9 rounded-full bg-yellow-400 flex items-center justify-center">
                                            <i className="ri-hotel-bed-line text-slate-900 text-base"></i>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                                            <h6 className="font-bold text-sm mb-0.5">Hotels and Your Stays</h6>
                                            <p className="text-white/70 text-xs">From any travel style to trusted chains.</p>
                                        </div>
                                    </div>

                                    <div className="relative rounded-3xl overflow-hidden group">
                                        <img src="/images/bromo.jpg" alt="Curated Private Tours" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 card-fade"></div>
                                        <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                                            <i className="ri-ticket-2-line text-slate-900 text-sm"></i>
                                        </div>
                                        <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                                            <h6 className="font-bold text-xs mb-0.5">Curated Private Tours</h6>
                                            <p className="text-white/70 text-[11px]">Attraction tickets globally.</p>
                                        </div>
                                    </div>

                                    <div className="relative rounded-3xl overflow-hidden group">
                                        <img src="/images/pantai.jpg" alt="Transport Made Easy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 card-fade"></div>
                                        <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                                            <i className="ri-taxi-line text-slate-900 text-sm"></i>
                                        </div>
                                        <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                                            <h6 className="font-bold text-xs mb-0.5">Transport Made Easy</h6>
                                            <p className="text-white/70 text-[11px]">Airport pickups, intercity rides, etc.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION: WHY TRIPORA ============ */}
            <section className="relative z-10 overflow-hidden bg-[#f4f5f8] py-20 sm:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                {/* Giant faded background heading */}
                <h2 className="pointer-events-none select-none absolute inset-x-0 top-6 sm:top-10 md:top-14 text-center text-[3rem] sm:text-[5rem] md:text-[5rem] font-extrabold text-slate-900/[0.04] leading-none tracking-tight whitespace-nowrap">
                    Why should you try Tripora?
                </h2>

                {/* Drifting background boxes */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span className="drift-box" style={{ top: '12%', left: '6%', width: '26px', height: '26px', animationDuration: '9s', animationDelay: '0s' }}></span>
                    <span className="drift-box" style={{ top: '22%', left: '88%', width: '34px', height: '34px', animationDuration: '11s', animationDelay: '1s' }}></span>
                    <span className="drift-box" style={{ top: '68%', left: '4%', width: '20px', height: '20px', animationDuration: '8s', animationDelay: '2s' }}></span>
                    <span className="drift-box" style={{ top: '78%', left: '92%', width: '30px', height: '30px', animationDuration: '10s', animationDelay: '0.5s' }}></span>
                    <span className="drift-box" style={{ top: '8%', left: '40%', width: '16px', height: '16px', animationDuration: '7s', animationDelay: '1.5s' }}></span>
                    <span className="drift-box" style={{ top: '85%', left: '55%', width: '22px', height: '22px', animationDuration: '9.5s', animationDelay: '2.5s' }}></span>
                    <span className="drift-box" style={{ top: '40%', left: '2%', width: '18px', height: '18px', animationDuration: '8.5s', animationDelay: '3s' }}></span>
                    <span className="drift-box" style={{ top: '45%', left: '95%', width: '24px', height: '24px', animationDuration: '10.5s', animationDelay: '1.2s' }}></span>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <p className="text-slate-400 text-sm mt-7 font-medium mb-2">No more switching tabs</p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-16 sm:mb-20 max-w-2xl mx-auto">
                        One powerful web to replace <span className="wavy-underline">all your travel tools</span>
                    </h3>

                    {/* Tool icons - top row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-8 sm:mb-10">
                        <img className="tool-icon w-21" src="/images/excel.png" alt="Spreadsheet" style={{ animationDelay: '0s', ['--ty' as any]: '6px' }} />
                        <img className="tool-icon w-21" src="/images/notes.png" alt="Notes" style={{ animationDelay: '0.3s', ['--ty' as any]: '-8px' }} />
                        <img className="tool-icon w-21" src="/images/google-maps.png" alt="Maps" style={{ animationDelay: '0.6s', ['--ty' as any]: '4px' }} />
                        <img className="tool-icon w-21" src="/images/traveloka.png" alt="Booking App" style={{ animationDelay: '0.9s', ['--ty' as any]: '-6px' }} />
                    </div>

                    {/* Tool icons - bottom row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                        <img className="tool-icon w-21" src="/images/notion.png" alt="Notion" style={{ animationDelay: '0.2s', ['--ty' as any]: '-4px' }} />
                        <img className="tool-icon w-21" src="/images/docs.png" alt="Docs" style={{ animationDelay: '0.5s', ['--ty' as any]: '8px' }} />
                        <img className="tool-icon w-21" src="/images/triplor.png" alt="Airbnb" style={{ animationDelay: '0.8s', ['--ty' as any]: '-6px' }} />
                        <img className="tool-icon w-21" src="/images/email.png" alt="Email" style={{ animationDelay: '1.1s', ['--ty' as any]: '6px' }} />
                        <img className="tool-icon w-21" src="/images/chatgpt.png" alt="ChatGPT" style={{ animationDelay: '1.4s', ['--ty' as any]: '-4px' }} />
                    </div>

                    {/* Grid background */}
                    <div className="grid-bg mt-[140px] pointer-events-none absolute inset-0 overflow-hidden">
                        {/* Row 1 */}
                        <span className="grid-box" style={{ top: '-40px', left: '-60px' }}></span>
                        <span className="grid-box" style={{ top: '-40px', left: '180px' }}></span>
                        <span className="grid-box" style={{ top: '-40px', left: '420px' }}></span>
                        <span className="grid-box" style={{ top: '-40px', left: '660px' }}></span>
                        <span className="grid-box" style={{ top: '-40px', left: '900px' }}></span>

                        {/* Row 2 */}
                        <span className="grid-box" style={{ top: '170px', left: '60px' }}></span>
                        <span className="grid-box" style={{ top: '170px', left: '300px' }}></span>
                        <span className="grid-box" style={{ top: '170px', left: '540px' }}></span>
                        <span className="grid-box" style={{ top: '170px', left: '780px' }}></span>
                    </div>
                </div>
            </section>

            <section className="relative z-10 overflow-hidden bg-[#f4f5f8] py-20 sm:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                {/* Giant faded background heading */}
                <h2 className="pointer-events-none select-none absolute inset-x-0 top-6 sm:top-10 md:top-14 text-center text-[3rem] sm:text-[5rem] md:text-[5rem] font-extrabold text-slate-900/[0.04] leading-none tracking-tight whitespace-nowrap">
                    Ready-to-use itinerary
                </h2>

                <div className="max-w-7xl top-13 mx-auto relative mb-15 ">
                    {/* Header with flex layout */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
                                Popular Itinerary
                            </span>
                            <h3 className="text-3xl sm:text-4xl md:text-3xl font-extrabold text-slate-900 leading-tight max-w-2xl">
                                Travel Smarter with Ready-Made Itineraries
                            </h3>
                            <p className="text-slate-500 text-base md:text-lg max-w-xl mt-2">
                                Support your favorite creators and start planning from a template
                            </p>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                            <button className="flex-shrink-0 bg-[#16404D] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition shadow-lg flex items-center gap-2 w-auto text-sm sm:text-base">
                                Browse More
                                <i className="ri-arrow-right-line text-sm sm:text-base"></i>
                            </button>
                            {/* Button lain jika ada */}
                        </div>
                    </div>

                    {/* 3 Box Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Box 1 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img src="https://www.cktravels.com/wp-content/uploads/2020/05/taiwan-night-markets-1.jpg" alt="Explore Taipei" className="w-full h-full object-cover" />

                            </div>
                            <div className="p-5">
                                <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                                    Explore Taipei! City, Nature, and everything in between
                                </h2>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                    "Lorem ipsum dolor sit amet" is the publishing industry's...
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">6 Days</span>
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">10 Places</span>
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">Min 1.400 USD</span>
                                </div>

                                {/* People joined & Rating */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="pfp-stack flex">
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=11" alt="" />
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm -ml-2" src="https://i.pravatar.cc/40?img=22" alt="" />
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm -ml-2" src="https://i.pravatar.cc/40?img=32" alt="" />

                                        </div>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-slate-900 font-bold">2k+</strong> Joined
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <span className="text-slate-600 text-xs ml-1">(4.8)</span>
                                    </div>
                                </div>

                                <hr className="border-slate-100 mb-4" />

                                {/* Author */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://i.pravatar.cc/40?img=33"
                                            alt="Ronald"
                                            className="h-8 w-8 rounded-full border-2 border-slate-200"
                                        />
                                        <div>
                                            <p className="text-slate-400 text-xs">Created by</p>
                                            <p className="text-slate-900 font-semibold text-sm">Ronald</p>
                                        </div>
                                    </div>
                                    <button className="text-blue-500 hover:text-blue-600 font-semibold text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img src="/images/bali.jpg" alt="Explore Bali" className="w-full h-full object-cover" />

                            </div>
                            <div className="p-5">
                                <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                                    Bali Paradise: Beaches, Temples & Rice Terraces
                                </h2>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                    Discover the island of gods with stunning beaches and rich culture...
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">8 Days</span>
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">12 Places</span>
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">Min 800 USD</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="pfp-stack flex">
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=12" alt="" />
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm -ml-2" src="https://i.pravatar.cc/40?img=23" alt="" />
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm -ml-2" src="https://i.pravatar.cc/40?img=34" alt="" />

                                        </div>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-slate-900 font-bold">1k+</strong> Joined
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-half-fill text-sm"></i>
                                        <span className="text-slate-600 text-xs ml-1">(4.6)</span>
                                    </div>
                                </div>

                                <hr className="border-slate-100 mb-4" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://i.pravatar.cc/40?img=55"
                                            alt="Sarah"
                                            className="h-8 w-8 rounded-full border-2 border-slate-200"
                                        />
                                        <div>
                                            <p className="text-slate-400 text-xs">Created by</p>
                                            <p className="text-slate-900 font-semibold text-sm">Sarah</p>
                                        </div>
                                    </div>
                                    <button className="text-blue-500 hover:text-blue-600 font-semibold text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img src="/images/bromo.jpg" alt="Explore Bromo" className="w-full h-full object-cover" />

                            </div>
                            <div className="p-5">
                                <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                                    Mount Bromo: Sunrise Volcano Adventure
                                </h2>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                    Witness the breathtaking sunrise over the active volcano in East Java...
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">4 Days</span>
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">8 Places</span>
                                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">Min 800 USD</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="pfp-stack flex">
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/40?img=13" alt="" />
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm -ml-2" src="https://i.pravatar.cc/40?img=24" alt="" />
                                            <img className="h-8 w-8 rounded-full border-2 border-white shadow-sm -ml-2" src="https://i.pravatar.cc/40?img=35" alt="" />

                                        </div>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-slate-900 font-bold">3k+</strong> Joined
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <i className="ri-star-fill text-sm"></i>
                                        <span className="text-slate-600 text-xs ml-1">(4.9)</span>
                                    </div>
                                </div>

                                <hr className="border-slate-100 mb-4" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://i.pravatar.cc/40?img=66"
                                            alt="Michael"
                                            className="h-8 w-8 rounded-full border-2 border-slate-200"
                                        />
                                        <div>
                                            <p className="text-slate-400 text-xs">Created by</p>
                                            <p className="text-slate-900 font-semibold text-sm">Michael</p>
                                        </div>
                                    </div>
                                    <button className="text-blue-500 hover:text-blue-600 font-semibold text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="review-section" className="relative z-10 overflow-hidden bg-slate-900 py-20 sm:py-24 px-4 sm:px-8 md:px-12">

                <div id="review-container" className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-12 lg:gap-20 items-center">

                    {/* ===== LEFT COLUMN - TEXT ===== */}
                    <div id="review-left" className="text-white space-y-6">
                        <p id="review-badge" className="text-[#47BB8E] font-semibold flex items-center gap-2">
                            Trusted By 90K+ Travelers
                        </p>

                        <h2 id="review-title" className="text-4xl md:text-5xl font-bold leading-tight">
                            What do they say?
                        </h2>

                        <p id="review-desc" className="text-[#A9A4BC]  max-w-lg  text-base md:text-lg leading-relaxed">
                            Every user review is an award, we appreciate any input you have, whether praise or suggestions.
                        </p>

                        <div id="review-cta-wrapper" className="flex gap-4 pt-4">
                            <button id="review-cta-btn" className="bg-blue-500 text-white transition px-6 py-3 rounded-full font-bold shadow-lg  flex items-center gap-2">
                                Do an Review
                            </button>
                            <button id="review-cta-btn" className="bg-white text-[#34364A] transition px-6 py-3 rounded-full font-bold shadow-lg  flex items-center gap-2">
                                Try it yourself
                            </button>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN - REVIEW CARDS ===== */}
                    <div id="review-right" className="relative overflow-hidden h-[400px] md:h-[550px]">
                        <div id="review-card-group" className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

                            {/* Left Card Column - Scrolling Up */}
                            <div id="review-left-col" className="overflow-hidden">
                                <div id="review-scroll-up" className="space-y-6">
                                    {/* Review Card 1 */}
                                    <div id="review-card-1" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-1" className="text-lg font-bold text-white mb-2">THANK YOU SO MUCH</h3>
                                        <p id="review-card-desc-1" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            So I can go on holiday to a nice place but my budget is safe
                                        </p>
                                        <div id="review-card-author-1" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-1"
                                                src="https://i.pravatar.cc/40?img=11"
                                                alt="Aldy"
                                                className="h-10 w-10 rounded-full "
                                            />
                                            <div>
                                                <p id="review-name-1" className="font-semibold text-white text-sm">Aldy</p>
                                                <p id="review-role-1" className="text-gray-400 text-xs">Traveler</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Card 2 */}
                                    <div id="review-card-2" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-2" className="text-lg font-bold text-white mb-2">AMAZING EXPERIENCE</h3>
                                        <p id="review-card-desc-2" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Tripora made my trip to Bali so memorable and well-organized!
                                        </p>
                                        <div id="review-card-author-2" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-2"
                                                src="https://i.pravatar.cc/40?img=22"
                                                alt="Sarah"
                                                className="h-10 w-10 rounded-full border-2 border-yellow-400"
                                            />
                                            <div>
                                                <p id="review-name-2" className="font-semibold text-white text-sm">Sarah</p>
                                                <p id="review-role-2" className="text-gray-400 text-xs">Digital Nomad</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Card 3 */}
                                    <div id="review-card-3" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-3" className="text-lg font-bold text-white mb-2">BEST PLANNER EVER</h3>
                                        <p id="review-card-desc-3" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Saved so much time planning my Europe trip. Highly recommended!
                                        </p>
                                        <div id="review-card-author-3" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-3"
                                                src="https://i.pravatar.cc/40?img=33"
                                                alt="Michael"
                                                className="h-10 w-10 rounded-full "
                                            />
                                            <div>
                                                <p id="review-name-3" className="font-semibold text-white text-sm">Michael</p>
                                                <p id="review-role-3" className="text-gray-400 text-xs">Adventure Seeker</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Card 4 */}
                                    <div id="review-card-4" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-4" className="text-lg font-bold text-white mb-2">LIFE CHANGING</h3>
                                        <p id="review-card-desc-4" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Finally found a travel platform that understands what I need!
                                        </p>
                                        <div id="review-card-author-4" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-4"
                                                src="https://i.pravatar.cc/40?img=44"
                                                alt="Jessica"
                                                className="h-10 w-10 rounded-full "
                                            />
                                            <div>
                                                <p id="review-name-4" className="font-semibold text-white text-sm">Jessica</p>
                                                <p id="review-role-4" className="text-gray-400 text-xs">Solo Traveler</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Card Column - Scrolling Down */}
                            <div id="review-right-col" className="hidden md:block overflow-hidden">
                                <div id="review-scroll-down" className="space-y-6">
                                    {/* Review Card 5 */}
                                    <div id="review-card-5" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-5" className="text-lg font-bold text-white mb-2">PERFECT FOR GROUP</h3>
                                        <p id="review-card-desc-5" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Planning with friends was so easy. Love the collaboration feature!
                                        </p>
                                        <div id="review-card-author-5" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-5"
                                                src="https://i.pravatar.cc/40?img=55"
                                                alt="David"
                                                className="h-10 w-10 rounded-full "
                                            />
                                            <div>
                                                <p id="review-name-5" className="font-semibold text-white text-sm">David</p>
                                                <p id="review-role-5" className="text-gray-400 text-xs">Group Traveler</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Card 6 */}
                                    <div id="review-card-6" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-6" className="text-lg font-bold text-white mb-2">GREAT VALUE</h3>
                                        <p id="review-card-desc-6" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Found amazing deals that saved me 30% on my entire trip!
                                        </p>
                                        <div id="review-card-author-6" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-6"
                                                src="https://i.pravatar.cc/40?img=66"
                                                alt="Emma"
                                                className="h-10 w-10 rounded-full "
                                            />
                                            <div>
                                                <p id="review-name-6" className="font-semibold text-white text-sm">Emma</p>
                                                <p id="review-role-6" className="text-gray-400 text-xs">Budget Traveler</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Card 7 */}
                                    <div id="review-card-7" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-7" className="text-lg font-bold text-white mb-2">WILL USE AGAIN</h3>
                                        <p id="review-card-desc-7" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            My go-to travel planning tool. Beautiful and incredibly useful!
                                        </p>
                                        <div id="review-card-author-7" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-7"
                                                src="https://i.pravatar.cc/40?img=66"

                                                alt="James"
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <p id="review-name-7" className="font-semibold text-white text-sm">James</p>
                                                <p id="review-role-7" className="text-gray-400 text-xs">Frequent Traveler</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Card 8 */}
                                    <div id="review-card-8" className="review-card bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl transition duration-300 hover:bg-white/20">

                                        <h3 id="review-card-title-8" className="text-lg font-bold text-white mb-2">FIRST TIME TRAVELER</h3>
                                        <p id="review-card-desc-8" className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Guided me through every step. So grateful for this platform!
                                        </p>
                                        <div id="review-card-author-8" className="flex items-center gap-3">
                                            <img
                                                id="review-avatar-8"
                                                src="https://i.pravatar.cc/40?img=66"

                                                alt="Lisa"
                                                className="h-10 w-10 rounded-full "
                                            />
                                            <div>
                                                <p id="review-name-8" className="font-semibold text-white text-sm">Lisa</p>
                                                <p id="review-role-8" className="text-gray-400 text-xs">First-time Traveler</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="relative z-10 overflow-hidden bg-[#f4f5f8] py-20 sm:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                {/* Giant faded background heading */}
                <h2
                    className="pointer-events-none select-none absolute inset-x-0 top-6 sm:top-10 md:top-14 text-center text-[3rem] sm:text-[5rem] md:text-[5rem] font-extrabold text-slate-900/[0.04] leading-none tracking-tight whitespace-nowrap"
                    style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)'
                    }}
                >
                    Still confused and unclear?
                </h2>

                <div className="max-w-7xl mx-auto relative">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-emerald-500 text-base md:text-xl font-semibold mb-3" data-aos="fade-up">
                            Ask Tripora
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight" data-aos="fade-up">
                            Frequently Asked <br className="hidden md:block" />
                            Questions
                        </h2>
                        <p className="text-slate-500 mt-3 max-w-2xl mx-auto" data-aos="fade-up">
                            Find answers to the most commonly asked questions about Tripora
                        </p>
                    </div>

                    {/* FAQ Grid */}
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        {/* Left column - FAQ 1, 2, 3 */}
                        <div className="space-y-4">
                            {faqData.slice(0, 3).map((faq) => (
                                <div
                                    key={faq.id}
                                    className={`faq-item bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl border border-slate-100 ${openFaq === faq.id ? 'active shadow-lg' : ''
                                        }`}
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <h3 className={`font-bold text-base md:text-lg text-slate-800 transition-colors duration-300 ${openFaq === faq.id ? 'text-blue-600' : ''
                                            }`}>
                                            {faq.question}
                                        </h3>
                                        <span className={`text-2xl text-blue-500 transition-all duration-300 flex-shrink-0 ${openFaq === faq.id ? 'rotate-45' : ''
                                            }`}>
                                            +
                                        </span>
                                    </div>
                                    <div
                                        className={`faq-content mt-2 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-500 ${openFaq === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right column - FAQ 4, 5, 6 */}
                        <div className="space-y-4">
                            {faqData.slice(3, 6).map((faq) => (
                                <div
                                    key={faq.id}
                                    className={`faq-item bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl border border-slate-100 ${openFaq === faq.id ? 'active shadow-lg' : ''
                                        }`}
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <h3 className={`font-bold text-base md:text-lg text-slate-800 transition-colors duration-300 ${openFaq === faq.id ? 'text-blue-600' : ''
                                            }`}>
                                            {faq.question}
                                        </h3>
                                        <span className={`text-2xl text-blue-500 transition-all duration-300 flex-shrink-0 ${openFaq === faq.id ? 'rotate-45' : ''
                                            }`}>
                                            +
                                        </span>
                                    </div>
                                    <div
                                        className={`faq-content mt-2 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-500 ${openFaq === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ============ FOOTER ============ */}
            <Footer />
        </div>
    )
}