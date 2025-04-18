import { fetchESPNGolfScores } from "@/lib/api";
import Events from "@/components/ui/events";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  try {
    const espn_golf_data = await fetchESPNGolfScores();

    const espn_event_one = espn_golf_data.events[0];
    const espn_event_two = espn_golf_data.events[1];

    const startDateEventOne = espn_event_one.date;
    const endDateEventOne = espn_event_one.endDate;
    const startDateEventTwo = espn_event_two.date;
    const endDateEventTwo = espn_event_two.endDate;

    return (
      <div className="flex flex-col">
        <div className="flex mx-auto bg-[#243E2A] border border-[#9A9540] rounded-xl p-6 md:p-8 shadow shadow-black shadow-lg mt-8">
          <div className="text-3xl">PGA Events for the week:</div>
        </div>
        <Events espn_event={espn_golf_data.events[0]} eventStartDate={startDateEventOne} eventEndDate={endDateEventOne} />
        <Events espn_event={espn_golf_data.events[1]} eventStartDate={startDateEventTwo} eventEndDate={endDateEventTwo} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching PGA events:", error);
    return (
      <div className="flex flex-col">
        <div className="flex mx-auto bg-[#243E2A] border border-[#9A9540] rounded-xl p-6 md:p-8 shadow shadow-black shadow-lg mt-8">
          <div className="text-3xl">Error fetching PGA events</div>
        </div>
      </div>
    );
  }
}
