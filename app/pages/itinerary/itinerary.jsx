import { Layout } from "../../components/Layout";

export function ItineraryPage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-4 bg-slate-900 sm:px-8 md:px-12 text-center text-white min-h-[50vh] flex flex-col items-center justify-center">
        <span className="inline-block bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-blue-500/20">
          Trip Planner
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">My Itinerary</h1>
        <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
          Create, customize, and collaborate on your dream travel schedule in one powerful dashboard.
        </p>
      </div>
    </Layout>
  );
}
