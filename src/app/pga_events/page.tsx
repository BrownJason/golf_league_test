/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchESPNGolfScores } from "@/lib/api";
import Events from "@/components/ui/events";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  try {
    const espn_golf_data = await fetchESPNGolfScores();

    return (
      <div className="p-4 md:p-6">
        <main className="max-w-full mx-auto p-4 md:p-6 animate-fade-in">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#EDE6D6] mb-4 text-shadow-lg text-shadow-black">
              PGA Events:
            </h1>
            <div className="h-1 w-32 md:w-40 bg-[#EDE6D6] mx-auto rounded-full mb-6"></div>
            <p className="text-[#EDE6D6] text-sm md:text-base max-w-2xl mx-auto">
              Shows current or upcoming PGA events
            </p>
          </div>
          {espn_golf_data.events.map((res: any) => {
            return (<Events espn_event={res} eventStartDate={res.date} eventEndDate={res.endDate} key={res.id}/> );
          })}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching PGA events:", error);
    return (
      <div className="flex flex-col">
        <div className="flex mx-auto bg-[#292929] border border-[#B2825E] rounded-xl p-6 md:p-8 shadow shadow-black shadow-lg mt-8">
          <div className="text-3xl">Error fetching PGA events</div>
        </div>
      </div>
    );
  }
}
