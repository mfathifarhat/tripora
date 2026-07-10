import { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router";

export function Navbar() {
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

  return (
    <>
      {/* ============ NAVBAR - STICKY ============ */}
      <nav id="navbar" className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="flex items-center gap-1.5 text-white">
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

        <div className="hidden md:flex glass-light rounded-full border border-white/15 p-1.5 items-center gap-1 text-sm font-medium text-white/80 menu-bg">
          <NavLink to="/" className="rounded-full bg-white text-slate-900 px-5 py-2 font-semibold nav-link-active">Home</NavLink>
          <NavLink to="#" className="rounded-full px-5 py-2 hover:text-white transition nav-link">About Us</NavLink>
          <NavLink to="#" className="rounded-full px-5 py-2 hover:text-white transition nav-link">Social</NavLink>
          <NavLink to="#" className="rounded-full px-5 py-2 hover:text-white transition nav-link">Be Partner</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="lang-container flex items-center gap-1 text-xs font-medium text-white/60">
            <span className={`lang-item ${activeLang === "IDN" ? "active" : ""}`} onClick={() => setActiveLang("IDN")}>
              <span className="flag">
                <img width="20" src="https://img.icons8.com/emoji/48/indonesia-emoji.png" alt="Indonesia" />
              </span>
              <span className="lang-text lang-text-nav">IDN</span>
            </span>
            <span className="text-white/30 lang-divider">|</span>
            <span className={`lang-item ${activeLang === "ENG" ? "active" : ""}`} onClick={() => setActiveLang("ENG")}>
              <span className="flag">
                <img width="20" src="https://img.icons8.com/emoji/48/united-kingdom-emoji.png" alt="UK" />
              </span>
              <span className="lang-text lang-text-nav">ENG</span>
            </span>
            <span className="text-white/30 lang-divider">|</span>
            <span className={`lang-item ${activeLang === "CHN" ? "active" : ""}`} onClick={() => setActiveLang("CHN")}>
              <span className="flag">
                <img width="20" src="https://img.icons8.com/emoji/48/china-emoji.png" alt="China" />
              </span>
              <span className="lang-text lang-text-nav">CHN</span>
            </span>
          </div>

          <button ref={profileRef} id="profileBtn" className="relative z-30 group" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="relative p-1">
              <img src="/images/profile-user.png" alt="Profile" className="h-[55px] w-[55px] rounded-full object-cover relative z-10" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 group-hover:border-blue-300 transition-all duration-300 profile-border" style={{ padding: '1px', inset: '-1px' }}></div>
            </div>
          </button>
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
    </>
  );
}
