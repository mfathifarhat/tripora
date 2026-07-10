import { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

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
            <i className="ri-user-3-line"></i>
            <span>My Profile</span>
          </div>
          <div className="menu-item">
            <i className="ri-wallet-3-line"></i>
            <span>Wallet <span className="text-blue-500 text-xs ml-1">(1,250 TC)</span></span>
          </div>
          <div className="menu-item">
            <i className="ri-history-line"></i>
            <span>My Trips</span>
          </div>
          <div className="menu-item">
            <i className="ri-settings-3-line"></i>
            <span>Settings</span>
          </div>
          <div className="menu-item danger" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
            <i className="ri-logout-box-r-line"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* ============ HERO SECTION ============ */}
      <section className="hero-section relative w-full overflow-hidden" id="heroSection">
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
        <div className="relative z-20 flex flex-col items-center text-center px-4" style={{ paddingTop: 'clamp(6rem, 18vh, 9rem)' }}>
          <span className="glass-light border border-white/20 text-white text-xs md:text-sm font-semibold tracking-wide rounded-full px-5 py-2 mb-6">
            <i className="ri-map-pin-2-fill mr-1 text-yellow-500"></i>
            <span id="slideLocation">{slides[activeIndex].location}</span>
          </span>
          <h1 className="font-extrabold text-4xl leading-normal sm:text-5xl md:text-7xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all duration-700 bg-gradient-to-r from-white via-blue-200/80 to-white bg-clip-text text-transparent" id="slideTitle">
            {slides[activeIndex].title}
          </h1>
          <h2 className="text-white/90 font-light tracking-wide text-2xl sm:text-3xl md:text-5xl mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-700" id="slideSubtitle">
            {slides[activeIndex].subtitle}
          </h2>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 z-20 px-4 sm:px-8 md:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            {/* People joined glass card */}
            <div className="glass border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-xs shadow-2xl shadow-black/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="pfp-stack flex">
                  <img className="h-9 w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=11" alt="" />
                  <img className="h-9 w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=22" alt="" />
                  <img className="h-9 w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=32" alt="" />
                  <img className="h-9 w-9 rounded-full border-2 border-slate-900/60" src="https://i.pravatar.cc/40?img=44" alt="" />
                </div>
                <p className="text-white text-sm">
                  <strong className="text-base font-bold">2.5k+</strong> People Joined
                </p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4" id="slideDescription">
                {slides[activeIndex].description}
              </p>
              <a href="#" className="flex items-center justify-center gap-2 w-full rounded-full bg-yellow-400 text-slate-900 text-sm font-semibold py-2.5 hover:bg-yellow-300 transition">
                Made Itinerary Now
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-700">
                  <i className="ri-arrow-right-up-line text-xs"></i>
                </span>
              </a>
            </div>

            {/* Card row */}
            <div className="flex gap-3 sm:gap-4 w-full lg:w-auto overflow-x-auto lg:overflow-visible pb-1 card-row">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`card-item ${activeIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="relative w-full h-full">
                    <img src={slide.bgImage} alt={slide.cardTitle} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 card-fade"></div>
                    <div className="absolute bottom-0 left-0 right-0 card-content text-left">
                      <h3 className="text-white font-bold mb-1">{slide.cardTitle}</h3>
                      <p className="text-white/70 leading-snug">{slide.cardDesc}</p>
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
          <p className="text-slate-400 text-sm mt-20 font-medium mb-2">No more switching tabs</p>
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

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}
