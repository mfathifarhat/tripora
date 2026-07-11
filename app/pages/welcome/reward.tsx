import { useState } from "react";
import { NavLink } from "react-router";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

type HistoryType = "earn" | "redeem";

interface HistoryItem {
    id: number;
    type: HistoryType;
    title: string;
    description: string;
    date: string;
    amount: number;
    icon: string;
}

interface RewardItem {
    id: number;
    title: string;
    category: string;
    cost: number;
    icon: string;
    iconBg: string;
    tag: string;
}

function Reward() {
    const [historyFilter, setHistoryFilter] = useState<"all" | HistoryType>("all");

    // ===== Mock data — connect to API/user state later =====
    const coinBalance = 1250;
    const coinsThisMonth = 320;
    const totalRedeemed = 900;

    const earnMethods = [
        { icon: "ri-share-forward-line", label: "Share an Itinerary", desc: "+50 coins" },
        { icon: "ri-user-add-line", label: "Invite a Friend", desc: "+100 coins" },
        { icon: "ri-calendar-check-line", label: "First Booking", desc: "+150 coins" },
        { icon: "ri-star-smile-line", label: "Leave a Review", desc: "+25 coins" },
    ];

    const historyData: HistoryItem[] = [
        { id: 1, type: "earn", title: "Shared Itinerary: Bali Adventure", description: "Shared with 3 friends", date: "2 days ago", amount: 50, icon: "ri-share-forward-line" },
        { id: 2, type: "redeem", title: "Dining Voucher - 20% Off", description: "Redeemed with coins", date: "5 days ago", amount: 300, icon: "ri-restaurant-2-line" },
        { id: 3, type: "earn", title: "Invited a Friend", description: "Sarah joined using your code", date: "1 week ago", amount: 100, icon: "ri-user-add-line" },
        { id: 4, type: "earn", title: "First Itinerary Booking", description: "Labuan Bajo Trip", date: "2 weeks ago", amount: 150, icon: "ri-suitcase-line" },
        { id: 5, type: "redeem", title: "10% Hotel Discount", description: "Redeemed with coins", date: "3 weeks ago", amount: 400, icon: "ri-hotel-bed-line" },
        { id: 6, type: "earn", title: "Left a Trip Review", description: "Mount Bromo Sunrise", date: "1 month ago", amount: 25, icon: "ri-star-smile-line" },
    ];

    const rewardsData: RewardItem[] = [
        { id: 1, title: "20% Dining Voucher", category: "Food & Dining", cost: 300, icon: "ri-restaurant-2-line", iconBg: "bg-orange-400", tag: "Popular" },
        { id: 2, title: "10% Hotel Discount", category: "Stays", cost: 500, icon: "ri-hotel-bed-line", iconBg: "bg-blue-400", tag: "Limited" },
        { id: 3, title: "Attraction Ticket Discount", category: "Activities", cost: 250, icon: "ri-ticket-2-line", iconBg: "bg-emerald-400", tag: "" },
        { id: 4, title: "Booking Cashback", category: "Booking", cost: 600, icon: "ri-refund-2-line", iconBg: "bg-yellow-400", tag: "Popular" },
        { id: 5, title: "Premium Itinerary Template", category: "Itinerary", cost: 200, icon: "ri-file-list-3-line", iconBg: "bg-purple-400", tag: "" },
        { id: 6, title: "Transport Voucher", category: "Transport", cost: 350, icon: "ri-taxi-line", iconBg: "bg-pink-400", tag: "" },
    ];

    const filteredHistory = historyFilter === "all"
        ? historyData
        : historyData.filter((h) => h.type === historyFilter);

    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans overflow-x-hidden">
            <Navbar />

            {/* ============ HERO: COIN BALANCE ============ */}
            <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/images/bali.jpg')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900"></div>
                </div>

                <div className="pointer-events-none absolute -top-20 -right-10 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-yellow-400/20 blur-3xl z-[1]"></div>
                <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-blue-500/20 blur-3xl z-[1]"></div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 glass-light border border-white/20 text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-5 sm:mb-6">
                        <i className="ri-coins-line text-yellow-400"></i>
                        Reward Center
                    </span>

                    <p className="text-white/60 text-sm sm:text-base mb-2">Your Total Coins</p>
                    <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6 sm:mb-8">
                        {coinBalance.toLocaleString("en-US")}
                        <span className="text-lg sm:text-2xl md:text-3xl align-middle ml-2 text-white/60 font-semibold">coins</span>
                    </h1>

                    {/* Stat pills */}
                    <div className="flex flex-col xs:flex-row sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                        <div className="glass border border-white/10 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 w-full sm:w-auto flex items-center gap-3">
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                <i className="ri-arrow-up-line text-green-400 text-base sm:text-lg"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold text-sm sm:text-base">+{coinsThisMonth}</p>
                                <p className="text-white/50 text-xs">This month</p>
                            </div>
                        </div>
                        <div className="glass border border-white/10 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 w-full sm:w-auto flex items-center gap-3">
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                <i className="ri-gift-2-line text-blue-400 text-base sm:text-lg"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold text-sm sm:text-base">{totalRedeemed.toLocaleString("en-US")}</p>
                                <p className="text-white/50 text-xs">Total redeemed</p>
                            </div>
                        </div>
                    </div>

                    {/* Ways to earn coins */}
                    <div className="text-left mt-12 sm:mt-14">
                        <h3 className="text-white/80 text-sm sm:text-base font-semibold mb-4 sm:mb-5">Ways to earn coins</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {earnMethods.map((m, idx) => (
                                <div key={idx} className="glass border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col items-start gap-2.5 sm:gap-3">
                                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-yellow-400/15 flex items-center justify-center">
                                        <i className={`${m.icon} text-yellow-400 text-base sm:text-lg`}></i>
                                    </div>
                                    <div>
                                        <p className="text-white text-xs sm:text-sm font-bold leading-tight">{m.label}</p>
                                        <p className="text-white/50 text-[11px] sm:text-xs mt-0.5">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ HISTORY ============ */}
            <section className="relative z-10 overflow-hidden bg-[#f4f5f8] py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 text-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                        <div>
                            <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
                                History
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                Coin History
                            </h3>
                        </div>

                        {/* Filter tabs */}
                        <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-slate-100 w-full sm:w-auto overflow-x-auto">
                            {([
                                { key: "all", label: "All" },
                                { key: "earn", label: "Earned" },
                                { key: "redeem", label: "Redeemed" },
                            ] as const).map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setHistoryFilter(tab.key)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${historyFilter === tab.key
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-500 hover:text-slate-900"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 sm:space-y-3.5">
                        {filteredHistory.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-slate-900/5 border border-slate-100 flex items-center gap-3 sm:gap-4"
                            >
                                <div
                                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0 ${item.type === "earn" ? "bg-green-100" : "bg-red-100"
                                        }`}
                                >
                                    <i className={`${item.icon} text-base sm:text-lg ${item.type === "earn" ? "text-green-600" : "text-red-500"}`}></i>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-slate-900 font-bold text-sm sm:text-base truncate">{item.title}</p>
                                    <p className="text-slate-400 text-xs sm:text-sm truncate">{item.description}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className={`font-bold text-sm sm:text-base ${item.type === "earn" ? "text-green-600" : "text-red-500"}`}>
                                        {item.type === "earn" ? "+" : "-"}{item.amount}
                                    </p>
                                    <p className="text-slate-400 text-[11px] sm:text-xs">{item.date}</p>
                                </div>
                            </div>
                        ))}

                        {filteredHistory.length === 0 && (
                            <div className="text-center py-12 text-slate-400 text-sm">
                                No history in this category yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ============ REDEEM CATALOG ============ */}
            <section className="relative z-10 overflow-hidden bg-slate-900 py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 sm:mb-10">
                        <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
                            Redeem Coins
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-xl">
                            Redeem Your Coins for Great Rewards
                        </h3>
                        <p className="text-white/50 text-sm sm:text-base mt-2 max-w-xl">
                            The more you use Tripora, the more rewards you can claim.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {rewardsData.map((reward) => {
                            const canRedeem = coinBalance >= reward.cost;
                            return (
                                <div
                                    key={reward.id}
                                    className="glass border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col shadow-xl shadow-black/20"
                                >
                                    <div className="flex items-start justify-between mb-4 sm:mb-5">
                                        <div className={`h-11 w-11 sm:h-12 sm:w-12 rounded-2xl ${reward.iconBg} flex items-center justify-center`}>
                                            <i className={`${reward.icon} text-slate-900 text-lg sm:text-xl`}></i>
                                        </div>
                                        {reward.tag && (
                                            <span className="bg-white/10 text-white/70 text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                                {reward.tag}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-white/40 text-[11px] sm:text-xs uppercase tracking-wide font-semibold mb-1">
                                        {reward.category}
                                    </p>
                                    <h4 className="text-white font-bold text-sm sm:text-base mb-4 sm:mb-5 leading-snug">
                                        {reward.title}
                                    </h4>

                                    <div className="mt-auto flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-sm sm:text-base">
                                            <i className="ri-coins-line"></i>
                                            {reward.cost}
                                        </div>
                                        <button
                                            disabled={!canRedeem}
                                            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${canRedeem
                                                ? "bg-[#fff] text-slate-900"
                                                : "bg-white/10 text-white/30 cursor-not-allowed"
                                                }`}
                                        >
                                            {canRedeem ? "Redeem" : "Not enough"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Reward;