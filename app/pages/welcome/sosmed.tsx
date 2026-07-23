import { useState } from "react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

type Comment = {
    id: string;
    author: string;
    avatar: string;
    text: string;
    time: string;
};

type ItineraryEmbed = {
    title: string;
    dateRange: string;
    people: string;
    budget: string;
    views: string;
    days: { label: string; items: string[] }[];
};

type Post = {
    id: string;
    author: string;
    avatar: string;
    timeAgo: string;
    location: string;
    route: string;
    category: string;
    caption: string;
    itinerary?: ItineraryEmbed;
    images?: string[];
    tags: string[];
    likes: number;
    liked: boolean;
    commentsOpen: boolean;
    comments: Comment[];
};

const filterTags = ["All", "Beach", "Mountain", "City", "Cultural", "Budget", "Luxury", "Backpacker", "Family"];

const stories = [
    { name: "del.andini", avatar: "https://i.pravatar.cc/100?img=5" },
    { name: "aldy_trip", avatar: "https://i.pravatar.cc/100?img=8" },
    { name: "wanderlust.id", avatar: "https://i.pravatar.cc/100?img=15" },
    { name: "bali_seeker", avatar: "https://i.pravatar.cc/100?img=22" },
    { name: "nusantara_", avatar: "https://i.pravatar.cc/100?img=33" },
    { name: "trio.hemat", avatar: "https://i.pravatar.cc/100?img=41" },
];

const trendingDestinations = [
    { rank: 1, name: "Bali, Indonesia", trips: "4.2k trips this month", img: "/images/bali.jpg" },
    { rank: 2, name: "Bromo, East Java", trips: "2.8k trips this month", img: "/images/bromo.jpg" },
    { rank: 3, name: "Labuan Bajo, NTT", trips: "1.9k trips this month", img: "/images/pantai.jpg" },
];

const initialTravelers = [
    { id: "t1", name: "bali_seeker", trips: 23, avatar: "https://i.pravatar.cc/100?img=22", following: false },
    { id: "t2", name: "nusantara_", trips: 17, avatar: "https://i.pravatar.cc/100?img=33", following: false },
    { id: "t3", name: "trio.hemat", trips: 11, avatar: "https://i.pravatar.cc/100?img=41", following: true },
];

const initialPosts: Post[] = [
    {
        id: "p1",
        author: "Delia Andini",
        avatar: "https://i.pravatar.cc/100?img=5",
        timeAgo: "2 hours ago",
        location: "Jakarta, ID",
        route: "Bandung → Bali",
        category: "Beach",
        caption:
            "Such a productive weekend! Spent 3 days in Bali with my bestie — from Kuta to Uluwatu to Ubud. Tripora planned everything and it was literally perfect ✨ Highly recommend for anyone wanting a budget-friendly but still feels premium trip!",
        itinerary: {
            title: "3 Days in Bali",
            dateRange: "Apr 10 – Apr 13",
            people: "2 people",
            budget: "IDR 8.500.000",
            views: "2.8k",
            days: [
                { label: "Day 1 - Kuta", items: ["Kuta Beach", "Beachwalk Mall", "Dinner at Jimbaran"] },
                { label: "Day 2 - Uluwatu", items: ["Uluwatu Temple", "Sunset at Uluwatu", "Kecak Fire Dance"] },
                { label: "Day 3 - Ubud", items: ["Monkey Forest", "Tegalalang Rice Terrace", "Departure"] },
            ],
        },
        tags: ["bali", "kutabeach", "uluwatu", "tripora"],
        likes: 284,
        liked: false,
        commentsOpen: false,
        comments: [
            {
                id: "c1",
                author: "del.andini",
                avatar: "https://i.pravatar.cc/100?img=5",
                text: "Is Kuta worth it? I heard it's pretty crowded on weekends 👀",
                time: "1 hour ago",
            },
            {
                id: "c2",
                author: "bali_seeker",
                avatar: "https://i.pravatar.cc/100?img=22",
                text: "Gonna clone this itinerary! Does the budget already include hotels?",
                time: "45 mins ago",
            },
        ],
    },
    {
        id: "p2",
        author: "Aldy Kusuma",
        avatar: "https://i.pravatar.cc/100?img=8",
        timeAgo: "5 hours ago",
        location: "Bali, ID",
        route: "Surabaya → Bali",
        category: "Cultural",
        caption:
            "Golden hour at Uluwatu never fails. 5 days in Bali still doesn't feel enough 🌅 Tripora picked the best time for sunset here, and it was life-changing.",
        images: [
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
            "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80",
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80",
        ],
        tags: ["bali", "uluwatu", "goldenhour", "tripora"],
        likes: 517,
        liked: false,
        commentsOpen: false,
        comments: [
            {
                id: "c3",
                author: "nusantara_",
                avatar: "https://i.pravatar.cc/100?img=33",
                text: "Such an aesthetic shot! 😍 what camera did you use?",
                time: "3 hours ago",
            },
        ],
    },
];

