import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";

type NavbarProps = {
    /** When true, the navbar background is active immediately, without waiting for scroll. */
    forceActive?: boolean;
};

export function Navbar({ forceActive = false }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(forceActive);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeLang, setActiveLang] = useState("ENG");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle navbar scroll effect
    useEffect(() => {
        if (forceActive) {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [forceActive]);

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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobileMenuOpen]);

    const menuItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About Us" },
        { to: "/itinerary", label: "Itinerary" },
        { to: "/social", label: "Social" },
    ];

    // Burger icon color based on scroll state
    const burgerColor = isScrolled ? "text-slate-700" : "text-white";

    return (
        <>
            {/* ============ NAVBAR - STICKY ============ */}
            <nav id="navbar" className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto ">
                    {/* Logo - Left */}
                    <div className="flex items-center gap-1.5 text-white flex-shrink-0">
                        <div className="relative inline-flex items-center">
                            <i id="rocketIcon"
                                className="ri-rocket-fill text-3xl text-transparent bg-gradient-to-b from-white via-white to-white bg-clip-text relative z-10 animate-pulse-glow rocket-icon"></i>
                            <div className="absolute inset-0 blur-2xl bg-blue-500/30 rounded-full -z-0 animate-pulse-slow rocket-glow"></div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 rocket-fire">
                                <div className="w-1 h-3 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full animate-flicker-1"></div>
                                <div className="w-1.5 h-4 bg-gradient-to-t from-yellow-300 via-orange-500 to-red-500 rounded-full animate-flicker-2"></div>
                                <div className="w-1 h-3 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full animate-flicker-3"></div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent logo-text">
                            Tripora<span className="text-yellow-500 logo-dot">.</span>
                        </h2>
                    </div>

                    {/* Desktop Menu - Center */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 glass-light rounded-full border border-white/15 p-1.5 items-center gap-1 text-sm font-medium text-white/80 menu-bg">
                        {menuItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.to}
                                className={({ isActive }) => {
                                    let baseClasses = "rounded-full px-5 py-2 font-semibold transition";

                                    if (isActive) {
                                        // Active state - depends on scroll
                                        if (isScrolled) {
                                            return `${baseClasses} bg-blue-500 text-white shadow-lg shadow-blue-500/30`;
                                        } else {
                                            return `${baseClasses} bg-white text-slate-900 shadow-lg shadow-white/20`;
                                        }
                                    } else {
                                        // Inactive state
                                        return `${baseClasses} hover:text-white hover:bg-white/10 nav-link`;
                                    }
                                }}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        {/* Language Selector */}
                        <div className="lang-container hidden sm:flex items-center gap-1 text-xs font-medium text-white/60">
                            {/* IDN */}
                            <span
                                className={`lang-item group relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer ${activeLang === "IDN" ? "active" : ""}`}
                                onClick={() => setActiveLang("IDN")}
                            >
                                <span className={`flag transition-all duration-300 ${activeLang === "IDN" ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                    }`}>
                                    <img width="20" src="https://img.icons8.com/emoji/48/indonesia-emoji.png" alt="Indonesia" />
                                </span>
                                <span className={`lang-text lang-text-nav transition-colors duration-300 ${activeLang === "IDN" ? "text-white" : "group-hover:text-white"
                                    }`}>
                                    IDN
                                </span>
                            </span>

                            <span className="text-white/30 lang-divider">|</span>

                            {/* ENG */}
                            <span
                                className={`lang-item group relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer ${activeLang === "ENG" ? "active" : ""}`}
                                onClick={() => setActiveLang("ENG")}
                            >
                                <span className={`flag transition-all duration-300 ${activeLang === "ENG" ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                    }`}>
                                    <img width="20" src="https://img.icons8.com/emoji/48/united-kingdom-emoji.png" alt="UK" />
                                </span>
                                <span className={`lang-text lang-text-nav transition-colors duration-300 ${activeLang === "ENG" ? "text-white" : "group-hover:text-white"
                                    }`}>
                                    ENG
                                </span>
                            </span>

                            <span className="text-white/30 lang-divider">|</span>

                            {/* CHN */}
                            <span
                                className={`lang-item group relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer ${activeLang === "CHN" ? "active" : ""}`}
                                onClick={() => setActiveLang("CHN")}
                            >
                                <span className={`flag transition-all duration-300 ${activeLang === "CHN" ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                    }`}>
                                    <img width="20" src="https://img.icons8.com/emoji/48/china-emoji.png" alt="China" />
                                </span>
                                <span className={`lang-text lang-text-nav transition-colors duration-300 ${activeLang === "CHN" ? "text-white" : "group-hover:text-white"
                                    }`}>
                                    CHN
                                </span>
                            </span>
                        </div>

                        {/* Profile Button */}
                        <button ref={profileRef} id="profileBtn" className="relative z-30 group flex-shrink-0" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                            <div className="relative p-1">
                                <img src="/images/profile-user.png" alt="Profile" className="h-[40px] w-[40px] md:h-[55px] md:w-[55px] rounded-full object-cover relative z-10" />
                                <div className="absolute inset-0 rounded-full border-2 border-blue-400 group-hover:border-blue-300 transition-all duration-300 profile-border" style={{ padding: '1px', inset: '-1px' }}></div>
                            </div>
                        </button>

                        {/* Burger Menu Button - Mobile */}
                        <button
                            className={`md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-50 transition-colors duration-300 ${burgerColor}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                // Close Icon (X)
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Burger Icon
                                <div className="relative w-6 h-5">
                                    <span className={`absolute left-0 top-0 w-full h-0.5 transition-all duration-300 ${burgerColor}`} style={{ backgroundColor: isScrolled ? '#334155' : 'white' }}></span>
                                    <span className={`absolute left-0 top-2 w-full h-0.5 transition-all duration-300 ${burgerColor}`} style={{ backgroundColor: isScrolled ? '#334155' : 'white' }}></span>
                                    <span className={`absolute left-0 top-4 w-full h-0.5 transition-all duration-300 ${burgerColor}`} style={{ backgroundColor: isScrolled ? '#334155' : 'white' }}></span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-lg transition-all duration-300 z-40 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-8 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Language Selector */}
                        <div className="flex justify-center gap-3 mb-12">
                            {/* IDN */}
                            <span
                                className={`lang-item group relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer ${activeLang === "IDN" ? "active" : ""
                                    }`}
                                onClick={() => setActiveLang("IDN")}
                            >
                                <span className={`flag transition-all duration-300 ${activeLang === "IDN"
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                    }`}>
                                    <img width="24" src="https://img.icons8.com/emoji/48/indonesia-emoji.png" alt="Indonesia" />
                                </span>
                                <span className={`lang-text lang-text-nav transition-colors duration-300 ${activeLang === "IDN" ? "text-white" : "group-hover:text-white"
                                    }`}>
                                    IDN
                                </span>
                            </span>

                            {/* Divider */}
                            <span className="text-white/30 text-lg">|</span>

                            {/* ENG */}
                            <span
                                className={`lang-item group relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer ${activeLang === "ENG" ? "active" : ""
                                    }`}
                                onClick={() => setActiveLang("ENG")}
                            >
                                <span className={`flag transition-all duration-300 ${activeLang === "ENG"
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                    }`}>
                                    <img width="24" src="https://img.icons8.com/emoji/48/united-kingdom-emoji.png" alt="UK" />
                                </span>
                                <span className={`lang-text lang-text-nav transition-colors duration-300 ${activeLang === "ENG" ? "text-white" : "group-hover:text-white"
                                    }`}>
                                    ENG
                                </span>
                            </span>

                            {/* Divider */}
                            <span className="text-white/30 text-lg">|</span>

                            {/* CHN */}
                            <span
                                className={`lang-item group relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer ${activeLang === "CHN" ? "active" : ""
                                    }`}
                                onClick={() => setActiveLang("CHN")}
                            >
                                <span className={`flag transition-all duration-300 ${activeLang === "CHN"
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                                    }`}>
                                    <img width="24" src="https://img.icons8.com/emoji/48/china-emoji.png" alt="China" />
                                </span>
                                <span className={`lang-text lang-text-nav transition-colors duration-300 ${activeLang === "CHN" ? "text-white" : "group-hover:text-white"
                                    }`}>
                                    CHN
                                </span>
                            </span>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="flex flex-col items-center gap-6">
                            {menuItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `text-2xl font-semibold transition-colors ${isActive
                                            ? 'text-blue-400 border-b-2 border-blue-400'
                                            : 'text-white/60 hover:text-white'
                                        }`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

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

                    <a href="/reward">
                        <div className="menu-item">
                            <i className="ri-coins-line"></i>
                            <span>Coins</span>
                        </div>
                    </a>
                    <div className="menu-item danger" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                        <i className="ri-logout-box-r-line"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
}