/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchESPNGolfScores } from "@/lib/api";
import Events from "@/components/ui/events";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  try {
    const espn_golf_data = await fetchESPNGolfScores();

    return (
      <div className="flex flex-col">
        <div className="flex mx-auto bg-[#292929] border border-[#B2825E] rounded-xl p-6 md:p-8 shadow shadow-black shadow-lg mt-8">
          <div className="text-3xl">PGA Events for the week:</div>
        </div>
        {espn_golf_data.events.map((res: any) => {
          return (<Events espn_event={res} eventStartDate={res.date} eventEndDate={res.endDate} key={res.id}/> );
        })}
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