function Sosmed() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [travelers, setTravelers] = useState(initialTravelers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [selectedItinerary, setSelectedItinerary] = useState("");

    const visiblePosts = activeFilter === "All" ? posts : posts.filter((p) => p.category === activeFilter);

    function toggleLike(id: string) {
        setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
        );
    }

    function toggleComments(id: string) {
        setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, commentsOpen: !p.commentsOpen } : p)));
    }

    function toggleFollow(id: string) {
        setTravelers((prev) => prev.map((t) => (t.id === id ? { ...t, following: !t.following } : t)));
    }

    function handlePublish() {
        setPostContent("");
        setSelectedItinerary("");
        setIsModalOpen(false);
    }

    return (
        <div className="bg-[#f4f5f8] min-h-screen text-slate-900 font-sans overflow-x-hidden">
            <Navbar forceActive />
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-28 pb-10 grid grid-cols-1 md:grid-cols-[240px_1fr_280px] gap-6 items-start">
                {/* ============ LEFT SIDEBAR ============ */}
                <aside className="sticky top-[100px] space-y-5">
                    <div className="bg-slate-900 text-white rounded-2xl p-5">
                        <div className="font-extrabold text-base">✨ Plan Your Trip Now</div>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">
                            Enter your destination and Tripora will create a complete itinerary in seconds.
                        </p>
                        <button className="mt-3 w-full bg-yellow-400 text-slate-900 rounded-full py-2 font-bold text-xs flex items-center justify-center gap-1 hover:bg-yellow-300 transition">
                            <i className="ri-magic-line"></i> Start Planning
                        </button>
                    </div>

                    <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400 px-1 pb-2">Filter by</div>
                        <div className="flex flex-wrap gap-1.5">
                            {filterTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition ${activeFilter === tag
                                        ? "bg-blue-500 border-blue-500 text-white"
                                        : "bg-white border-slate-200 text-slate-500 hover:border-blue-300"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ============ FEED ============ */}
                <main className="space-y-6">
                    {/* Story row */}
                    <div className="bg-white rounded-2xl p-4 flex gap-5 overflow-x-auto">
                        <button onClick={() => setIsModalOpen(true)} className="flex flex-col items-center gap-2 shrink-0">
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-500 bg-blue-50 flex items-center justify-center">
                                <i className="ri-add-line text-2xl text-blue-500"></i>
                            </div>
                            <span className="text-[11px] font-semibold text-blue-500">Your Story</span>
                        </button>
                        {stories.map((s) => (
                            <div key={s.name} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer">
                                <div className="w-14 h-14 rounded-full border-2 border-slate-200 overflow-hidden">
                                    <img src={s.avatar} className="w-full h-full object-cover" alt={s.name} />
                                </div>
                                <span className="text-[11px] font-semibold text-slate-500">{s.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Posts */}
                    {visiblePosts.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between p-4 pb-2">
                                <div className="flex gap-3">
                                    <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-100">
                                        <img src={post.avatar} className="w-full h-full object-cover" alt={post.author} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{post.author}</div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                            <i className="ri-time-line text-xs"></i> {post.timeAgo} · <i className="ri-map-pin-line text-xs"></i>{" "}
                                            {post.location}
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 text-xl p-1 rounded-md hover:bg-slate-50">
                                    <i className="ri-more-line"></i>
                                </button>
                            </div>

                            <div className="px-4 pb-2">
                                <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-bold mb-2">
                                    <i className="ri-route-line"></i> {post.route}
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">{post.caption}</p>
                            </div>

                            {post.itinerary && (
                                <div className="mx-4 border border-slate-100 rounded-xl overflow-hidden mb-3">
                                    <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-sm">{post.itinerary.title}</div>
                                            <div className="text-xs text-white/70">
                                                {post.itinerary.dateRange} · {post.itinerary.people} · {post.itinerary.budget}
                                            </div>
                                        </div>
                                        <span className="bg-white/15 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 shrink-0">
                                            <i className="ri-magic-line"></i> AI Generated
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                        {post.itinerary.days.map((day) => (
                                            <div key={day.label} className="flex-1 p-3">
                                                <div className="font-bold text-blue-600 text-xs mb-1">{day.label}</div>
                                                {day.items.map((item) => (
                                                    <div key={item} className="text-xs text-slate-500 mb-1 last:mb-0">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-blue-50 px-4 py-2 flex justify-between items-center text-xs font-semibold text-blue-600">
                                        <span>
                                            <i className="ri-eye-line"></i> {post.itinerary.views} views · Clone to your trip
                                        </span>
                                        <button className="bg-blue-500 text-white rounded-xl px-3 py-1.5 text-xs flex items-center gap-1 hover:bg-blue-600 transition">
                                            <i className="ri-file-copy-line"></i> Use This Itinerary
                                        </button>
                                    </div>
                                </div>
                            )}

                            {post.images && (
                                <div className="px-4 pb-3">
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <img src={post.images[0]} className="w-full h-40 object-cover rounded-xl col-span-1" alt="" />
                                        <div className="flex flex-col gap-1.5">
                                            <img src={post.images[1]} className="w-full h-[76px] object-cover rounded-xl" alt="" />
                                            <img src={post.images[2]} className="w-full h-[76px] object-cover rounded-xl" alt="" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 px-4 pb-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="bg-[#f4f5f8] text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-1 p-3 pt-1 border-t border-slate-100">
                                <button
                                    onClick={() => toggleLike(post.id)}
                                    className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs py-1.5 px-3 rounded-full hover:bg-[#f4f5f8] transition"
                                >
                                    <i className={post.liked ? "ri-heart-fill text-red-500" : "ri-heart-line"}></i> {post.likes}
                                </button>
                                <button
                                    onClick={() => toggleComments(post.id)}
                                    className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs py-1.5 px-3 rounded-full hover:bg-[#f4f5f8] transition"
                                >
                                    <i className="ri-chat-3-line"></i> {post.comments.length}
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs py-1.5 px-3 rounded-full hover:bg-[#f4f5f8] transition">
                                    <i className="ri-send-plane-line"></i> Share
                                </button>
                                <div className="flex-1"></div>
                                <button className="text-slate-500 text-sm p-2 rounded-full hover:bg-[#f4f5f8] transition">
                                    <i className="ri-bookmark-line"></i>
                                </button>
                            </div>

                            {post.commentsOpen && (
                                <div className="px-4 pb-4">
                                    <div className="border-t border-slate-100 pt-3 space-y-3">
                                        {post.comments.map((c) => (
                                            <div key={c.id} className="flex gap-2">
                                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                                    <img src={c.avatar} className="w-full h-full object-cover" alt={c.author} />
                                                </div>
                                                <div className="bg-[#f4f5f8] rounded-2xl p-2 flex-1">
                                                    <div className="font-bold text-xs">{c.author}</div>
                                                    <div className="text-xs text-slate-700">{c.text}</div>
                                                    <div className="text-[11px] text-slate-400 mt-1">{c.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                            <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="You" />
                                        </div>
                                        <div className="flex-1 bg-[#f4f5f8] rounded-full px-4 py-2 flex items-center gap-2">
                                            <input type="text" placeholder="Write a comment..." className="bg-transparent outline-none text-xs w-full" />
                                            <button className="text-blue-500">
                                                <i className="ri-send-plane-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}

                    {visiblePosts.length === 0 && (
                        <div className="bg-white rounded-2xl p-10 text-center text-slate-400 text-sm">
                            Belum ada trip yang dibagikan untuk kategori "{activeFilter}".
                        </div>
                    )}
                </main>

                {/* ============ RIGHT SIDEBAR ============ */}
                <aside className="sticky top-[100px] space-y-5">
                    <div className="bg-white rounded-2xl p-5">
                        <div className="font-bold text-sm mb-3">🔥 Trending Destinations</div>
                        {trendingDestinations.map((dest, idx) => (
                            <div
                                key={dest.name}
                                className={`flex items-center gap-3 py-2 ${idx !== trendingDestinations.length - 1 ? "border-b border-slate-100" : ""
                                    }`}
                            >
                                <span className="text-2xl font-extrabold text-blue-50 [-webkit-text-stroke:1.5px_#3b82f6]">{dest.rank}</span>
                                <div>
                                    <div className="font-bold text-sm">{dest.name}</div>
                                    <div className="text-xs text-slate-400">{dest.trips}</div>
                                </div>
                                <div className="ml-auto w-10 h-10 rounded-xl overflow-hidden shrink-0">
                                    <img src={dest.img} className="w-full h-full object-cover" alt={dest.name} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl p-5">
                        <div className="font-bold text-sm mb-3">Travellers to Follow</div>
                        {travelers.map((t) => (
                            <div key={t.id} className="flex items-center gap-3 py-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <img src={t.avatar} className="w-full h-full object-cover" alt={t.name} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{t.name}</div>
                                    <div className="text-xs text-slate-400">{t.trips} trips shared</div>
                                </div>
                                <button
                                    onClick={() => toggleFollow(t.id)}
                                    className={`rounded-xl px-3 py-1 text-xs font-bold transition shrink-0 ${t.following ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white"
                                        }`}
                                >
                                    {t.following ? "Following" : "Follow"}
                                </button>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {/* ============ CREATE POST MODAL ============ */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center px-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}
                >
                    <div className="bg-white rounded-3xl w-[560px] max-w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
                            <span className="font-extrabold text-xl text-slate-900">Share Your Trip</span>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-[#f4f5f8] w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
                            >
                                <i className="ri-close-line"></i>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex gap-3 items-center mb-4">
                                <div className="w-11 h-11 rounded-full overflow-hidden">
                                    <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="You" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900">Delia Andini</div>
                                    <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 rounded-lg px-2 py-0.5 text-xs font-semibold">
                                        <i className="ri-global-line"></i> Public <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                </div>
                            </div>

                            <textarea
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                maxLength={500}
                                className="w-full outline-none text-base min-h-[100px] resize-none placeholder:text-slate-400 text-slate-900"
                                placeholder="Share your trip... favorite destinations, tips, or fun moments!"
                            />

                            <div className="border border-slate-100 rounded-xl mt-4 overflow-hidden">
                                <div className="bg-blue-50 px-4 py-2 flex justify-between items-center gap-2">
                                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 shrink-0">
                                        <i className="ri-route-line"></i> Attach Itinerary
                                    </span>
                                    <select
                                        value={selectedItinerary}
                                        onChange={(e) => setSelectedItinerary(e.target.value)}
                                        className="border border-slate-200 rounded-md text-xs p-1 bg-white text-slate-700 min-w-0"
                                    >
                                        <option value="">Select your trip...</option>
                                        <option value="bali">3 Days in Bali (Apr 10–12)</option>
                                        <option value="jakarta">3 Days in Jakarta (Mar 29–31)</option>
                                        <option value="jogja">4 Days in Yogyakarta</option>
                                    </select>
                                </div>
                                <div className="p-3 text-xs text-slate-500">
                                    Pick an itinerary to feature in your post — other travellers can clone it directly!
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-slate-100">
                                <button className="flex items-center gap-1 text-xs font-medium text-slate-500 py-1.5 px-3 rounded-lg hover:bg-[#f4f5f8] transition">
                                    <i className="ri-image-line text-base"></i> Photo
                                </button>
                                <button className="flex items-center gap-1 text-xs font-medium text-slate-500 py-1.5 px-3 rounded-lg hover:bg-[#f4f5f8] transition">
                                    <i className="ri-video-line"></i> Video
                                </button>
                                <button className="flex items-center gap-1 text-xs font-medium text-slate-500 py-1.5 px-3 rounded-lg hover:bg-[#f4f5f8] transition">
                                    <i className="ri-map-pin-line"></i> Tag Location
                                </button>
                                <button className="flex items-center gap-1 text-xs font-medium text-slate-500 py-1.5 px-3 rounded-lg hover:bg-[#f4f5f8] transition">
                                    <i className="ri-price-tag-3-line"></i> Tag
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100">
                            <span className="text-xs text-slate-400">{postContent.length} / 500</span>
                            <button
                                disabled={postContent.length === 0}
                                onClick={handlePublish}
                                className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full px-6 py-2 font-bold text-sm hover:bg-blue-600 transition"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Sosmed;